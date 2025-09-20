// // Firebase Phone Auth Workaround for localhost
// import { initializeApp, getApps } from 'firebase/app';
// import { getAuth, connectAuthEmulator } from 'firebase/auth';

// // Alternative Firebase configuration specifically for localhost
// const localhostConfig = {
//   apiKey: "AIzaSyB73CygLnFEgoX29Kc2ZcUOu4Ez0HzcxX8",
//   authDomain: "kapscare-e7841.firebaseapp.com",
//   projectId: "kapscare-e7841",
//   storageBucket: "kapscare-e7841.firebasestorage.app",
//   messagingSenderId: "375514761613",
//   appId: "1:375514761613:web:a5c3cae302beb17e7cd5c4",
//   measurementId: "G-G4983TB7D6"
// };

// // Create alternative Firebase app for localhost
// export const createLocalhostFirebaseApp = () => {
//   const currentDomain = window.location.hostname;
  
//   if (currentDomain === 'localhost' || currentDomain === '127.0.0.1') {
//     console.log('🔧 Creating localhost-specific Firebase app...');
    
//     // Check if app already exists
//     const existingApp = getApps().find(app => app.name === 'localhost-app');
//     if (existingApp) {
//       console.log('✅ Localhost Firebase app already exists');
//       return existingApp;
//     }
    
//     // Create new app for localhost
//     const localhostApp = initializeApp(localhostConfig, 'localhost-app');
//     const localhostAuth = getAuth(localhostApp);
    
//     console.log('✅ Localhost Firebase app created');
//     return { app: localhostApp, auth: localhostAuth };
//   }
  
//   return null;
// };

// // Test if we can use the alternative configuration
// export const testAlternativeConfig = async () => {
//   try {
//     const { auth } = createLocalhostFirebaseApp() || {};
//     if (!auth) return false;
    
//     console.log('🧪 Testing alternative Firebase configuration...');
    
//     // Test basic auth functionality
//     const testResult = await new Promise((resolve) => {
//       const unsubscribe = auth.onAuthStateChanged((user) => {
//         unsubscribe();
//         resolve(true);
//       });
      
//       // Timeout after 2 seconds
//       setTimeout(() => {
//         unsubscribe();
//         resolve(false);
//       }, 2000);
//     });
    
//     console.log('✅ Alternative configuration test result:', testResult);
//     return testResult;
    
//   } catch (error) {
//     console.error('❌ Alternative configuration test failed:', error);
//     return false;
//   }
// };

// // Get the appropriate Firebase auth instance
// export const getFirebaseAuth = () => {
//   const currentDomain = window.location.hostname;
  
//   if (currentDomain === 'localhost' || currentDomain === '127.0.0.1') {
//     const localhostApp = createLocalhostFirebaseApp();
//     if (localhostApp) {
//       console.log('🔧 Using localhost-specific Firebase auth');
//       return localhostApp.auth;
//     }
//   }
  
//   // Fallback to default auth
//   console.log('🔧 Using default Firebase auth');
//   return null;
// };
