import {
  Typography,
  Paper,
  Grid,
  Button,
  Box,
  Chip,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updateBookingStatusAction } from "../redux/Slices/adminSlice";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const statusColor = (status) => {
  switch (status) {
    case "pending":
      return "warning";
    case "confirmed":
      return "primary";
    case "completed":
      return "success";
    case "cancelled":
      return "error";
    default:
      return "default";
  }
};

const AdminBookingsList = ({ bookings }) => {
  const dispatch = useDispatch();
  const safeBookings = Array.isArray(bookings) ? bookings : [];

  const handleStatusChange = async (id, status) => {
    try {
      await dispatch(updateBookingStatusAction({ id, status })).unwrap();
      toast.success("Booking status updated!");
    } catch (err) {
      toast.error(err?.message || "Update failed");
    }
  };

  if (safeBookings.length === 0) {
    return (
      <Paper sx={{ padding: 4, textAlign: "center", backgroundColor: "#fff7e6" }}>
        <Typography variant="body1" color="textSecondary">
          No bookings available.
        </Typography>
      </Paper>
    );
  }

  return (
    <Grid container spacing={3}>
      {safeBookings.map((booking) => (
        <Grid item xs={12} md={6} lg={4} key={booking._id}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Booking ID: {booking._id}
            </Typography>
            <Typography variant="body1">
              Customer: {booking.customer?.name || "N/A"}
            </Typography>
            <Typography variant="body2">
              Email: {booking.customer?.email || "N/A"}
            </Typography>
            <Typography variant="body2">
              Provider: {booking.provider?.name || "N/A"}
            </Typography>
            <Typography variant="body2">
              Service: {booking.service?.name || booking.service?.title || "N/A"}
            </Typography>
            <Typography variant="body2">
              Date:{" "}
              {booking.date
                ? new Date(booking.date).toLocaleDateString()
                : "N/A"}
            </Typography>

            <Box mt={2}>
              <Chip label={booking.status} color={statusColor(booking.status)} />
            </Box>

            <Box mt={2} display="flex" gap={1} flexWrap="wrap">
              {["pending", "confirmed", "completed", "cancelled"].map((status) => (
                <Button
                  key={status}
                  variant="outlined"
                  size="small"
                  onClick={() => handleStatusChange(booking._id, status)}
                  disabled={booking.status === status}
                >
                  {status}
                </Button>
              ))}
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

AdminBookingsList.propTypes = {
  bookings: PropTypes.array.isRequired,
};

export default AdminBookingsList;
