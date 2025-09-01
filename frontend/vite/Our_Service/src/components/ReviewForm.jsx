import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { toast } from "react-toastify";
import { submitReview, fetchBookingReview } from "../redux/Slices/reviewSlice";
import { FaStar } from "react-icons/fa";
import PropTypes from "prop-types";

const FormContainer = styled.div` /* ... */ `;
const Field = styled.div` /* ... */ `;
const Label = styled.label` /* ... */ `;
const TextArea = styled.textarea` /* ... */ `;
const Button = styled.button` /* ... */ `;
const CancelButton = styled(Button)` /* ... */ `;
const StarsWrapper = styled.div` /* ... */ `;
const Star = styled(FaStar)` /* ... */ `;

const ReviewForm = ({ bookingId, onClose }) => {
  const dispatch = useDispatch();
  const { bookingReview } = useSelector((state) => state.reviews);

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (bookingId) {
      dispatch(fetchBookingReview(bookingId));
    }
  }, [dispatch, bookingId]);

  useEffect(() => {
    if (bookingReview) {
      setRating(bookingReview.rating);
      setComment(bookingReview.comment);
    }
  }, [bookingReview]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.warn("Please enter a comment.");
      return;
    }

    try {
      await dispatch(submitReview({ bookingId, rating, comment })).unwrap();
      toast.success("Review submitted successfully!");
      localStorage.setItem(
        "reviewedBookings",
        JSON.stringify([
          ...(JSON.parse(localStorage.getItem("reviewedBookings")) || []),
          bookingId,
        ])
      );
      onClose();
    } catch (error) {
      console.error("❌ Review submission failed:", error);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  if (!bookingId) return null;

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Field>
          <Label>Rating</Label>
          <StarsWrapper>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                filled={star <= (hoverRating || rating)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </StarsWrapper>
        </Field>

        <Field>
          <Label htmlFor="comment">Comment</Label>
          <TextArea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your feedback here..."
            required
          />
        </Field>

        <Button type="submit">Submit Review</Button>
        <CancelButton type="button" onClick={onClose}>
          Cancel
        </CancelButton>
      </form>
    </FormContainer>
  );
};

ReviewForm.propTypes = {
  bookingId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ReviewForm;
