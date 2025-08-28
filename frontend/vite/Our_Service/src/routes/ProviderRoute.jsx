import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const ProviderRoute = ({ children }) => {
  const { user: userInfo, loading } = useSelector((state) => state.user);

  // 🔄 Show loading only when fetching user
  if (loading) {
    return <div>Loading...</div>;
  }

  // ❌ Redirect if not logged in or not a provider
  if (!userInfo || userInfo.role !== "provider") {
    return <Navigate to="/login" replace />;
  }

  // ✅ Allow access if role is provider
  return children ? children : <Outlet />;
};

// ✅ PropTypes validation
ProviderRoute.propTypes = {
  children: PropTypes.node,
};

export default ProviderRoute;
