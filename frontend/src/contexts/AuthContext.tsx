import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { 
  signInWithPhoneNumber, 
  onAuthStateChanged,
  User as FirebaseUser,
  RecaptchaVerifier
} from 'firebase/auth';
import { auth } from '../config';
import { User } from '../types';
import { userApiService } from '../services/userApiService';
import { createRecaptchaVerifier, createRecaptchaVerifierForLocalhost } from '../utils/recaptchaFix';

// Global type declaration for reCAPTCHA verifier
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  // Step 1: Request OTP
  requestOtp: (phoneNumber: string) => Promise<void>;
  // Step 2: Verify OTP
  verifyOtp: (otp: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

type AuthAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [confirmationResult, setConfirmationResult] = React.useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          // Check if user already exists in our database
          let user: User | null = null;
          
          try {
            const userResponse = await userApiService.getUserById(firebaseUser.uid);
            if (userResponse.success) {
              user = userResponse.data;
            }
          } catch (error) {
            // User doesn't exist, we'll create them
            console.log('User not found, will create new user');
          }
          
          if (!user) {
            // Create new user in our database
            const newUserData: Partial<User> = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              firstName: firebaseUser.displayName?.split(' ')[0] || 'User',
              lastName: firebaseUser.displayName?.split(' ').slice(1).join(' ') || '',
              role: 'customer',
              phone: firebaseUser.phoneNumber || undefined,
              createdAt: firebaseUser.metadata.creationTime || new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            
            const saveResponse = await userApiService.saveUser(newUserData);
            if (saveResponse.success) {
              user = saveResponse.data;
            } else {
              throw new Error('Failed to save user');
            }
          } else {
            // Update existing user to set updatedAt
            const updateResponse = await userApiService.updateUser(firebaseUser.uid, {
              updatedAt: new Date().toISOString(),
            });
            if (updateResponse.success) {
              user = updateResponse.data;
            }
          }
          
          localStorage.setItem('token', firebaseUser.uid);
          localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'SET_USER', payload: user });
        } catch (error) {
          console.error('Error handling user authentication:', error);
          // Fallback to basic user data if database operation fails
          const fallbackUser: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            firstName: firebaseUser.displayName?.split(' ')[0] || 'User',
            lastName: firebaseUser.displayName?.split(' ').slice(1).join(' ') || '',
            role: 'customer',
            phone: firebaseUser.phoneNumber || undefined,
            createdAt: firebaseUser.metadata.creationTime || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          
          localStorage.setItem('token', firebaseUser.uid);
          localStorage.setItem('user', JSON.stringify(fallbackUser));
          dispatch({ type: 'SET_USER', payload: fallbackUser });
        }
    } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({ type: 'SET_USER', payload: null });
    }
    });

    return () => unsubscribe();
  }, []);

  // Initialize reCAPTCHA verifier
  const initializeRecaptcha = () => {
    if (typeof window !== 'undefined') {
      const currentDomain = window.location.hostname;
      
      // Try localhost-specific verifier first
      if (currentDomain === 'localhost' || currentDomain === '127.0.0.1') {
        const verifier = createRecaptchaVerifierForLocalhost();
        if (verifier) {
          return verifier;
        }
      }
            return createRecaptchaVerifier();
    }
    throw new Error('reCAPTCHA not available');
  };

  // Request OTP via Firebase Phone Auth
  const requestOtp = async (phoneNumber: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Validate phone number format
      const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
      
      // Validate phone number (basic check)
      if (!/^\+[1-9]\d{1,14}$/.test(formattedPhoneNumber)) {
        throw new Error('Please enter a valid phone number with country code (e.g., +1234567890)');
      }
      
      // Log current domain for debugging
      const currentDomain = window.location.hostname;
      const appVerifier = initializeRecaptcha();
      
      const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error: any) {      
    dispatch({ type: 'SET_LOADING', payload: false });
      
      if (error.code === 'auth/invalid-app-credential') {
        const domainMessage = `Domain authorization issue. Current domain: ${window.location.hostname}. Please add this domain to Firebase Console → Authentication → Settings → Authorized domains.`;
        throw new Error(domainMessage);
      } else if (error.code === 'auth/invalid-phone-number') {
        throw new Error('Invalid phone number format. Please include country code.');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many requests. Please try again later.');
      } else if (error.code === 'auth/captcha-check-failed') {
        throw new Error('reCAPTCHA verification failed. Please refresh and try again.');
      } else if (error.code === 'auth/quota-exceeded') {
        throw new Error('SMS quota exceeded. Please try again later.');
      } else {
        throw new Error(error.message || 'Failed to send OTP. Please try again.');
      }
    }
  };

  // Verify OTP
  const verifyOtp = async (otp: string) => {
    if (!confirmationResult) {
      throw new Error('No confirmation result found. Please request OTP again.');
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const result = await confirmationResult.confirm(otp);
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
      throw new Error(error.message || 'Invalid OTP. Please try again.');
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    if (!state.user) return;
    
    try {
      // Update user in database
      const response = await userApiService.updateUser(state.user.id, userData);
      if (response.success) {
        localStorage.setItem('user', JSON.stringify(response.data));
        dispatch({ type: 'SET_USER', payload: response.data });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      // Fallback to local update if database operation fails
      const updatedUser = { ...state.user, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      dispatch({ type: 'SET_USER', payload: updatedUser });
    }
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      requestOtp,
      verifyOtp,
      logout,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};