import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
    const token = localStorage.getItem("token");
    const userInfo = useSelector((state) => state.user.user);

    if (!token) return <Navigate to="/login" />; // ✅ Redirect if not logged in

    // ✅ Prevents unnecessary redirection loop
    if (userInfo?.role === "customer" && window.location.pathname !== "/customer/dashboard") {
        return <Navigate to="/customer/dashboard" />;
    }
    if (userInfo?.role === "provider" && window.location.pathname !== "/provider/dashboard") {
        return <Navigate to="/provider/dashboard" />;
    }
    if (userInfo?.role === "admin" && window.location.pathname !== "/admin/dashboard") {
        return <Navigate to="/admin/dashboard" />;
    }

    return <Outlet />; // ✅ Render child routes if already at the correct dashboard
};

export default PrivateRoute;
