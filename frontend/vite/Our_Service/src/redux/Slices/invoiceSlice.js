import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/api";
const API_URL = "http://localhost:5000/api/invoices";

// Fetch customer invoices
export const fetchCustomerInvoices = createAsyncThunk(
  "invoices/fetchCustomerInvoices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/customer`); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch invoices");
    }
  }
);

// Fetch provider invoices
export const fetchProviderInvoices = createAsyncThunk(
  "invoices/fetchProviderInvoices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/provider`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch invoices");
    }
  }
);

// Fetch all invoices (Admin)
export const fetchAllInvoices = createAsyncThunk(
  "invoices/fetchAllInvoices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/admin`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch invoices");
    }
  }
);

const invoiceSlice = createSlice({
  name: "invoices",
  initialState: {
    invoices: [],
    loading: false,
    error: null,
  },
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload;
      })
      .addCase(fetchCustomerInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchProviderInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProviderInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload;
      })
      .addCase(fetchProviderInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchAllInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload;
      })
      .addCase(fetchAllInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default invoiceSlice.reducer;
