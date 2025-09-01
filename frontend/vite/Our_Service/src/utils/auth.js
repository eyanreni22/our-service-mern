// utils/auth.js

// Existing token and user functions
export const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error retrieving user from storage:", error);
    return null;
  }
};

export const getToken = () => {
  try {
    return localStorage.getItem("token") || null;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

export const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const removeAdminToken = () => {
  localStorage.removeItem("adminToken");
};

// ✅ Add these:
export const isAuthenticated = () => !!getToken();

export const isAdmin = () => {
  const user = getUserFromStorage();
  return user?.role === "admin"; // Adjust key if your backend uses another name
};

export const isServiceProvider = () => {
  const user = getUserFromStorage();
  return user?.role === "provider"; // Adjust key based on your roles
};
