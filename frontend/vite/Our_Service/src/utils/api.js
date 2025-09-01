// import axios from "axios";

// // Use environment variable for backend URL
// const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
// console.log("API URL:", BASE_URL);

// const api = axios.create({
//   baseURL: BASE_URL,
//   headers: { "Content-Type": "application/json" },
// });

// // Attach token if available
// api.interceptors.request.use(
//   (req) => {
//     const token = localStorage.getItem("token");
//     if (token) req.headers.Authorization = `Bearer ${token}`;
//     return req;
//   },
//   (error) => {
//     console.error("Request error:", error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       console.error("API Response Error:", error.response);
//     } else if (error.request) {
//       console.error("No response received:", error.request);
//     } else {
//       console.error("Axios error setup:", error.message);
//     }
//     return Promise.reject(error);
//   }
// );

// // Auth APIs
// export const registerUser = (formData) => api.post("/users/register", formData);
// export const loginUser = (data) => api.post("/users/login", data);
// export const registerAdmin = (formData) => api.post("/admins/register", formData);
// export const loginAdmin = (data) => api.post("/admins/login", data);

// // Booking APIs
// export const createBooking = (data) => api.post("/bookings", data);
// export const getCustomerBookings = () => api.get("/bookings/customer");
// export const getProviderBookings = () => api.get("/bookings/provider");
// export const updateBookingStatus = (id, status) =>
//   api.put(`/bookings/status/${id}`, { status });
// export const updatePaymentStatus = (id, paymentStatus) =>
//   api.put(`/bookings/payment/${id}`, { paymentStatus });

// export default api;
import axios from "axios";

// Backend API base URL
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
console.log("API URL:", BASE_URL);

// Image base URL (same server, without /api)
export const IMAGE_BASE_URL = BASE_URL.replace("/api", "");

// Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach token if available
api.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Response Error:", error.response);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Axios setup error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const registerUser = (formData) => api.post("/users/register", formData);
export const loginUser = (data) => api.post("/users/login", data);
export const registerAdmin = (formData) => api.post("/admins/register", formData);
export const loginAdmin = (data) => api.post("/admins/login", data);

// Booking APIs
export const createBooking = (data) => api.post("/bookings", data);
export const getCustomerBookings = () => api.get("/bookings/customer");
export const getProviderBookings = () => api.get("/bookings/provider");
export const updateBookingStatus = (id, status) =>
  api.put(`/bookings/status/${id}`, { status });
export const updatePaymentStatus = (id, paymentStatus) =>
  api.put(`/bookings/payment/${id}`, { paymentStatus });

export default api;