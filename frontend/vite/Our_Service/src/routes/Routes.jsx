import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Register from "../pages/Register";
import AdminRegister from "../pages/AdminRegister";
import AdminLogin from "../pages/AdminLogin";
import CustomerDashboard from "../pages/CustomerDashboard";
import ServiceProviderDashboard from "../pages/ServiceProviderDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentFailed from "../pages/PaymentFailed";

// Routes (guards)
import PrivateRoute from "../routes/PrivateRoute";
import AdminRoute from "../routes/AdminRoute";
import ProviderRoute from "../routes/ProviderRoute";

const AppRoutes = () => {
  return (
    
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admins/login" element={<AdminLogin />} />
        <Route path="/admins/register" element={<AdminRegister />} />

        {/* Protected Customer Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
        </Route>

        {/* Protected Service Provider Route */}
        <Route element={<ProviderRoute />}>
          <Route path="/provider/dashboard" element={<ServiceProviderDashboard />} />
        </Route>

        {/* Protected Admin Route */}
        <Route element={<AdminRoute />}>
          <Route path="/admins/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Optional 404 Page */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
