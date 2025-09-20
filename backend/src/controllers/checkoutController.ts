import { Request, Response } from 'express';
import otpService from '../services/otpService';
import emailService from '../services/emailService';
import { prisma } from '../config/db';

interface SendOTPRequest {
  email: string;
}

interface VerifyOTPRequest {
  email: string;
  otp: string;
}

interface ProcessOrderRequest {
  email: string;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
    pinCode: string;
    promoCode?: string;
  };
  cartItems: Array<{
    productId: string;
    product: {
      id: string;
      name: string;
      price: number;
      mainImage: string;
    };
    quantity: number;
  }>;
  totalAmount: number;
}

export const sendOTP = async (req: Request, res: Response) => {
  try {
    const { email }: SendOTPRequest = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Check if there's already an active OTP for this email
    const existingOTP = otpService.getOTPInfo(email);
    if (existingOTP.exists) {
      const timeLeft = Math.ceil((existingOTP.expiresAt!.getTime() - Date.now()) / (1000 * 60));
      return res.status(400).json({
        success: false,
        message: `An OTP has already been sent to this email. Please wait ${timeLeft} minutes before requesting a new one.`
      });
    }

    // Generate OTP
    const { code, expiresAt } = otpService.createOTP(email);

    // Send OTP via email
    const emailSent = await emailService.sendOTP(email, code);
    
    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: 'Failed to send OTP. Please try again later.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully to your email address',
      expiresAt: expiresAt
    });

  } catch (error) {
    console.error('Error in sendOTP:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp }: VerifyOTPRequest = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required'
      });
    }

    // Verify OTP
    const verification = otpService.verifyOTP(email, otp);

    if (!verification.success) {
      return res.status(400).json({
        success: false,
        message: verification.message
      });
    }

    res.status(200).json({
      success: true,
      message: verification.message
    });

  } catch (error) {
    console.error('Error in verifyOTP:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const processOrder = async (req: Request, res: Response) => {
  try {
    const { email, customerDetails, cartItems, totalAmount }: ProcessOrderRequest = req.body;

    // Validate required fields
    if (!email || !customerDetails || !cartItems || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: 'Missing required order information'
      });
    }

    // Validate customer details
    const { name, email: cEmail, phone, address, pinCode } = customerDetails;
if (!name || !cEmail || !phone || !address || !pinCode) {
  return res.status(400).json({ success: false, message: 'Pin code is required' });
}


    // Validate cart items
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Check if OTP was verified (this is a simplified check - in production, you might want to use JWT or session)
    const otpInfo = otpService.getOTPInfo(email);
    if (otpInfo.exists) {
      return res.status(400).json({
        success: false,
        message: 'Please verify your OTP before processing the order'
      });
    }

    // Prepare order details for email
    const orderDetails = {
      items: cartItems,
      totalAmount,
      customer: customerDetails
    };

    // Persist order in DB
    const createdOrder = await prisma.order.create({
      data: {
        customerName: customerDetails.name,
        customerEmail: customerDetails.email,
        customerPhone: customerDetails.phone,
        customerAddress: customerDetails.address,
        customerPinCode: customerDetails.pinCode,
    promoCode: customerDetails.promoCode || null,
        totalAmount,
        status: 'PENDING',
        items: {
          create: cartItems.map((ci) => ({
            productId: ci.productId,
            productName: ci.product.name,
            productPrice: ci.product.price,
            productImage: ci.product.mainImage,
            quantity: ci.quantity,
          }))
        }
      }
    });

    // Send confirmation emails
    const customerEmailSent = await emailService.sendOrderConfirmationToCustomer(orderDetails);
    const adminEmailSent = await emailService.sendOrderNotificationToAdmin(orderDetails);

    if (!customerEmailSent) {
      console.error('Failed to send confirmation email to customer');
    }

    if (!adminEmailSent) {
      console.error('Failed to send notification email to admin');
    }

    res.status(200).json({
      success: true,
      message: 'Order processed successfully',
      orderId: createdOrder.id,
      data: {
        customerEmailSent,
        adminEmailSent
      }
    });

  } catch (error) {
    console.error('Error in processOrder:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

