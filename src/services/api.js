import axios from "axios";
import AuthService from "./auth.service";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // If no response return error
    if (!error.response) {
      return Promise.reject(error);
    }
    // Prevent infinite refresh loop
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/refreshToken")
    ) {
      originalRequest._retry = true;
      try {
        const response = await AuthService.refreshToken();
        const newAccessToken = response.data.accessToken;
        // Save new token
        localStorage.setItem("accessToken", newAccessToken);
        // Update original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        // Retry failed API
        return api(originalRequest);
      } catch (refreshError) {
        console.log("Refresh token expired", refreshError);
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
