export const user_api = 'https://ltbackend2.vercel.app'
export const socket_user_api = "//localhost:8080"
export const enquiry_api = 'https://ltbackend2.vercel.app'
export const production = false;

// config.js
const config = {
    production: {
      user_api: 'https://ltbackend2.vercel.app',
      enquiry_api: 'https://ltbackend2.vercel.app',
    },
    development: {
      user_api: 'http://localhost:4000',
      frontendUrl: 'http://localhost:4000',
    },
  };
  
  // function to toggle URLs
  function getEnvironmentConfig(isProduction) {
    return isProduction ? config.production : config.development;
  }
  
  // Example usage
  const isProduction = true; // set to false for development
  export const environmentConfig = getEnvironmentConfig(isProduction);
  