import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.REACT_APP_API_BASE_URL || "http://localhost:3000",
  timeout: 10000,
  // withCredentials: true, // uncomment for cookie based auth
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data || error.message;
    console.error("API Error:", message);
    return Promise.reject(error);
  }
);

export default axiosInstance;