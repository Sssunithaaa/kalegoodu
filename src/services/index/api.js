import axios from "axios";
import { store } from "../../store/store";
import { logout, loginSuccess } from "../../store/actions";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const api = axios.create({
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

const refreshAccessToken = async () => {
    const state = store.getState();
    const refreshToken = state.auth.refreshToken;

    // if (!refreshToken) {
    //     return handleSessionExpiry();
    // }

    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/token/refresh/`, { refresh: refreshToken });
        const newAccessToken = response.data.access;
        store.dispatch(loginSuccess(state.auth.user, newAccessToken, refreshToken));
        return newAccessToken;
    } catch (error) {
        return handleSessionExpiry();
    }
};



// Request interceptor
api.interceptors.request.use(
    async (config) => {
        const state = store.getState();
        let token = state.auth.accessToken;

        if (isTokenExpired(token)) {
            token = await refreshAccessToken();
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
                error.config.headers.Authorization = `Bearer ${newAccessToken}`;
                return axios(error.config);
            }
        }
        return Promise.reject(error);
    }
);

const handleSessionExpiry = () => {
    toast.error("Session expired. Please log in again.");

    // Navigate first
    if (window.location.pathname.startsWith("/admin")) {
        window.location.replace("/#/login");
    }

    // Then log out after a slight delay
    setTimeout(() => {
        store.dispatch(logout());
    }, 500);
};


// Check token expiry when app loads
const checkTokenOnLoad = () => {
    const state = store.getState();
    const token = state.auth.accessToken;
    if (isTokenExpired(token) && window.location.pathname.startsWith("/admin")) {
        handleSessionExpiry();
    }
};

// Run check when app starts (without infinite loop)
setTimeout(checkTokenOnLoad, 2000);


export default api;
