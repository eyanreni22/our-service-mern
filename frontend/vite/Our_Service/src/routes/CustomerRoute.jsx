import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const CustomerRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.user);
  console.log("User Info in CustomerRoute:", userInfo); // ✅ Debugging step

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  if (userInfo.role !== "customer") {
    return <Navigate to="/login" />;
  }

  return children ? children : <Outlet />;
};

// ✅ Add PropTypes
CustomerRoute.propTypes = {
  children: PropTypes.node,
};

export default CustomerRoute;
