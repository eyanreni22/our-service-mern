import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
  fetchAllUsers,
  fetchAllBookings,
  fetchAllInvoices,
  fetchAllServices,
  logoutAdmin,
} from "../redux/Slices/adminSlice";

import {
  Button,
  Typography,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Grid, // ✅ use classic Grid
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import UserManagement from "../components/UserManagement";
import AdminBookingsList from "../components/AdminBookingsList";
import InvoiceList from "../components/InvoiceList";
import ServiceManagement from "../components/ServiceManagement";

// Styled Components
const DashboardWrapper = styled.div`
  background-color: rgb(147, 177, 179);
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: rgb(25, 9, 16);
  color: white;
  box-shadow: 0 2px 4px rgba(75, 77, 82, 0.1);
`;

const StatsSection = styled.div`
  padding: 2rem;
`;

const StyledCard = styled(Paper)`
  padding: 1rem;
  text-align: center;
  border-radius: 12px;
  height: 100%;
  box-shadow: 0 4px 6px rgba(26, 27, 29, 0.05);
`;

const ContentSection = styled.div`
  padding: 2rem;
  & > * {
    margin-bottom: 1.5rem;
  }
`;

const CenteredLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

// ✅ Stat Card Component
const StatCard = ({ label, value }) => (
  <StyledCard elevation={2}>
    <Typography variant="h6">{label}</Typography>
    <Typography variant="h5">{value}</Typography>
  </StyledCard>
);

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, bookings, invoices, services, isLoading, error, user } =
    useSelector((state) => state.admin);

  useEffect(() => {
    if (!user) {
      navigate("/admins/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      dispatch(fetchAllUsers());
      dispatch(fetchAllBookings());
      dispatch(fetchAllInvoices());
      dispatch(fetchAllServices());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logoutAdmin());
    }
  };

  if (isLoading) {
    return (
      <CenteredLoader>
        <CircularProgress />
      </CenteredLoader>
    );
  }

  return (
    <DashboardWrapper>
      {/* Header */}
      <Header>
        <div>
          <Typography variant="h4">Admin Dashboard</Typography>
          {user?.name && (
            <Typography variant="subtitle1">
              Logged in as: {user.name}
            </Typography>
          )}
        </div>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Header>

      {/* Stats */}
      <StatsSection>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard label="Users" value={users?.length || 0} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard label="Bookings" value={bookings?.length || 0} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard label="Invoices" value={invoices?.length || 0} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard label="Services" value={services?.length || 0} />
          </Grid>
        </Grid>
      </StatsSection>

      {/* Management Panels */}
      <ContentSection>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>User Management</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <UserManagement users={users} />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Booking Management</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AdminBookingsList bookings={bookings} />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Invoice Management</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <InvoiceList invoices={invoices} />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Service Management</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ServiceManagement services={services} />
          </AccordionDetails>
        </Accordion>
      </ContentSection>
    </DashboardWrapper>
  );
};

export default AdminDashboard;
