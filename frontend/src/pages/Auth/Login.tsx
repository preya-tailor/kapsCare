import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Smartphone, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [error, setError] = useState('');

  const { requestOtp, verifyOtp, isLoading } = useAuth();

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await requestOtp(identifier);
      setStep('verify');
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await verifyOtp(identifier, otp);
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Sign In
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Login using email or mobile number with OTP verification
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6"
          >
            <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
          </motion.div>
        )}

        {step === 'request' ? (
          <form onSubmit={handleRequest} className="space-y-6">
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email or Mobile Number
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="identifier"
                  name="identifier"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c1108]-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter email or mobile number"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !identifier}
              className="w-full bg-[#1c1108] text-[#efdfc5] py-3 rounded-lg hover:bg-[#3b2b1b] disabled:opacity-60"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Enter OTP sent to {identifier}
              </label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c1108]-500 dark:bg-gray-700 dark:text-white tracking-widest"
                  placeholder="Enter 6-digit OTP"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={() => setStep('request')}
                className="text-[#1c1108] hover:underline"
              >
                Change email/number
              </button>
              <button
                type="button"
                onClick={() => requestOtp(identifier)}
                className="text-[#1c1108] hover:underline"
              >
                Resend OTP
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.length < 4}
              className="w-full bg-[#1c1108] text-[#efdfc5] py-3 rounded-lg hover:bg-[#3b2b1b] disabled:opacity-60"
            >
              Verify & Login
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Login;