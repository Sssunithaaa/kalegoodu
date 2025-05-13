// // In your existing api.js file (where you configure axios)

// // ... (all your existing code) ...

// /**
//  * Authentication guard function for route protection
//  * @returns {Promise<boolean>} true if authenticated, throws if not
//  */

// export const authGuard = async () => {
//   const state = store.getState();
//   const { accessToken, refreshToken } = state.auth;

//   // If no tokens at all
//   if (!accessToken && !refreshToken) {
//     throw new Error('No authentication tokens available');
//   }

//   // If token is valid
//   if (accessToken && !isTokenExpired(accessToken)) {
//     return true;
//   }

//   // If token needs refresh
//   try {
//     await refreshAccessToken();
//     return true;
//   } catch (error) {
//     throw new Error('Failed to refresh authentication token');
//   }
// };

// // ... (rest of your existing code) ...