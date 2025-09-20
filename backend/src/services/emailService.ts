import nodemailer from 'nodemailer';

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface OrderItemLite {
  productId: string;
  product: {
    id: string;
    name: string;
    price: number;
    mainImage: string;
  };
  quantity: number;
}

interface OrderDetails {
  items: OrderItemLite[];
  totalAmount: number;
  customer: CustomerDetails;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
    });
  }

  async sendOTP(email: string, otp: string): Promise<boolean> {
    try {
      const mailOptions = {
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: email,
        subject: 'Your OTP for Order Verification - Kapscare',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #1c1108; color: #efdfc5; padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">Kapscare</h1>
            </div>
            <div style="padding: 30px; background-color: #f9f9f9;">
              <h2 style="color: #1c1108; margin-bottom: 20px;">Order Verification</h2>
              <p style="color: #333; font-size: 16px; line-height: 1.6;">
                Thank you for your order! To complete your purchase, please use the following verification code:
              </p>
              <div style="background-color: #1c1108; color: #efdfc5; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
                <h1 style="margin: 0; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
              </div>
              <p style="color: #666; font-size: 14px;">
                This code will expire in 10 minutes. If you didn't request this code, please ignore this email.
              </p>
            </div>
            <div style="background-color: #1c1108; color: #efdfc5; padding: 15px; text-align: center; font-size: 12px;">
              <p style="margin: 0;">© 2024 Kapscare. All rights reserved.</p>
            </div>
          </div>
        `,
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Error sending OTP email:', error);
      return false;
    }
  }

  async sendOrderConfirmationToCustomer(orderDetails: OrderDetails): Promise<boolean> {
    try {
      const { items, totalAmount, customer } = orderDetails;
      
      const itemsHtml = items.map(item => `
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 15px; text-align: left;">
            <img src="${item.product.mainImage}" alt="${item.product.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
          </td>
          <td style="padding: 15px; text-align: left; font-weight: 500;">${item.product.name}</td>
          <td style="padding: 15px; text-align: center;">${item.quantity}</td>
          <td style="padding: 15px; text-align: right; font-weight: 500;">₹${(item.product.price * item.quantity).toFixed(2)}</td>
        </tr>
      `).join('');

      const mailOptions = {
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: customer.email,
        subject: 'Order Confirmation - Kapscare',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #1c1108; color: #efdfc5; padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">Kapscare</h1>
            </div>
            <div style="padding: 30px; background-color: #f9f9f9;">
              <h2 style="color: #1c1108; margin-bottom: 20px;">Order Confirmation</h2>
              <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                Dear ${customer.name},
              </p>
              <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                Thank you for your order! We have received your order and our team will contact you soon to confirm the details and arrange delivery.
              </p>
              
              <h3 style="color: #1c1108; margin-bottom: 15px;">Order Details</h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                  <tr style="background-color: #1c1108; color: #efdfc5;">
                    <th style="padding: 15px; text-align: left;">Image</th>
                    <th style="padding: 15px; text-align: left;">Product</th>
                    <th style="padding: 15px; text-align: center;">Quantity</th>
                    <th style="padding: 15px; text-align: right;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
              
              <div style="background-color: #1c1108; color: #efdfc5; padding: 20px; border-radius: 8px; text-align: right;">
                <h3 style="margin: 0 0 10px 0; font-size: 20px;">Total Amount: ₹${totalAmount.toFixed(2)}</h3>
              </div>
              
              <div style="background-color: #e8f5e8; border: 1px solid #4caf50; padding: 15px; border-radius: 8px; margin-top: 20px;">
                <p style="margin: 0; color: #2e7d32; font-weight: 500;">
                  <strong>Next Steps:</strong> Our team will contact you within 24 hours to confirm your order and arrange delivery. Please keep this email for your records.
                </p>
              </div>
            </div>
            <div style="background-color: #1c1108; color: #efdfc5; padding: 15px; text-align: center; font-size: 12px;">
              <p style="margin: 0;">© 2024 Kapscare. All rights reserved.</p>
            </div>
          </div>
        `,
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Error sending order confirmation to customer:', error);
      return false;
    }
  }

  async sendOrderNotificationToAdmin(orderDetails: OrderDetails): Promise<boolean> {
    try {
      const { items, totalAmount, customer } = orderDetails;
      
      const itemsHtml = items.map(item => `
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 15px; text-align: left;">
            <img src="${item.product.mainImage}" alt="${item.product.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
          </td>
          <td style="padding: 15px; text-align: left; font-weight: 500;">${item.product.name}</td>
          <td style="padding: 15px; text-align: center;">${item.quantity}</td>
          <td style="padding: 15px; text-align: right; font-weight: 500;">₹${(item.product.price * item.quantity).toFixed(2)}</td>
        </tr>
      `).join('');

      const mailOptions = {
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
        subject: `New Order Received - ${customer.name} - Kapscare`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #1c1108; color: #efdfc5; padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">New Order Received</h1>
            </div>
            <div style="padding: 30px; background-color: #f9f9f9;">
              <h2 style="color: #1c1108; margin-bottom: 20px;">Customer Information</h2>
              <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <p style="margin: 5px 0;"><strong>Name:</strong> ${customer.name}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> ${customer.email}</p>
                <p style="margin: 5px 0;"><strong>Phone:</strong> ${customer.phone}</p>
                <p style="margin: 5px 0;"><strong>Address:</strong> ${customer.address}</p>
              </div>
              
              <h3 style="color: #1c1108; margin-bottom: 15px;">Order Details</h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                  <tr style="background-color: #1c1108; color: #efdfc5;">
                    <th style="padding: 15px; text-align: left;">Image</th>
                    <th style="padding: 15px; text-align: left;">Product</th>
                    <th style="padding: 15px; text-align: center;">Quantity</th>
                    <th style="padding: 15px; text-align: right;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
              
              <div style="background-color: #1c1108; color: #efdfc5; padding: 20px; border-radius: 8px; text-align: right;">
                <h3 style="margin: 0 0 10px 0; font-size: 20px;">Total Amount: ₹${totalAmount.toFixed(2)}</h3>
              </div>
              
              <div style="background-color: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 8px; margin-top: 20px;">
                <p style="margin: 0; color: #856404; font-weight: 500;">
                  <strong>Action Required:</strong> Please contact the customer within 24 hours to confirm the order and arrange delivery.
                </p>
              </div>
            </div>
            <div style="background-color: #1c1108; color: #efdfc5; padding: 15px; text-align: center; font-size: 12px;">
              <p style="margin: 0;">© 2024 Kapscare. All rights reserved.</p>
            </div>
          </div>
        `,
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Error sending order notification to admin:', error);
      return false;
    }
  }
}

export default new EmailService();
