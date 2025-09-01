// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import styled from "styled-components";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// import {
//   fetchCustomerBookingsThunk,
//   bookServiceThunk,
// } from "../redux/Slices/bookingSlice";
// import { fetchServices } from "../redux/Slices/ServiceSlice";
// import { logout } from "../redux/Slices/UserSlice";

// import PaymentButton from "../components/paymentButton";
// import ReviewForm from "../components/ReviewForm";
// import AutoReviewPrompt from "../components/AutoReviewPrompt";
// import InvoiceList from "../components/InvoiceList";
// import PaymentHistory from "../components/paymentHistory";

// import { IMAGE_BASE_URL } from "../utils/api"; // ✅ import base URL for images

// // ===================== STYLED COMPONENTS =====================
// const Container = styled.div`
//   display: flex;
//   height: 100%;
// `;

// const Sidebar = styled.div`
//   width: 220px;
//   background-color: #f2f2f2;
//   padding: 20px;
//   height: 100vh;
// `;

// const MainContent = styled.div`
//   flex: 1;
//   padding: 24px;
//   background-color: #fff;
// `;

// const SidebarButton = styled.button`
//   display: block;
//   width: 100%;
//   padding: 12px;
//   margin-bottom: 10px;
//   background-color: ${(props) => (props.$active ? "#007bff" : "#ddd")};
//   color: ${(props) => (props.$active ? "#fff" : "#000")};
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
// `;

// const ServiceCard = styled.div`
//   width: 300px;
//   padding: 16px;
//   background: rgba(177, 196, 203, 0.6);
//   border-radius: 8px;
//   text-align: center;
//   box-shadow: 0 4px 6px rgba(102, 48, 48, 0.1);
// `;

// const ServiceImage = styled.img`
//   width: 200px;
//   height: 150px;
//   border-radius: 8px;
//   object-fit: cover;
//   margin-bottom: 10px;
// `;

// const Button = styled.button`
//   background-color: #007bff;
//   color: white;
//   padding: 8px 12px;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   margin-top: 10px;
// `;

// const BookingCard = styled.div`
//   padding: 16px;
//   background: #f9f9f9;
//   border-radius: 8px;
//   margin-bottom: 10px;
// `;

// const StatusBadge = styled.span`
//   background-color: ${(props) =>
//     props.$status === "completed"
//       ? "green"
//       : props.$status === "pending"
//       ? "orange"
//       : props.$status === "accepted"
//       ? "blue"
//       : props.$status === "canceled"
//       ? "red"
//       : "gray"};
//   color: white;
//   padding: 5px 10px;
//   border-radius: 5px;
//   text-transform: capitalize;
// `;

// const Title = styled.h2`
//   font-size: 1.5rem;
//   margin-bottom: 16px;
// `;

// const ServicesContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 16px;
// `;

// // ===================== COMPONENT =====================
// const CustomerDashboard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [activeSection, setActiveSection] = useState("services");
//   const [selectedBooking, setSelectedBooking] = useState(null);

//   const { bookings = [], error: bookingError } = useSelector(
//     (state) => state.bookings
//   );
//   const { services = [], error: serviceError } = useSelector(
//     (state) => state.services
//   );
//   const { user } = useSelector((state) => state.user);

//   useEffect(() => {
//     dispatch(fetchCustomerBookingsThunk());
//     dispatch(fetchServices());
//   }, [dispatch]);

//   const handleBooking = (serviceId, price) => {
//     const selectedDate = new Date().toISOString().split("T")[0];
//     dispatch(bookServiceThunk({ serviceId, date: selectedDate, amount: price }))
//       .unwrap()
//       .then(() => {
//         toast.success("Service booked successfully!");
//         dispatch(fetchCustomerBookingsThunk());
//       })
//       .catch((err) => {
//         console.error("Booking Failed:", err.message || err);
//         toast.error(`Booking failed: ${err?.message || "Unknown error"}`);
//       });
//   };

