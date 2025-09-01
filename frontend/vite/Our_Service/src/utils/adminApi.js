// adminApi.js
import axios from "axios";

const adminApi = axios.create({
  baseURL: "http://localhost:5000/api/admins",
  headers: {
    "Content-Type": "application/json",
  },
});

// // Attach admin token to requests
// adminApi.interceptors.request.use((config) => {
//   const token = localStorage.getItem("adminToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");

  // Don’t attach token for login or register
  if (token && !config.url.includes("/login") && !config.url.includes("/register")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// Handle expired token globally
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data?.message === "jwt expired"
    ) {
      // Clear token and redirect to login
      localStorage.removeItem("adminToken");
      window.location.href = "/admin/login"; // or use navigate() if in React component
    }
    return Promise.reject(error);
  }
);

export const adminLogin = (credentials) => adminApi.post('/login', credentials);
export const adminRegister = (data) => adminApi.post('/register', data);
export const fetchUsers = () => adminApi.get("/users");
export const fetchBookings = () => adminApi.get("/bookings");
export const fetchInvoices = () => adminApi.get("/invoices");

export const toggleUserStatus = (id) => adminApi.put(`/user/status/${id}`);
export const deleteUser = (id) => adminApi.delete(`/user/${id}`);
export const updateBookingStatus = (id, status) =>
  adminApi.put(`/bookings/${id}/status`, { status });
export  const deleteService = (serviceId) => adminApi.delete(`/service/${serviceId}`);
export const fetchServices = () => adminApi.get("/services");


export default adminApi;
