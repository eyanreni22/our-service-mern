import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBookings } from "../redux/Slices/adminSlice";
import AdminBookingsList from "../components/AdminBookingsList";

const AdminBookingsPage = () => {
  const dispatch = useDispatch();
  const { bookings, isLoading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllBookings());
  }, [dispatch]);

  return (
    <div>
      <h2>All Bookings</h2>
      {isLoading ? (
        <p>Loading bookings...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <AdminBookingsList bookings={bookings} />
      )}
    </div>
  );
};

export default AdminBookingsPage;