//   return (
//     <Container>
//       <Sidebar>
//         <h3 style={{ marginBottom: "20px" }}>Menu</h3>
//         <SidebarButton
//           onClick={() => setActiveSection("services")}
//           $active={activeSection === "services"}
//         >
//           Services
//         </SidebarButton>
//         <SidebarButton
//           onClick={() => setActiveSection("bookings")}
//           $active={activeSection === "bookings"}
//         >
//           Bookings
//         </SidebarButton>
//         <SidebarButton
//           onClick={() => setActiveSection("reviews")}
//           $active={activeSection === "reviews"}
//         >
//           Reviews
//         </SidebarButton>
//         <SidebarButton
//           onClick={() => setActiveSection("payments")}
//           $active={activeSection === "payments"}
//         >
//           Payments
//         </SidebarButton>
//         <SidebarButton
//           onClick={() => setActiveSection("invoices")}
//           $active={activeSection === "invoices"}
//         >
//           Invoices
//         </SidebarButton>

//         <SidebarButton onClick={() => navigate("/")} $active={false}>
//           🏠 Home
//         </SidebarButton>
//         <SidebarButton
//           onClick={() => {
//             dispatch(logout());
//             navigate("/login");
//           }}
//           $active={false}
//         >
//           🚪 Logout
//         </SidebarButton>
//       </Sidebar>

//       <MainContent>
//         <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
//           Hi, {user?.name || "Customer"} 👋 Welcome!
//         </h1>

//         {/* ===================== SERVICES ===================== */}
//         {activeSection === "services" && (
//           <>
//             <Title>Available Services</Title>
//             {serviceError && <p style={{ color: "red" }}>{serviceError}</p>}
//             <ServicesContainer>
//               {services.map((service) => (
//                 <ServiceCard key={service._id}>
//                   <ServiceImage
//                     src={`${IMAGE_BASE_URL}/uploads/${service.image}`}
//                     alt={service.name}
//                     onError={(e) => (e.target.src = "/fallback.jpg")}
//                   />
//                   <p>
//                     <strong>{service.name}</strong> - ${service.price}
//                   </p>
//                   <Button
//                     onClick={() => handleBooking(service._id, service.price)}
//                   >
//                     Book Now
//                   </Button>
//                 </ServiceCard>
//               ))}
//             </ServicesContainer>
//           </>
//         )}

//         {/* ===================== BOOKINGS ===================== */}
//         {activeSection === "bookings" && (
//           <>
//             <Title>Your Bookings</Title>
//             {bookingError && <p style={{ color: "red" }}>{bookingError}</p>}
//             {bookings.length === 0 ? (
//               <p>No bookings found.</p>
//             ) : (
//               bookings.map((booking) => (
//                 <BookingCard key={booking._id}>
//                   {booking.service?.image && (
//                     <ServiceImage
//                       src={`${IMAGE_BASE_URL}/uploads/${booking.service.image}`}
//                       alt={booking.service?.name}
//                       onError={(e) => (e.target.src = "/fallback.jpg")}
//                     />
//                   )}
//                   <p>
//                     <strong>
//                       {booking.service?.name || "Service Not Found"}
//                     </strong>
//                   </p>
//                   <StatusBadge $status={booking.status}>
//                     Status: {booking.status}
//                   </StatusBadge>
//                   <p>Price: ${booking.service?.price || 0}</p>

//                   {booking.paymentStatus === "completed" ? (
//                     <p style={{ color: "green", fontWeight: "bold" }}>
//                       ✅ Payment Successful
//                     </p>
//                   ) : (
//                     <PaymentButton
//                       bookingId={booking._id}
//                       amount={booking.amount || booking.service?.price}
//                     />
//                   )}

//                   {booking.status === "completed" &&
//                     booking.paymentStatus === "completed" && (
//                       <Button
//                         onClick={() => {
//                           setSelectedBooking(booking);
//                           setActiveSection("reviews");
//                         }}
//                       >
//                         Write a Review
//                       </Button>
//                     )}
//                   <AutoReviewPrompt />
//                 </BookingCard>
//               ))
//             )}
//           </>
//         )}

