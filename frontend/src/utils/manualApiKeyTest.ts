// Manual API Key Test for immediate debugging
export const runManualApiKeyTest = async () => {
  console.log('🧪 Running manual API key test...');
  
  const apiKey = 'AIzaSyB73CygLnFEgoX29Kc2ZcUOu4Ez0HzcxX8';
  const currentDomain = window.location.hostname;
  const fullUrl = window.location.origin;
  
  console.log('Current domain:', currentDomain);
  console.log('Full URL:', fullUrl);
  console.log('API Key:', apiKey);
  
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
    console.log('API Key test response:', result);
    
    if (result.error) {
      if (result.error.message === 'INVALID_APP_CREDENTIAL') {
        console.error('❌ INVALID_APP_CREDENTIAL detected!');
        console.log('🔧 This means your API key has domain restrictions.');
        console.log('📋 Go to Firebase Console → Project Settings → General → Your apps → Web app → API key restrictions');
        console.log('➕ Add these domains to allowed domains:');
        console.log('   - localhost');
        console.log('   - 127.0.0.1');
        console.log('   - ' + currentDomain);
        
        return {
          success: false,
          error: 'INVALID_APP_CREDENTIAL',
          message: 'API key has domain restrictions. Add localhost to allowed domains in Firebase Console.',
          solution: 'Go to Firebase Console → Project Settings → General → Your apps → Web app → API key restrictions'
        };
      } else {
        console.error('❌ Other API key error:', result.error.message);
        return {
          success: false,
          error: result.error.message,
          message: 'API key has other restrictions or issues.',
          solution: 'Check Firebase Console settings'
        };
      }
    } else {
      console.log('✅ API Key is working correctly!');
      return {
        success: true,
        message: 'API key is working correctly'
      };
    }
    
  } catch (error: any) {
    console.error('❌ API Key test failed:', error);
    return {
      success: false,
      error: error.message,
      message: 'API key test failed due to network or other issues.',
      solution: 'Check your internet connection and try again'
    };
  }
};

// Auto-run the test
if (typeof window !== 'undefined') {
  console.log('🚀 Auto-running API key test...');
  runManualApiKeyTest();
}
