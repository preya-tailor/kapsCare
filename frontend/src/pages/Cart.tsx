import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import Button from '../components/Common/Button';
import CheckoutModal from '../components/Common/CheckoutModal';
import OTPModal from '../components/Common/OTPModal';
import SuccessModal from '../components/Common/SuccessModal';
import { checkoutService } from '../services/checkoutService';

const Cart: React.FC = () => {
  const { items, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  
  // Checkout flow state
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<{
    name: string;
    email: string;
    phone: string;
    address: string;
  } | null>(null);
  const [orderId, setOrderId] = useState<string>('');
  
  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [otpError, setOtpError] = useState('');
  
  const handleProceedToCheckout = () => {
    setShowCheckoutModal(true);
  };

  const handleCheckoutSubmit = async (details: {
    name: string;
    email: string;
    phone: string;
    address: string;
  }) => {
    setIsLoading(true);
    setCustomerDetails(details);
    
    try {
      const response = await checkoutService.sendOTP({ email: details.email });
      
      if (response.success) {
        setShowCheckoutModal(false);
        setShowOTPModal(true);
        setOtpError('');
      } else {
        alert(response.message || 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerify = async (otp: string) => {
    if (!customerDetails) return;
    
    setIsLoading(true);
    setOtpError('');
    
    try {
      const response = await checkoutService.verifyOTP({
        email: customerDetails.email,
        otp
      });
      
      if (response.success) {
        // Process the order
        await processOrder();
      } else {
        setOtpError(response.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setOtpError('Failed to verify OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!customerDetails) return;
    
    setIsLoading(true);
    setOtpError('');
    
    try {
      const response = await checkoutService.sendOTP({ email: customerDetails.email });
      
      if (response.success) {
        alert('OTP sent successfully!');
      } else {
        alert(response.message || 'Failed to resend OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      alert('Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const processOrder = async () => {
    if (!customerDetails) return;
    
    try {
      const orderData = {
        email: customerDetails.email,
        customerDetails,
        cartItems: items.map(item => ({
          productId: item.productId,
          product: {
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            mainImage: item.product.mainImage
          },
          quantity: item.quantity
        })),
        totalAmount: totalPrice + (totalPrice > 50 ? 0 : 5) + totalPrice * 0.08
      };

      const response = await checkoutService.processOrder(orderData);
      
      if (response.success) {
        setOrderId(response.orderId);
        setShowOTPModal(false);
        setShowSuccessModal(true);
        clearCart();
      } else {
        alert(response.message || 'Failed to process order. Please try again.');
      }
    } catch (error) {
      console.error('Error processing order:', error);
      alert('Failed to process order. Please try again.');
    }
  };

  const handleCloseModals = () => {
    setShowCheckoutModal(false);
    setShowOTPModal(false);
    setShowSuccessModal(false);
    setCustomerDetails(null);
    setOtpError('');
    setOrderId('');
  };

  if (items.length === 0 && !showSuccessModal) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/shop">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
        >
          Shopping Cart
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                >
                  <img
                    src={item.product.mainImage}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {item.product.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      ${item.product.price} each
                    </p>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      ${(item.product.price * item.quantity)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Subtotal ({items.length} items)
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${totalPrice}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {totalPrice > 50 ? 'Free' : '$5.00'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tax</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${(totalPrice * 0.08)}
                  </span>
                </div>
                
                <hr className="border-gray-200 dark:border-gray-700" />
                
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-[#1c1108]">
                    ${(totalPrice + (totalPrice > 50 ? 0 : 5) + totalPrice * 0.08)}
                  </span>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <button 
                  onClick={handleProceedToCheckout}
                  className="w-full bg-[#1c1108] text-[#efdfc5] py-3 rounded-lg hover:bg-[#3b2b1b] mb-2 transition-colors"
                >
                  Proceed to Checkout
                </button>
                
                <Link to="/shop">
                  <button className="w-full outline rounded-lg text-[#1c1108] py-3">
                    Continue Shopping
                  </button>
                </Link>
              </div>
              
              {totalPrice < 50 && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-sm text-[#1c1108]">
                    Add ${(50 - totalPrice)} more to get free shipping!
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Checkout Modals */}
      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={handleCloseModals}
        onProceed={handleCheckoutSubmit}
        loading={isLoading}
      />

      <OTPModal
        isOpen={showOTPModal}
        onClose={handleCloseModals}
        onVerify={handleOTPVerify}
        onResend={handleResendOTP}
        email={customerDetails?.email || ''}
        loading={isLoading}
        resendLoading={isLoading}
        error={otpError}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModals}
        orderId={orderId}
        email={customerDetails?.email}
      />
    </div>
  );
};

export default Cart;