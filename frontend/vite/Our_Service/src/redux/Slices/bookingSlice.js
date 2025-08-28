import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createBooking,
  getCustomerBookings,
  getProviderBookings,
  updateBookingStatus,
  updatePaymentStatus,
} from "../../utils/api";
import { toast } from "react-toastify";

// 🔹 Book a Service (Customer)
export const bookServiceThunk = createAsyncThunk(
  "bookings/bookService",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createBooking(data);
      toast.success("Booking created!");
      return res.data.booking;
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
      return rejectWithValue(err.response?.data?.message || "Booking failed");
    }
  }
);

// 🔹 Get Customer Bookings
export const fetchCustomerBookingsThunk = createAsyncThunk(
  "bookings/fetchCustomerBookings",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCustomerBookings();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);

// 🔹 Get Provider/Admin Bookings
export const fetchProviderBookingsThunk = createAsyncThunk(
  "bookings/fetchProviderBookings",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getProviderBookings();
      console.log("📦 API Response for provider bookings:", res.data); // <-- Add this
      return res.data.bookings;
    } catch (err) {
      console.error("❌ Fetch provider bookings error:", err);
      return rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);


// 🔹 Update Booking Status
export const updateBookingStatusThunk = createAsyncThunk(
  "bookings/updateBookingStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await updateBookingStatus(id, status);
      toast.success("Status updated!");
      return res.data.booking;
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

// 🔹 Update Payment Status
export const updatePaymentStatusThunk = createAsyncThunk(
  "bookings/updatePaymentStatus",
  async ({ id, paymentStatus }, { rejectWithValue }) => {
    try {
      const res = await updatePaymentStatus(id, paymentStatus);
      toast.success("Payment status updated!");
      return res.data.booking;
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment update failed");
      return rejectWithValue(err.response?.data?.message || "Payment update failed");
    }
  }
);

// 🧩 Slice
const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearBookings: (state) => {
      state.bookings = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Book a service
      .addCase(bookServiceThunk.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
      })

      // Customer Bookings
      .addCase(fetchCustomerBookingsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerBookingsThunk.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.loading = false;
      })
      .addCase(fetchCustomerBookingsThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Provider/Admin Bookings
      .addCase(fetchProviderBookingsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProviderBookingsThunk.fulfilled, (state, action) => {
        console.log("Provider Bookings Updated in Redux:", action.payload); // Check what data you're setting

        state.bookings = action.payload;
        state.loading = false;
      })
      .addCase(fetchProviderBookingsThunk.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch bookings";
        state.loading = false;
      })

      // Update Booking Status
      .addCase(updateBookingStatusThunk.fulfilled, (state, action) => {
        const index = state.bookings.findIndex(
          (b) => b._id === action.payload._id
        );
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
      })
      .addCase(updateBookingStatusThunk.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update Payment Status
      .addCase(updatePaymentStatusThunk.fulfilled, (state, action) => {
        const index = state.bookings.findIndex(
          (b) => b._id === action.payload._id
        );
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
      })
      .addCase(updatePaymentStatusThunk.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearBookings } = bookingSlice.actions;

export default bookingSlice.reducer;