//         {/* ===================== REVIEWS ===================== */}
//         {activeSection === "reviews" && (
//           <>
//             <Title>Write a Review</Title>
//             {selectedBooking ? (
//               <ReviewForm
//                 bookingId={selectedBooking?._id || selectedBooking?.bookingId}
//                 onClose={() => setSelectedBooking(null)}
//               />
//             ) : (
//               <>
//                 <p>Click a completed booking to write a review.</p>
//                 <Button
//                   onClick={() => {
//                     localStorage.removeItem("reviewedBookings");
//                     toast.info("Review history reset. Reload to test again.");
//                   }}
//                   style={{ marginTop: "10px", backgroundColor: "#dc3545" }}
//                 >
//                   Reset Reviewed Bookings
//                 </Button>
//               </>
//             )}
//           </>
//         )}

//         {/* ===================== PAYMENTS ===================== */}
//         {activeSection === "payments" && (
//           <>
//             <Title>Payment History</Title>
//             <PaymentHistory />
//           </>
//         )}

//         {/* ===================== INVOICES ===================== */}
//         {activeSection === "invoices" && (
//           <>
//             <Title>Invoices</Title>
//             <InvoiceList />
//           </>
//         )}
//       </MainContent>
//     </Container>
//   );
// };

// export default CustomerDashboard;
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import styled from "styled-components";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// import {
//   fetchCustomerBookingsThunk,
//   bookServiceThunk,
// } from "../redux/Slices/bookingSlice";
// import { fetchServices } from "../redux/Slices/ServiceSlice";
// import { logout } from "../redux/Slices/UserSlice";

// import PaymentButton from "../components/paymentButton";
// import ReviewForm from "../components/ReviewForm";
// import AutoReviewPrompt from "../components/AutoReviewPrompt";
// import InvoiceList from "../components/InvoiceList";
// import PaymentHistory from "../components/paymentHistory";

// // ===================== STYLED COMPONENTS =====================
// const Container = styled.div`display: flex; height: 100%;`;
// const Sidebar = styled.div`width: 220px; background-color: #f2f2f2; padding: 20px; height: 100vh;`;
// const MainContent = styled.div`flex: 1; padding: 24px; background-color: #fff;`;
// const SidebarButton = styled.button`
//   display: block; width: 100%; padding: 12px; margin-bottom: 10px;
//   background-color: ${(props) => (props.$active ? "#007bff" : "#ddd")};
//   color: ${(props) => (props.$active ? "#fff" : "#000")};
//   border: none; border-radius: 5px; cursor: pointer;
// `;
// const ServiceCard = styled.div`width: 300px; padding: 16px; background: rgba(177,196,203,0.6); border-radius: 8px; text-align: center; box-shadow: 0 4px 6px rgba(102,48,48,0.1);`;
// const ServiceImage = styled.img`width: 200px; height: 150px; border-radius: 8px; object-fit: cover; margin-bottom: 10px;`;
// const Button = styled.button`background-color: #007bff; color: white; padding: 8px 12px; border: none; border-radius: 5px; cursor: pointer; margin-top: 10px;`;
// const BookingCard = styled.div`padding: 16px; background: #f9f9f9; border-radius: 8px; margin-bottom: 10px;`;
// const StatusBadge = styled.span`
//   background-color: ${(props) =>
//     props.$status === "completed" ? "green" :
//     props.$status === "pending" ? "orange" :
//     props.$status === "accepted" ? "blue" :
//     props.$status === "canceled" ? "red" : "gray"};
//   color: white; padding: 5px 10px; border-radius: 5px; text-transform: capitalize;
// `;
// const Title = styled.h2`font-size: 1.5rem; margin-bottom: 16px;`;
// const ServicesContainer = styled.div`display: flex; flex-wrap: wrap; gap: 16px;`;

// const CustomerDashboard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [activeSection, setActiveSection] = useState("services");
//   const [selectedBooking, setSelectedBooking] = useState(null);

//   const { bookings = [], error: bookingError } = useSelector((state) => state.bookings);
//   const { services = [], error: serviceError } = useSelector((state) => state.services);
//   const { user } = useSelector((state) => state.user);

//   // Replace this with your Render backend URL
//   const IMAGE_BASE_URL = "https://your-backend.onrender.com";

