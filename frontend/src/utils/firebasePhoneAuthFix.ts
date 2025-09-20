// Firebase Phone Auth Fix for localhost issues
import { auth } from '../config';

export const fixFirebasePhoneAuth = () => {
  
  // Fix 1: Disable reCAPTCHA Enterprise for localhost
  if (typeof window !== 'undefined') {
    // Override reCAPTCHA Enterprise settings
    (window as any).firebase = (window as any).firebase || {};
    (window as any).firebase.auth = (window as any).firebase.auth || {};
    
    // Disable reCAPTCHA Enterprise
    if (auth.settings) {
      auth.settings.appVerificationDisabledForTesting = false;
    }    
  }
  
  const currentDomain = window.location.hostname;
  const currentPort = window.location.port;
  
  if (currentDomain === 'localhost') {
  }
  
  return {
    domain: currentDomain,
    port: currentPort,
    suggestions: [
      'Try accessing via 127.0.0.1 instead of localhost',
      'Check if API key has domain restrictions',
      'Verify reCAPTCHA configuration in Firebase Console'
    ]
  };
};

if (typeof window !== 'undefined') {
  fixFirebasePhoneAuth();
}
