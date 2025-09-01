// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchProviderBookingsThunk,
//   updateBookingStatusThunk,
// } from "../redux/Slices/bookingSlice";
// import { toast } from "react-toastify";
// import { format } from "date-fns";
// import styled from "styled-components";

// // Styled Components
// const Container = styled.div`
//   padding: 20px;
//   color: #000;
// `;

// const Card = styled.div`
//   background: #fff;
//   padding: 16px;
//   margin-bottom: 16px;
//   border-radius: 8px;
//   box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
// `;

// const Badge = styled.span`
//   padding: 4px 10px;
//   border-radius: 6px;
//   font-weight: 600;
//   color: white;
//   display: inline-block;
//   margin-bottom: 8px;
//   background-color: ${({ status }) => {
//     switch (status) {
//       case "Pending":
//         return "orange";
//       case "Accepted":
//         return "green";
//       case "Rejected":
//         return "red";
//       case "Completed":
//         return "blue";
//       default:
//         return "gray";
//     }
//   }};
// `;

// const Actions = styled.div`
//   margin-top: 10px;
//   display: flex;
//   gap: 10px;
// `;

// const ActionButton = styled.button`
//   padding: 6px 12px;
//   border: none;
//   border-radius: 4px;
//   color: white;
//   background-color: ${({ variant }) => {
//     switch (variant) {
//       case "accept":
//         return "green";
//       case "reject":
//         return "red";
//       case "complete":
//         return "blue";
//       default:
//         return "gray";
//     }
//   }};
//   cursor: pointer;
//   opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
// `;

// const EmptyMessage = styled.div`
//   background-color: #fef9c3;
//   padding: 20px;
//   border-radius: 8px;
//   text-align: center;
// `;

// const ProviderBookingCard = () => {
//   const dispatch = useDispatch();
//   const { bookings, loading, error } = useSelector((state) => state.bookings);
//   const [updatingId, setUpdatingId] = useState(null);

//   useEffect(() => {
//     dispatch(fetchProviderBookingsThunk());
//   }, [dispatch]);

//   const handleUpdateStatus = async (bookingId, status) => {
//     setUpdatingId(bookingId);
//     try {
//       await dispatch(updateBookingStatusThunk({ id: bookingId, status })).unwrap();
//       toast.success("Booking status updated!");
//     } catch (err) {
//       toast.error(err?.message || "Failed to update booking status");
//     } finally {
//       setUpdatingId(null);
//     }
//   };

//   if (loading) return <Container>Loading bookings...</Container>;
//   if (error) return <Container>Error: {error}</Container>;

//   return (
//     <Container>
//       <h2>Provider Bookings</h2>

//       {bookings.length === 0 ? (
//         <EmptyMessage>
//           <p>No bookings yet. You'll see them here once customers start booking your services.</p>
//         </EmptyMessage>
//       ) : (
//         bookings.map((booking) => (
//           <BookingItem
//             key={booking._id}
//             booking={booking}
//             onUpdateStatus={handleUpdateStatus}
//             updating={updatingId === booking._id}
//           />
//         ))
//       )}
//     </Container>
//   );
// };

// const BookingItem = ({ booking, onUpdateStatus, updating }) => {
//   const { _id, service, customer, status, date } = booking;

//   return (
//     <Card>
//       <div>
//         <h3>Booking ID: {_id}</h3>
//         <p>Service: {service?.name}</p>
//         <p>Customer: {customer?.name}</p>
//         <p>
//           <Badge status={status}>Status: {status}</Badge>
//         </p>
//         <p>Date: {format(new Date(date), "PPP")}</p>
//       </div>

//       <Actions>
//         {status === "Pending" && (
//           <>
//             <ActionButton
//               variant="accept"
//               onClick={() => onUpdateStatus(_id, "Accepted")}
//               disabled={updating}
//             >
//               {updating ? "Accepting..." : "Accept"}
//             </ActionButton>
//             <ActionButton
//               variant="reject"
//               onClick={() => onUpdateStatus(_id, "Rejected")}
//               disabled={updating}
//             >
//               {updating ? "Rejecting..." : "Reject"}
//             </ActionButton>
//           </>
//         )}

//         {status === "Accepted" && (
//           <ActionButton
//             variant="complete"
//             onClick={() => onUpdateStatus(_id, "Completed")}
//             disabled={updating}
//           >
//             {updating ? "Completing..." : "Mark as Completed"}
//           </ActionButton>
//         )}
//       </Actions>
//     </Card>
//   );
// };

// export default ProviderBookingCard;
// components/ProviderBookingCard.js
import styled from "styled-components";
import { format } from "date-fns";
import PropTypes from "prop-types";

const Card = styled.div` /* ... */ `;
const Badge = styled.span` /* ... */ `;
const Actions = styled.div` /* ... */ `;
const ActionButton = styled.button` /* ... */ `;

const ProviderBookingCard = ({ booking, onStatusChange, updating }) => {
  const { _id, service, customer, status, date } = booking;

  return (
    <Card>
      <div>
        <h3>Booking ID: {_id}</h3>
        <p>Service: {service?.name}</p>
        <p>Customer: {customer?.name}</p>
        <p>
          <Badge status={status}>Status: {status}</Badge>
        </p>
        <p>Date: {format(new Date(date), "PPP")}</p>
      </div>

      <Actions>
        {status === "Pending" && (
          <>
            <ActionButton
              variant="accept"
              onClick={() => onStatusChange(_id, "Accepted")}
              disabled={updating}
            >
              {updating ? "Accepting..." : "Accept"}
            </ActionButton>
            <ActionButton
              variant="reject"
              onClick={() => onStatusChange(_id, "Rejected")}
              disabled={updating}
            >
              {updating ? "Rejecting..." : "Reject"}
            </ActionButton>
          </>
        )}

        {status === "Accepted" && (
          <ActionButton
            variant="complete"
            onClick={() => onStatusChange(_id, "Completed")}
            disabled={updating}
          >
            {updating ? "Completing..." : "Mark as Completed"}
          </ActionButton>
        )}
      </Actions>
    </Card>
  );
};

ProviderBookingCard.propTypes = {
  booking: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    service: PropTypes.shape({
      name: PropTypes.string,
    }),
    customer: PropTypes.shape({
      name: PropTypes.string,
    }),
    status: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  onStatusChange: PropTypes.func.isRequired,
  updating: PropTypes.bool,
};

export default ProviderBookingCard;