//   useEffect(() => {
//     dispatch(fetchCustomerBookingsThunk());
//     dispatch(fetchServices());
//   }, [dispatch]);

//   const handleBooking = (serviceId, price) => {
//     const selectedDate = new Date().toISOString().split("T")[0];
//     dispatch(bookServiceThunk({ serviceId, date: selectedDate, amount: price }))
//       .unwrap()
//       .then(() => {
//         toast.success("Service booked successfully!");
//         dispatch(fetchCustomerBookingsThunk());
//       })
//       .catch((err) => {
//         console.error("Booking Failed:", err.message || err);
//         toast.error(`Booking failed: ${err?.message || "Unknown error"}`);
//       });
//   };

//   return (
//     <Container>
//       <Sidebar>
//         <h3 style={{ marginBottom: "20px" }}>Menu</h3>
//         {["services","bookings","reviews","payments","invoices"].map(section => (
//           <SidebarButton
//             key={section}
//             onClick={() => setActiveSection(section)}
//             $active={activeSection===section}
//           >
//             {section.charAt(0).toUpperCase()+section.slice(1)}
//           </SidebarButton>
//         ))}
//         <SidebarButton onClick={() => navigate("/")} $active={false}>🏠 Home</SidebarButton>
//         <SidebarButton onClick={() => {dispatch(logout()); navigate("/login");}} $active={false}>🚪 Logout</SidebarButton>
//       </Sidebar>

//       <MainContent>
//         <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Hi, {user?.name || "Customer"} 👋 Welcome!</h1>

//         {activeSection === "services" && (
//           <>
//             <Title>Available Services</Title>
//             {serviceError && <p style={{color:"red"}}>{serviceError}</p>}
//             <ServicesContainer>
//               {services.map(service => (
//                 <ServiceCard key={service._id}>
//                   <ServiceImage
//                     src={`${IMAGE_BASE_URL}/uploads/${service.image}`}
//                     alt={service.name}
//                     onError={e => e.target.src="/fallback.jpg"}
//                   />
//                   <p><strong>{service.name}</strong> - ${service.price}</p>
//                   <Button onClick={() => handleBooking(service._id, service.price)}>Book Now</Button>
//                 </ServiceCard>
//               ))}
//             </ServicesContainer>
//           </>
//         )}

//         {activeSection === "bookings" && (
//           <>
//             <Title>Your Bookings</Title>
//             {bookingError && <p style={{color:"red"}}>{bookingError}</p>}
//             {bookings.length===0 ? <p>No bookings found.</p> : bookings.map(booking => (
//               <BookingCard key={booking._id}>
//                 {booking.service?.image && (
//                   <ServiceImage
//                     src={`${IMAGE_BASE_URL}/uploads/${booking.service.image}`}
//                     alt={booking.service?.name}
//                     onError={e => e.target.src="/fallback.jpg"}
//                   />
//                 )}
//                 <p><strong>{booking.service?.name || "Service Not Found"}</strong></p>
//                 <StatusBadge $status={booking.status}>Status: {booking.status}</StatusBadge>
//                 <p>Price: ${booking.service?.price || 0}</p>

//                 {booking.paymentStatus === "completed" ? (
//                   <p style={{ color: "green", fontWeight: "bold" }}>✅ Payment Successful</p>
//                 ) : (
//                   <PaymentButton bookingId={booking._id} amount={booking.amount || booking.service?.price} />
//                 )}

//                 {booking.status==="completed" && booking.paymentStatus==="completed" && (
//                   <Button onClick={()=>{setSelectedBooking(booking); setActiveSection("reviews");}}>Write a Review</Button>
//                 )}
//                 <AutoReviewPrompt />
//               </BookingCard>
//             ))}
//           </>
//         )}

