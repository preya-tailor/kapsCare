// Firebase API Key Fix for localhost issues
import { auth } from '../config';

export const checkApiKeyRestrictions = () => {  
  const apiKey = auth.app.options.apiKey;
  const projectId = auth.app.options.projectId;
  
  const testApiKey = async () => {
    try {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendVerificationCode?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: '+1234567890',
          recaptchaToken: 'test-token'
        })
      });
      
      const result = await response.json();      
      if (result.error) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };
  
  return testApiKey();
};

export const getAlternativeConfig = () => {
  return {
    apiKey: "AIzaSyB73CygLnFEgoX29Kc2ZcUOu4Ez0HzcxX8",
    authDomain: "kapscare-e7841.firebaseapp.com",
    projectId: "kapscare-e7841",
    storageBucket: "kapscare-e7841.firebasestorage.app",
    messagingSenderId: "375514761613",
    appId: "1:375514761613:web:a5c3cae302beb17e7cd5c4",
    measurementId: "G-G4983TB7D6"
  };
};

export const shouldUseAlternativeConfig = () => {
  const currentDomain = window.location.hostname;
  return currentDomain === 'localhost' || currentDomain === '127.0.0.1';
};