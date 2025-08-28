import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/api";

// ✅ Submit a review
export const submitReview = createAsyncThunk(
  "reviews/submitReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      };
      const { data } = await axios.post("/reviews", reviewData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to submit review");
    }
  }
);

// ✅ Fetch booking review (by booking ID)
export const fetchBookingReview = createAsyncThunk(
  "reviews/fetchBookingReview",
  async (bookingId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/reviews/booking/${bookingId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch booking review");
    }
  }
);

// ✅ Fetch all reviews for a provider
export const fetchProviderReviews = createAsyncThunk(
  "reviews/fetchProviderReviews",
  async (providerId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/reviews/provider/${providerId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch provider reviews");
    }
  }
);

// ✅ Fetch all reviews for a service
export const fetchServiceReviews = createAsyncThunk(
  "reviews/fetchServiceReviews",
  async (serviceId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/reviews/service/${serviceId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch service reviews");
    }
  }
);

// ✅ Delete a review
export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (reviewId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      await axios.delete(`/reviews/${reviewId}`, config);
      return reviewId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete review");
    }
  }
);

// ✅ Get provider rating
export const fetchProviderRating = createAsyncThunk(
  "reviews/fetchProviderRating",
  async (providerId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/reviews/provider/${providerId}/rating`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch provider rating");
    }
  }
);
const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    providerReviews: [],
    serviceReviews: [],
    bookingReview: null,
    providerRating: null,
    loading: false,
    error: null,
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ✅ Submit review
      .addCase(submitReview.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.serviceReviews.push(action.payload.review); // or update based on your context
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      })

      // ✅ Fetch booking review
      .addCase(fetchBookingReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookingReview.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingReview = action.payload;
      })
      .addCase(fetchBookingReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch provider reviews
      .addCase(fetchProviderReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProviderReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.providerReviews = action.payload;
      })
      .addCase(fetchProviderReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch service reviews
      .addCase(fetchServiceReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServiceReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.serviceReviews = action.payload;
      })
      .addCase(fetchServiceReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Delete review
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.serviceReviews = state.serviceReviews.filter(
          (review) => review._id !== action.payload
        );
        state.providerReviews = state.providerReviews.filter(
          (review) => review._id !== action.payload
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch provider rating
      .addCase(fetchProviderRating.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProviderRating.fulfilled, (state, action) => {
        state.loading = false;
        state.providerRating = action.payload.averageRating;
      })
      .addCase(fetchProviderRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;