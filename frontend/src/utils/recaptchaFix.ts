// reCAPTCHA Fix for Firebase Phone Auth
import { RecaptchaVerifier } from 'firebase/auth';
import { auth } from '../config';

export const createRecaptchaVerifier = () => {
  console.log('🔧 Creating reCAPTCHA verifier with localhost fixes...');
  
  try {
    if ((window as any).recaptchaVerifier) {
      try {
        (window as any).recaptchaVerifier.clear();
      } catch (e) {
      }
    }
    
    const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: (response: any) => {
        console.log('✅ reCAPTCHA solved successfully');
      },
      'expired-callback': () => {
        console.log('⚠️ reCAPTCHA expired - please try again');
      },
      'error-callback': (error: any) => {
        console.error('❌ reCAPTCHA error:', error);
      }
    });
    
    (window as any).recaptchaVerifier = verifier;
    
    verifier.render().then(() => {
      console.log('✅ reCAPTCHA rendered successfully');
    }).catch((error: any) => {
      console.error('❌ reCAPTCHA render error:', error);
      throw error;
    });
    
    return verifier;
    
  } catch (error) {
    console.error('❌ Error creating reCAPTCHA verifier:', error);
    throw new Error('Failed to create reCAPTCHA verifier. Please refresh and try again.');
  }
};

export const createRecaptchaVerifierForLocalhost = () => {
  console.log('🔧 Creating reCAPTCHA verifier specifically for localhost...');
  
  try {
    if ((window as any).recaptchaVerifier) {
      try {
        (window as any).recaptchaVerifier.clear();
      } catch (e) {
      }
    }
    
    const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: (response: any) => {
        console.log('✅ reCAPTCHA solved successfully (localhost)');
      },
      'expired-callback': () => {
        console.log('⚠️ reCAPTCHA expired - please try again');
      },
      'error-callback': (error: any) => {
        console.error('❌ reCAPTCHA error (localhost):', error);
      }
    });
    
    (window as any).recaptchaVerifier = verifier;
    
    verifier.render().then(() => {
      console.log('✅ reCAPTCHA rendered successfully (localhost)');
    }).catch((error: any) => {
      console.error('❌ reCAPTCHA render error (localhost):', error);
      console.log('💡 This might be normal for localhost development');
    });
    
    return verifier;
    
  } catch (error) {
    console.error('❌ Error creating reCAPTCHA verifier for localhost:', error);
    return null;
  }
};
