import express from 'express';
import { sendOTP, verifyOTP, processOrder } from '../controllers/checkoutController';

const router = express.Router();

// Send OTP to customer email
router.post('/send-otp', sendOTP);

// Verify OTP
router.post('/verify-otp', verifyOTP);

// Process order after OTP verification
router.post('/process-order', processOrder);

export default router;

