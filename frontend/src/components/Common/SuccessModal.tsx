import React from 'react';
import { CheckCircle, Mail } from 'lucide-react';
import Button from './Button';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId?: string;
  email?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  orderId,
  email,
}) => {
  if (!isOpen) return null; // render only when needed

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-8 text-center"
      >
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Order Placed Successfully
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
          Your order has been placed and a confirmation email has been sent
          {email ? ` to ${email}` : ''}. Please check your inbox (and spam
          folder) for further updates and order details.
        </p>

        {orderId && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Order ID</p>
            <p className="font-mono text-lg font-semibold text-[#1c1108]">
              {orderId}
            </p>
          </div>
        )}

        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-left">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              What happens next?
            </h3>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                You'll receive a confirmation email with your order details
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                Our team will contact you within 24 hours
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                We'll arrange delivery and payment details
              </li>
            </ul>
          </div>

          <div className="flex space-x-3">
            <Button onClick={onClose} className="flex-1">
              Continue Shopping
            </Button>

            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Need help? Contact us at{' '}
            <a
              href="mailto:support@ayurvedickapscare.com"
              className="text-[#1c1108] hover:underline"
            >
              support@ayurvedickapscare.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
