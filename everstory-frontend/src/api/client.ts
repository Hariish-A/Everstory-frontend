import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8001",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔒 Inject Authorization header from localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 📦 Return only response data or throw
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data || error.message;
    console.error("API Error:", message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
