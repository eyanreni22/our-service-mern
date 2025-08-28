// import React from "react";
// import ProviderBookingCard from "./ProviderBookingCard"; // Adjust the path as needed

// const BookingsList = ({ bookings = [], onStatusChange }) => {
//   // No bookings available
//   if (!bookings.length) {
//     return <p className="text-gray-500">No bookings available.</p>;
//   }

//   return (
//     <div className="space-y-4">
//       {bookings.map((booking) => (
//         <ProviderBookingCard
//           key={booking._id}
//           booking={booking}
//           onStatusChange={onStatusChange}
//         />
//       ))}
//     </div>
//   );
// };

// export default BookingsList;
// components/BookingsList.js
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchProviderBookingsThunk, updateBookingStatusThunk } from "../redux/Slices/bookingSlice";
import ProviderBookingCard from "./ProviderBookingCard";
import { toast } from "react-toastify";
import styled from "styled-components";

const Container = styled.div` padding: 20px; color: #000; `;
const EmptyMessage = styled.div` background-color: #fef9c3; padding: 20px; border-radius: 8px; text-align: center; `;

const BookingsList = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.bookings);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    dispatch(fetchProviderBookingsThunk());
  }, [dispatch]);

  const handleStatusChange = async (bookingId, status) => {
    setUpdatingId(bookingId);
    try {
      await dispatch(updateBookingStatusThunk({ id: bookingId, status })).unwrap();
      toast.success("Booking status updated!");
    } catch (err) {
      toast.error(err?.message || "Failed to update booking status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <Container>Loading bookings...</Container>;
  if (error) return <Container>Error: {error}</Container>;

  return (
    <Container>
      <h2>Provider Bookings</h2>
      {bookings.length === 0 ? (
        <EmptyMessage>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <p>No bookings yet. You'll see them here once customers start booking your services.</p>

        </EmptyMessage>
      ) : (
        bookings.map((booking) => (
          <ProviderBookingCard
            key={booking._id}
            booking={booking}
            onStatusChange={handleStatusChange}
            updating={updatingId === booking._id}
          />
        ))
      )}
    </Container>
  );
};

export default BookingsList;

