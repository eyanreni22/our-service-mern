// import { useEffect } from "react";
// import { useParams } from "react-router-dom";


// const PaymentSuccess = () => {
//   const { session_id, bookingId } = useParams(); 


//   useEffect(() => {
//     const fetchUpdatedBooking = async () => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}`);
//             const data = await response.json();
//             console.log("Updated Booking:", data);
//         } catch (error) {
//             console.error("Error fetching booking:", error);
//         }
//     };

//     fetchUpdatedBooking();
// }, [session_id, bookingId]);

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="bg-white p-6 rounded-lg shadow-md text-center">
//         <h2 className="text-2xl font-bold text-green-600">✅ Payment Successful!</h2>
//         <p className="text-gray-600">Your payment has been processed successfully.</p>
//         <a href="/dashboard" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
//           Go to Dashboard
//         </a>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useSearchParams } from "react-router-dom";
// import { confirmPayment } from "../redux/Slices/paymentSlice";

// const PaymentSuccess = () => {
//   const dispatch = useDispatch();
//   const [searchParams] = useSearchParams();
//   const sessionId = searchParams.get("session_id");
//   const bookingId = searchParams.get("booking_id");

//   useEffect(() => {
//     if (sessionId && bookingId) {
//       dispatch(confirmPayment({ sessionId, bookingId }));
//     }
//   }, [dispatch, sessionId, bookingId]);

//   return <div>Payment Successful! Redirecting...</div>;
// };

// export default PaymentSuccess;
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { confirmPayment } from "../redux/Slices/paymentSlice";
// import { CircularProgress, Alert } from "@mui/material";

// const PaymentSuccess = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const sessionId = searchParams.get("session_id");
//   const bookingId = searchParams.get("booking_id");

//   const { loading, success, error } = useSelector((state) => state.payment);
//   const [message, setMessage] = useState("Verifying payment...");

//   useEffect(() => {
//     if (sessionId && bookingId) {
//       dispatch(confirmPayment({ sessionId, bookingId }));
//     } else {
//       setMessage("Missing payment details. Please contact support.");
//     }
//   }, [dispatch, sessionId, bookingId]);

//   useEffect(() => {
//     if (success) {
//       setMessage("✅ Payment Confirmed! Redirecting...");
//       setTimeout(() => {
//         navigate(`/booking-details/${bookingId}`); // Redirect to booking details page
//       }, 3000);
//     }
//     if (error) {
//       setMessage("❌ Payment verification failed. Please try again.");
//     }
//   }, [success, error, navigate, bookingId]);

//   return (
//     <div style={{ textAlign: "center", marginTop: "20px" }}>
//       <h3>Payment Status</h3>
//       {loading && <CircularProgress />}
//       {message && <Alert severity={success ? "success" : "error"}>{message}</Alert>}
//     </div>
//   );
// };

// export default PaymentSuccess;

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../utils/api";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const paymentId = params.get("paymentId");

  useEffect(() => {
    if (paymentId) {
      API.post("/payments/confirm", { paymentId })
        .then(res => console.log("Payment confirmed:", res.data))
        .catch(err => console.error(err));
    }
  }, [paymentId]);

  return <div>✅ Payment Successful</div>;
};

export default PaymentSuccess;
