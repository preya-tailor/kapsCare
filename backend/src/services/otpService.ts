import crypto from 'crypto';

interface OTPData {
  code: string;
  email: string;
  expiresAt: Date;
  attempts: number;
}

class OTPService {
  private otpStore: Map<string, OTPData> = new Map();
  private readonly OTP_LENGTH = 6;
  private readonly OTP_EXPIRY_MINUTES = 10;
  private readonly MAX_ATTEMPTS = 3;

  generateOTP(): string {
    return crypto.randomInt(100000, 999999).toString();
  }

  createOTP(email: string): { code: string; expiresAt: Date } {
    // Remove any existing OTP for this email
    this.otpStore.delete(email);
    
    const code = this.generateOTP();
    const expiresAt = new Date(Date.now() + this.OTP_EXPIRY_MINUTES * 60 * 1000);
    
    this.otpStore.set(email, {
      code,
      email,
      expiresAt,
      attempts: 0
    });

    // Clean up expired OTPs
    this.cleanupExpiredOTPs();

    return { code, expiresAt };
  }

  verifyOTP(email: string, inputCode: string): { success: boolean; message: string } {
    const otpData = this.otpStore.get(email);
    
    if (!otpData) {
      return { success: false, message: 'No OTP found for this email. Please request a new one.' };
    }

    if (otpData.attempts >= this.MAX_ATTEMPTS) {
      this.otpStore.delete(email);
      return { success: false, message: 'Maximum verification attempts exceeded. Please request a new OTP.' };
    }

    if (new Date() > otpData.expiresAt) {
      this.otpStore.delete(email);
      return { success: false, message: 'OTP has expired. Please request a new one.' };
    }

    if (otpData.code !== inputCode) {
      otpData.attempts += 1;
      this.otpStore.set(email, otpData);
      
      const remainingAttempts = this.MAX_ATTEMPTS - otpData.attempts;
      return { 
        success: false, 
        message: `Invalid OTP. ${remainingAttempts} attempt(s) remaining.` 
      };
    }

    // OTP is valid, remove it from store
    this.otpStore.delete(email);
    return { success: true, message: 'OTP verified successfully.' };
  }

  private cleanupExpiredOTPs(): void {
    const now = new Date();
    for (const [email, otpData] of this.otpStore.entries()) {
      if (now > otpData.expiresAt) {
        this.otpStore.delete(email);
      }
    }
  }

  getOTPInfo(email: string): { exists: boolean; expiresAt?: Date; attempts?: number } {
    const otpData = this.otpStore.get(email);
    if (!otpData) {
      return { exists: false };
    }
    return { 
      exists: true, 
      expiresAt: otpData.expiresAt, 
      attempts: otpData.attempts 
    };
  }
}

export default new OTPService();

