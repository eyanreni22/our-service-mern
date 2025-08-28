import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardList, Star, Wrench, Wallet } from "lucide-react";

import {
  fetchProviderBookingsThunk,
  updateBookingStatusThunk,
} from "../redux/Slices/bookingSlice";
import { fetchProviderReviews } from "../redux/Slices/reviewSlice";
import {
  fetchProviderServices,
  addService,
  deleteService,
} from "../redux/Slices/ServiceSlice";
import { logout } from "../redux/Slices/UserSlice";

import InvoiceList from "../components/InvoiceList";
import ProviderPayments from "../components/providerPayments";
import BookingsList from "../components/BookingList";
import BookingListener from "../components/BookingListener";
import { selectProviderBookings } from "../selector/booking";

// Styled Components
const DashboardWrapper = styled.div`
  background-image: url("/images/navy2.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  width: 100%;
  overflow-y: auto;
  color: black;
  padding: 10px;
  text-align: center;
`;

const TopBar = styled.div`
  background-color: #1e293b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  flex-wrap: wrap;
`;

const WelcomeText = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background: ${(props) => props.bg || "#2563eb"};
  color: white;
  border: none;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    opacity: 0.9;
  }
`;

const TabButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: ${(props) => (props.active ? "white" : "transparent")};
  color: ${(props) => (props.active ? "black" : "white")};
  border: none;
  cursor: pointer;
`;

const FormWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 1rem;
  max-width: 900px;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.3);
  }
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
  resize: none;
  outline: none;
  height: 100px;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.3);
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #2563eb;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const contentVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const ServiceProviderDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const bookings = useSelector(selectProviderBookings);
  const loading = useSelector((state) => state.bookings.loading);
  const error = useSelector((state) => state.bookings.error);
  const providerReviews = useSelector((state) => state.reviews?.providerReviews) || [];
  const providerServices = useSelector((state) => state.services?.providerServices) || [];

  const [selectedSection, setSelectedSection] = useState("Bookings");
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
    category: "",
  });

  useEffect(() => {
    if (user?._id && user.role === "provider") {
      dispatch(fetchProviderBookingsThunk());
      dispatch(fetchProviderReviews(user._id));
      dispatch(fetchProviderServices());
    }
  }, [user?._id, user?.role, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleStatusChange = async (bookingId, status) => {
    try {
      await dispatch(updateBookingStatusThunk({ id: bookingId, status })).unwrap();
      toast.success(`Booking ${status} successfully`);
    } catch {
      toast.error("Error updating booking status.");
    }
  };

  const handleAddService = () => {
    const { name, description, price, image, category } = newService;
    if (!name || !description || !price || !image || !category) {
      toast.error("Please fill all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    Object.entries(newService).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        formData.append(key, value);
      }
    });

    dispatch(addService(formData)).then(() => {
      toast.success("Service added!");
      setNewService({ name: "", description: "", price: "", image: null, category: "" });
    });
  };

  const handleDeleteService = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await dispatch(deleteService(id)).unwrap();
        toast.success("Service deleted successfully");
      } catch {
        toast.error("Failed to delete service.");
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const tabs = [
    { name: "Bookings", icon: <ClipboardList size={20} /> },
    { name: "Reviews", icon: <Star size={20} /> },
    { name: "Services", icon: <Wrench size={20} /> },
    { name: "Payments", icon: <Wallet size={20} /> },
  ];

  return (
    <DashboardWrapper>
      <BookingListener />
      <div style={{ backgroundColor: "rgba(255,255,255,0.5)", minHeight: "100vh" }}>
        <TopBar>
          <WelcomeText>Welcome, {user?.name || "Provider"}!</WelcomeText>
          <NavButtons>
            <NavButton bg="#0ea5e9" onClick={() => navigate("/")}>Home</NavButton>
            <NavButton bg="#ef4444" onClick={handleLogout}>Logout</NavButton>
          </NavButtons>
        </TopBar>

        <div style={{ display: "flex", gap: "1rem", padding: "1rem", overflowX: "auto", backgroundColor: "#1e293b" }}>
          {tabs.map((tab) => (
            <TabButton
              key={tab.name}
              onClick={() => setSelectedSection(tab.name)}
              active={selectedSection === tab.name}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </TabButton>
          ))}
        </div>

        <div style={{ padding: "2rem", overflowY: "auto" }}>
          <AnimatePresence mode="wait">
            {selectedSection === "Bookings" && (
              <motion.div key="Bookings" initial="hidden" animate="visible" exit="exit" variants={contentVariants} transition={{ duration: 0.4 }}>
                <h2>Service Requests</h2>
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: "red" }}>Error: {error}</p>}
                <BookingsList bookings={bookings} onStatusChange={handleStatusChange} />
              </motion.div>
            )}

            {selectedSection === "Reviews" && (
              <motion.div key="Reviews" initial="hidden" animate="visible" exit="exit" variants={contentVariants} transition={{ duration: 0.4 }}>
                <h2>Customer Reviews</h2>
                {providerReviews.length ? providerReviews.map((review) => (
                  <div key={review._id} style={{ backgroundColor: "white", padding: "1rem", marginBottom: "1rem", borderRadius: "0.5rem" }}>
                    <p>⭐ {review.rating}</p>
                    <p>{review.comment}</p>
                  </div>
                )) : <p>No reviews available.</p>}
              </motion.div>
            )}

            {selectedSection === "Services" && (
              <motion.div key="Services" initial="hidden" animate="visible" exit="exit" variants={contentVariants} transition={{ duration: 0.4 }}>
                <h2>Manage Your Services</h2>

                <FormWrapper>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1e3a8a", marginBottom: "1rem" }}>
                    Add a New Service
                  </h3>
                  <InputGroup><Label>Service Name</Label><Input type="text" value={newService.name} onChange={(e) => setNewService({ ...newService, name: e.target.value })} /></InputGroup>
                  <InputGroup><Label>Category</Label><Input type="text" value={newService.category} onChange={(e) => setNewService({ ...newService, category: e.target.value })} /></InputGroup>
                  <InputGroup><Label>Description</Label><TextArea value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} /></InputGroup>
                  <InputGroup><Label>Price ($)</Label><Input type="number" value={newService.price} onChange={(e) => setNewService({ ...newService, price: e.target.value })} /></InputGroup>
                  <InputGroup><Label>Service Image</Label><Input type="file" onChange={(e) => setNewService({ ...newService, image: e.target.files[0] })} /></InputGroup>
                  <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                    <Button onClick={handleAddService}>Add Service</Button>
                  </div>
                </FormWrapper>

                {providerServices.length === 0 ? (
                  <p style={{ marginTop: "1rem", color: "#555" }}>You have not added any services yet.</p>
                ) : (
                  <div style={{ marginTop: "2rem", display: "grid", gap: "1.5rem" }}>
                    {providerServices.map((service) => (
                      <div key={service._id} style={{ backgroundColor: "white", padding: "1rem", borderRadius: "0.5rem" }}>
                        <h3 style={{ fontWeight: "bold" }}>{service.name}</h3>
                        {service.imageUrl && (
                          <img src={service.imageUrl} alt={service.name} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "0.5rem", marginTop: "0.5rem" }} />
                        )}
                        <Button style={{ backgroundColor: "#ef4444", marginTop: "0.75rem" }} onClick={() => handleDeleteService(service._id)}>
                          Delete Service
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {selectedSection === "Payments" && (
              <motion.div key="Payments" initial="hidden" animate="visible" exit="exit" variants={contentVariants} transition={{ duration: 0.4 }}>
                <h2>Payments & Invoices</h2>
                <ProviderPayments />
                <InvoiceList />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default ServiceProviderDashboard;
