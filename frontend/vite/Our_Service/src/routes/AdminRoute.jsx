// // import React from "react";
// // import { useSelector } from "react-redux";
// // import { Navigate, Outlet } from "react-router-dom";

// // const AdminRoute = ({ children }) => {
// //   const { admin, loading } = useSelector((state) => state.admin); // ✅ Use admin slice

// //   if (loading) {
// //     return <div className="text-center py-10">Loading...</div>;
// //   }

// //   // If not logged in or no token
// //   if (!admin || !admin.token) {
// //     return <Navigate to="/admin/login" />;
// //   }

// //   return children ? children : <Outlet />;
// // };

// // export default AdminRoute;
// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router-dom";

// const AdminRoute = ({ children }) => {
//   const { user: admin, token, loading } = useSelector((state) => state.admin); // ✅ admin slice

//   if (loading) {
//     return <div className="text-center py-10">Loading...</div>;
//   }

//   if (!admin || !token) {
//     return <Navigate to="/admin/login" replace />;
//   }

//   return children ? children : <Outlet />;
// };

// export default AdminRoute;
// import { Navigate, Outlet } from "react-router-dom";

// function AdminRoute() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   if (!user || !token) {
//     // Not logged in → redirect to admin login
//     return <Navigate to="/admins/login" replace />;
//   }

//   if (user.role !== "admin") {
//     // Logged in but not an admin → kick out
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />; // ✅ render protected admin routes
// }

// export default AdminRoute;
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { admin } = useSelector((state) => state.admin);
  const token = localStorage.getItem("adminToken");

  if (!admin || !token) {
    return <Navigate to="/admins/login" replace />;
  }

  if (admin.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