//         {activeSection==="reviews" && (
//           <>
//             <Title>Write a Review</Title>
//             {selectedBooking ? (
//               <ReviewForm bookingId={selectedBooking._id || selectedBooking.bookingId} onClose={()=>setSelectedBooking(null)} />
//             ) : (
//               <>
//                 <p>Click a completed booking to write a review.</p>
//                 <Button
//                   onClick={() => {localStorage.removeItem("reviewedBookings"); toast.info("Review history reset. Reload to test again.");}}
//                   style={{ marginTop:"10px", backgroundColor:"#dc3545" }}
//                 >
//                   Reset Reviewed Bookings
//                 </Button>
//               </>
//             )}
//           </>
//         )}

//         {activeSection==="payments" && (
//           <>
//             <Title>Payment History</Title>
//             <PaymentHistory />
//           </>
//         )}

//         {activeSection==="invoices" && (
//           <>
//             <Title>Invoices</Title>
//             <InvoiceList />
//           </>
//         )}
//       </MainContent>
//     </Container>
//   );
// };

// export default CustomerDashboard;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  fetchCustomerBookingsThunk,
  bookServiceThunk,
} from "../redux/Slices/bookingSlice";
import { fetchServices } from "../redux/Slices/ServiceSlice";
import { logout } from "../redux/Slices/UserSlice";

import PaymentButton from "../components/paymentButton";
import ReviewForm from "../components/ReviewForm";
import AutoReviewPrompt from "../components/AutoReviewPrompt";
import InvoiceList from "../components/InvoiceList";
import PaymentHistory from "../components/paymentHistory";

// ===================== STYLED COMPONENTS =====================
const Container = styled.div`
  display: flex;
  height: 100%;
`;

const Sidebar = styled.div`
  width: 220px;
  background-color: #f2f2f2;
  padding: 20px;
  height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 24px;
  background-color: #fff;
`;

const SidebarButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  background-color: ${(props) => (props.$active ? "#007bff" : "#ddd")};
  color: ${(props) => (props.$active ? "#fff" : "#000")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ServiceCard = styled.div`
  width: 300px;
  padding: 16px;
  background: rgba(177, 196, 203, 0.6);
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(102, 48, 48, 0.1);
`;

const ServiceImage = styled.img`
  width: 200px;
  height: 150px;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const BookingCard = styled.div`
  padding: 16px;
  background: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const StatusBadge = styled.span`
  background-color: ${(props) =>
    props.$status === "completed"
      ? "green"
      : props.$status === "pending"
      ? "orange"
      : props.$status === "accepted"
      ? "blue"
      : props.$status === "canceled"
      ? "red"
      : "gray"};
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  text-transform: capitalize;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 16px;
`;

const ServicesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

// ===================== COMPONENT =====================
const CustomerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("services");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const { bookings = [], error: bookingError } = useSelector(
    (state) => state.bookings
  );
  const { services = [], error: serviceError } = useSelector(
    (state) => state.services
  );
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchCustomerBookingsThunk());
    dispatch(fetchServices());
  }, [dispatch]);

  const handleBooking = (serviceId, price) => {
    const selectedDate = new Date().toISOString().split("T")[0];
    dispatch(bookServiceThunk({ serviceId, date: selectedDate, amount: price }))
      .unwrap()
      .then(() => {
        toast.success("Service booked successfully!");
        dispatch(fetchCustomerBookingsThunk());
      })
      .catch((err) => {
        console.error("Booking Failed:", err.message || err);
        toast.error(`Booking failed: ${err?.message || "Unknown error"}`);
      });
  };

  return (
    <Container>
      <Sidebar>
        <h3 style={{ marginBottom: "20px" }}>Menu</h3>
        <SidebarButton
          onClick={() => setActiveSection("services")}
          $active={activeSection === "services"}
        >
          Services
        </SidebarButton>
        <SidebarButton
          onClick={() => setActiveSection("bookings")}
          $active={activeSection === "bookings"}
        >
          Bookings
        </SidebarButton>
        <SidebarButton
          onClick={() => setActiveSection("reviews")}
          $active={activeSection === "reviews"}
        >
          Reviews
        </SidebarButton>
        <SidebarButton
          onClick={() => setActiveSection("payments")}
          $active={activeSection === "payments"}
        >
          Payments
        </SidebarButton>
        <SidebarButton
          onClick={() => setActiveSection("invoices")}
          $active={activeSection === "invoices"}
        >
          Invoices
        </SidebarButton>

        <SidebarButton onClick={() => navigate("/")} $active={false}>
          🏠 Home
        </SidebarButton>
        <SidebarButton
          onClick={() => {
            dispatch(logout());
            navigate("/login");
          }}
          $active={false}
        >
          🚪 Logout
        </SidebarButton>
      </Sidebar>

      <MainContent>
        <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
          Hi, {user?.name || "Customer"} 👋 Welcome!
        </h1>

        {/* ===================== SERVICES ===================== */}
        {activeSection === "services" && (
          <>
            <Title>Available Services</Title>
            {serviceError && <p style={{ color: "red" }}>{serviceError}</p>}
            <ServicesContainer>
              {services.map((service) => (
                <ServiceCard key={service._id}>
                  <ServiceImage
                    src={service.image} // ✅ Cloudinary URL directly
                    alt={service.name}
                    onError={(e) => (e.target.src = "/fallback.jpg")}
                  />
                  <p>
                    <strong>{service.name}</strong> - ${service.price}
                  </p>
                  <Button
                    onClick={() => handleBooking(service._id, service.price)}
                  >
                    Book Now
                  </Button>
                </ServiceCard>
              ))}
            </ServicesContainer>
          </>
        )}

        {/* ===================== BOOKINGS ===================== */}
        {activeSection === "bookings" && (
          <>
            <Title>Your Bookings</Title>
            {bookingError && <p style={{ color: "red" }}>{bookingError}</p>}
            {bookings.length === 0 ? (
              <p>No bookings found.</p>
            ) : (
              bookings.map((booking) => (
                <BookingCard key={booking._id}>
                  {booking.service?.image && (
                    <ServiceImage
                      src={booking.service.image} // ✅ Cloudinary URL directly
                      alt={booking.service?.name}
                      onError={(e) => (e.target.src = "/fallback.jpg")}
                    />
                  )}
                  <p>
                    <strong>
                      {booking.service?.name || "Service Not Found"}
                    </strong>
                  </p>
                  <StatusBadge $status={booking.status}>
                    Status: {booking.status}
                  </StatusBadge>
                  <p>Price: ${booking.service?.price || 0}</p>

                  {booking.paymentStatus === "completed" ? (
                    <p style={{ color: "green", fontWeight: "bold" }}>
                      ✅ Payment Successful
                    </p>
                  ) : (
                    <PaymentButton
                      bookingId={booking._id}
                      amount={booking.amount || booking.service?.price}
                    />
                  )}

                  {booking.status === "completed" &&
                    booking.paymentStatus === "completed" && (
                      <Button
                        onClick={() => {
                          setSelectedBooking(booking);
                          setActiveSection("reviews");
                        }}
                      >
                        Write a Review
                      </Button>
                    )}
                  <AutoReviewPrompt />
                </BookingCard>
              ))
            )}
          </>
        )}

        {/* ===================== REVIEWS ===================== */}
        {activeSection === "reviews" && (
          <>
            <Title>Write a Review</Title>
            {selectedBooking ? (
              <ReviewForm
                bookingId={selectedBooking?._id || selectedBooking?.bookingId}
                onClose={() => setSelectedBooking(null)}
              />
            ) : (
              <>
                <p>Click a completed booking to write a review.</p>
                <Button
                  onClick={() => {
                    localStorage.removeItem("reviewedBookings");
                    toast.info("Review history reset. Reload to test again.");
                  }}
                  style={{ marginTop: "10px", backgroundColor: "#dc3545" }}
                >
                  Reset Reviewed Bookings
                </Button>
              </>
            )}
          </>
        )}

        {/* ===================== PAYMENTS ===================== */}
        {activeSection === "payments" && (
          <>
            <Title>Payment History</Title>
            <PaymentHistory />
          </>
        )}

        {/* ===================== INVOICES ===================== */}
        {activeSection === "invoices" && (
          <>
            <Title>Invoices</Title>
            <InvoiceList />
          </>
        )}
      </MainContent>
    </Container>
  );
};

export default CustomerDashboard;
