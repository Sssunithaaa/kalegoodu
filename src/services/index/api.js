import axios from "axios";
import { store } from "../../store/store";
import { logout, loginSuccess } from "../../store/actions";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_URL,
});

// Create a separate axios instance for token refresh to avoid interceptor loops
const refreshApi = axios.create({
    baseURL: import.meta.env.VITE_APP_URL,
});

const isTokenExpired = (token) => {
    if (!token) return true;
    try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 < Date.now();
    } catch (error) {
        return true;
    }
};

let isRefreshing = false;
let failedRequests = [];

const processFailedRequests = (token) => {
    failedRequests.forEach((prom) => {
        prom.resolve(token);
    });
    failedRequests = [];
};

const refreshAccessToken = async () => {
    if (isRefreshing) {
        return new Promise((resolve) => {
            failedRequests.push({ resolve });
        });
    }

    isRefreshing = true;
    const state = store.getState();
    const refreshToken = state.auth.refreshToken;

    if (!refreshToken) {
        isRefreshing = false;
        handleSessionExpiry();
        return Promise.reject(new Error("No refresh token available"));
    }

    try {
        const response = await refreshApi.post('/api/token/refresh/', 
            { refresh: refreshToken }
        );
        
        // Extract BOTH tokens from response
        const newAccessToken = response.data.access;
        const newRefreshToken = response.data.refresh; // Get the rotated refresh token
        
        // Update store with both tokens
        store.dispatch(loginSuccess(
            state.auth.user, 
            newAccessToken, 
            newRefreshToken // Store the new refresh token
        ));
        
        processFailedRequests(newAccessToken);
        isRefreshing = false;
        return newAccessToken;
    } catch (error) {
        isRefreshing = false;
        handleSessionExpiry();
        return Promise.reject(error);
    }
};

// Request interceptor for main API instance
api.interceptors.request.use(
    async (config) => {
        // Skip auth header for refresh endpoint
        
        if (config.url === '/api/token/refresh/') {
            return config;
        }

        const state = store.getState();
        let token = state.auth.accessToken;
        const refreshToken = state.auth.refreshToken;
 

        // If token expired or about to expire (5 minute window)
        if (token && (isTokenExpired(token) || isTokenAboutToExpire(token, 300))) {
            token = await refreshAccessToken();
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Helper function to check if token is about to expire
const isTokenAboutToExpire = (token, thresholdSeconds) => {
    const decoded = jwtDecode(token);
    return (decoded.exp * 1000) < (Date.now() + (thresholdSeconds * 1000));
};

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                const newAccessToken = await refreshAccessToken();
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

const handleSessionExpiry = () => {
    store.dispatch(logout());
    if (window.location.pathname.startsWith("/admin")) {
        // Use window.location.replace to prevent back navigation
        window.location.replace("/login");
        toast.error("Session expired. Please log in again.");
    }
};

// Initial token check
const checkInitialAuth = async () => {
    const state = store.getState();
    const token = state.auth.accessToken;
    const refreshToken = state.auth.refreshToken;

    if (!token && !refreshToken) {
        if (window.location.pathname.startsWith("/admin")) {
            handleSessionExpiry();
        }
        return;
    }

    // Check if token is expired or about to expire
    if (token && (isTokenExpired(token) || isTokenAboutToExpire(token, 300))) {
        try {
            await refreshAccessToken();
        } catch {
            if (window.location.pathname.startsWith("/admin")) {
                handleSessionExpiry();
            }
        }
    }
};

// Run initial check
checkInitialAuth();

// ... (all your existing code above remains the same) ...

/**
 * Authentication guard for route protection
 * @returns {Promise<boolean>} Resolves to true if authenticated, rejects if not
 */
const authGuard = async () => {
  const state = store.getState();
  const { accessToken, refreshToken } = state.auth;

  // If no tokens exist at all
  if (!accessToken && !refreshToken) {
    throw new Error('No authentication tokens available');
  }

  // If access token is valid
  if (accessToken && !isTokenExpired(accessToken)) {
    return true;
  }

  // If token needs refreshing
  try {
    await refreshAccessToken();
    return true;
  } catch (error) {
    // If refresh fails, clear session and redirect
    if (window.location.pathname.startsWith("/admin")) {
      handleSessionExpiry();
    }
    throw new Error('Session expired. Please log in again.');
  }
};

// Export everything you might need
export {
  api as default,
  authGuard,
  refreshAccessToken,
  isTokenExpired,
  handleSessionExpiry
};