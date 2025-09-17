import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ArrowLeft, RotateCcw } from 'lucide-react';
import Button from './Button';

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
  onResend: () => void;
  email: string;
  loading?: boolean;
  resendLoading?: boolean;
  error?: string;
}

const OTPModal: React.FC<OTPModalProps> = ({
  isOpen,
  onClose,
  onVerify,
  onResend,
  email,
  loading = false,
  resendLoading = false,
  error
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      setTimeLeft(600);
      setOtp(['', '', '', '', '', '']);
    }
  }, [isOpen]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every(digit => digit !== '') && !loading) {
      onVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }
    
    setOtp(newOtp);
    
    // Focus the next empty input or the last one
    const nextEmptyIndex = newOtp.findIndex(digit => digit === '');
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length === 6) {
      onVerify(otpString);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Verify Email
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                disabled={loading}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#1c1108] rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-[#efdfc5]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Check your email
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We've sent a 6-digit verification code to
              </p>
              <p className="text-[#1c1108] font-medium">{email}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">
                  Enter verification code
                </label>
                <div className="flex justify-center space-x-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className={`w-12 h-12 text-center text-xl font-bold border rounded-lg focus:ring-2 focus:ring-[#1c1108] focus:border-transparent transition-colors ${
                        error
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                      } text-gray-900 dark:text-white`}
                      disabled={loading}
                    />
                  ))}
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
                )}
              </div>

              <div className="text-center">
                {timeLeft > 0 ? (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Code expires in <span className="font-medium text-[#1c1108]">{formatTime(timeLeft)}</span>
                  </p>
                ) : (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    Code has expired. Please request a new one.
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || otp.some(digit => digit === '') || timeLeft === 0}
                >
                  {loading ? 'Verifying...' : 'Verify Code'}
                </Button>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={onResend}
                    disabled={resendLoading || timeLeft > 0}
                    className="flex-1 flex items-center justify-center px-4 py-3 text-[#1c1108] border border-[#1c1108] rounded-lg hover:bg-[#1c1108] hover:text-[#efdfc5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    {resendLoading ? 'Sending...' : 'Resend Code'}
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 flex items-center justify-center px-4 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                    disabled={loading}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OTPModal;

