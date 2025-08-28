// src/redux/Slices/paymentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/api";

const API_URL = "http://localhost:5000/api/payments";

// ✅ Create Payment Intent (Stripe)
export const createPaymentIntent = createAsyncThunk(
  "payment/createPaymentIntent",
  async (amount, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/create-payment-intent`, { amount });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create payment intent.");
    }
  }
);

// ✅ Process Payment (Redirect to Stripe Checkout)
export const processPayment = createAsyncThunk(
  "payment/processPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/pay`, paymentData);
      return data; // Should contain `url` for Stripe Checkout
    } catch (error) {
      return rejectWithValue(error.response?.data || "Payment processing failed.");
    }
  }
);

// ✅ Confirm Payment (After Stripe Checkout)
export const confirmPayment = createAsyncThunk(
  "payment/confirmPayment",
  async (paymentId, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${API_URL}/confirm/${paymentId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Payment confirmation failed.");
    }
  }
);

// ✅ Get Customer Payments
export const fetchCustomerPayments = createAsyncThunk(
  "payment/fetchCustomerPayments",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/customer`);
      return data.payments;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch customer payments.");
    }
  }
);

// ✅ Get Provider Payments
export const fetchProviderPayments = createAsyncThunk(
  "payment/fetchProviderPayments",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/provider`);
      return data.payments;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch provider payments.");
    }
  }
);

const formatError = (payload) => {
  if (typeof payload === "string") return payload;
  return payload?.message || "Something went wrong.";
};

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    paymentIntent: null,
    paymentStatus: null,
    confirmedPayment: null,
    payments: [],
    error: null,
  },
  reducers: {
    resetPaymentState: (state) => {
      state.loading = false;
      state.paymentIntent = null;
      state.paymentStatus = null;
      state.confirmedPayment = null;
      state.payments = [];
      state.error = null;
    },
    setPaymentSuccess: (state) => {
      state.paymentStatus = "success"; // ✅ fired when socket emits "paymentSuccess"
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Payment Intent
      .addCase(createPaymentIntent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentIntent = action.payload;
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.loading = false;
        state.error = formatError(action.payload);
      })

      // Process Payment
      .addCase(processPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentStatus = action.payload;
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = formatError(action.payload);
      })

      // Confirm Payment
      .addCase(confirmPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.confirmedPayment = action.payload;
      })
      .addCase(confirmPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = formatError(action.payload);
      })

      // Fetch Customer Payments
      .addCase(fetchCustomerPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchCustomerPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = formatError(action.payload);
      })

      // Fetch Provider Payments
      .addCase(fetchProviderPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProviderPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchProviderPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = formatError(action.payload);
      });
  },
});

// ✅ Export both reducers
export const { resetPaymentState, setPaymentSuccess } = paymentSlice.actions;
export default paymentSlice.reducer;
