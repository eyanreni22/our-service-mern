import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/api";

// ✅ Fetch All Services (for customers)
export const fetchServices = createAsyncThunk("services/fetchAll", async (_, thunkAPI) => {
  try {
    console.log("🔄 Fetching services...");
    const response = await axios.get("/services");
    console.log("✅ Services fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching services:", error.response?.data || error.message);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// ✅ Fetch Provider's Own Services
export const fetchProviderServices = createAsyncThunk("services/fetchProviderServices", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("userToken");
    const response = await axios.get("/services/provider", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// ✅ Add a Service (Provider Only)
export const addService = createAsyncThunk(
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
      return rejectWithValue(error.response.data);
    }
  }
);

// ✅ Delete a Service (Provider Only)
export const deleteService = createAsyncThunk("services/delete", async (id, thunkAPI) => {
  try {
    const token = localStorage.getItem("userToken");
    await axios.delete(`/api/services/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// ✅ Book a Service (Customer)
export const bookService = createAsyncThunk("services/bookService", async (serviceId, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/api/bookings", { serviceId });
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Service Slice
const serviceSlice = createSlice({
  name: "services",
  initialState: { 
    services: [], 
    providerServices: [],  // ✅ Separate state for provider's own services
    loading: false, 
    error: null 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch all services (customers)
      .addCase(fetchServices.pending, (state) => { state.loading = true; })
      .addCase(fetchServices.fulfilled, (state, action) => { 
        state.loading = false; 
        state.services = action.payload; 
      })
      .addCase(fetchServices.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload; 
      })

      // ✅ Fetch provider's own services
      .addCase(fetchProviderServices.pending, (state) => { state.loading = true; })
      .addCase(fetchProviderServices.fulfilled, (state, action) => { 
        state.loading = false; 
        state.providerServices = action.payload;  // ✅ Update provider's own services
      })
      .addCase(fetchProviderServices.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload; 
      })

      // ✅ Add a new service
      .addCase(addService.fulfilled, (state, action) => { 
        state.services.push(action.payload); 
        state.providerServices.push(action.payload);  // ✅ Also update provider's own services
      })

      // ✅ Delete a service
      .addCase(deleteService.fulfilled, (state, action) => {
        state.services = state.services.filter((service) => service._id !== action.payload);
        state.providerServices = state.providerServices.filter((service) => service._id !== action.payload);
      })

      // ✅ Book a service (for customers)
      .addCase(bookService.fulfilled, (state, action) => {
        state.services = state.services.map(service => 
          service._id === action.payload.serviceId ? { ...service, booked: true } : service
        );
      });
  },
});

// ✅ Export everything
export default serviceSlice.reducer;
