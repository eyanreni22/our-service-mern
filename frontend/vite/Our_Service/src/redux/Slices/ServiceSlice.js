import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/api";

// ✅ Fetch All Services (for customers)
export const fetchServices = createAsyncThunk(
  "services/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      console.log("🔄 Fetching services...");
      const response = await axios.get("/services");
      console.log("✅ Services fetched:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching services:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Fetch Provider's Own Services
export const fetchProviderServicesThunk = createAsyncThunk(
  "services/fetchProviderServices",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get("/services/provider", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Add a Service (Provider Only)
export const addServiceThunk = createAsyncThunk(
  "services/addService",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post("/services", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Delete a Service (Provider Only)
export const deleteServiceThunk = createAsyncThunk(
  "services/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.delete(`/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Book a Service (Customer)
export const bookService = createAsyncThunk(
  "services/bookService",
  async (serviceId, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/bookings", { serviceId });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Service Slice
const serviceSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
    providerServices: [], // ✅ Separate state for provider's own services
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch all services (customers)
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch provider's own services
      .addCase(fetchProviderServicesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProviderServicesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.providerServices = action.payload;
      })
      .addCase(fetchProviderServicesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Add a new service
      .addCase(addServiceThunk.fulfilled, (state, action) => {
        state.services.push(action.payload);
        state.providerServices.push(action.payload);
      })

      // ✅ Delete a service
      .addCase(deleteServiceThunk.fulfilled, (state, action) => {
        state.services = state.services.filter(
          (service) => service._id !== action.payload
        );
        state.providerServices = state.providerServices.filter(
          (service) => service._id !== action.payload
        );
      })

      // ✅ Book a service (for customers)
      .addCase(bookService.fulfilled, (state, action) => {
        state.services = state.services.map((service) =>
          service._id === action.payload.serviceId
            ? { ...service, booked: true }
            : service
        );
      });
  },
});

// ✅ Export reducer
export default serviceSlice.reducer;
