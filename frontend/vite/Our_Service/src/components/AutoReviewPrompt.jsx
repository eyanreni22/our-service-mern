// components/AutoReviewPrompt.jsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReviewForm from "../components/ReviewForm";

const AutoReviewPrompt = () => {
  const bookings = useSelector((state) => state.bookings.bookings);
  const [activeBooking, setActiveBooking] = useState(null);

  useEffect(() => {
    const reviewedIds = JSON.parse(localStorage.getItem("reviewedBookings") || "[]");

    const unreviewedCompleted = bookings.find(
      (b) =>
        b.status === "completed" &&
        !b.hasReview &&
        !reviewedIds.includes(b._id)
    );

    if (unreviewedCompleted) {
      setActiveBooking(unreviewedCompleted);
    }
  }, [bookings]);

  const handleCloseReview = () => {
    const reviewedIds = JSON.parse(localStorage.getItem("reviewedBookings") || "[]");
    localStorage.setItem(
      "reviewedBookings",
      JSON.stringify([...reviewedIds, activeBooking._id])
    );
    setActiveBooking(null);
  };

  return (
    <>
      {activeBooking && (
        <ReviewForm booking={activeBooking} onClose={handleCloseReview} />
      )}
    </>
  );
};

export default AutoReviewPrompt;
