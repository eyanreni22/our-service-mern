// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   adminLogin,
//   adminRegister,
//   fetchUsers,
//   toggleUserStatus,
//   deleteUser,
//   updateBookingStatus,
//   fetchBookings ,
//   fetchInvoices,
//   fetchServices,
//   deleteService,
// } from "../../utils/adminApi";

// // ========== Auth Thunks ==========

// // Login Admin
// export const loginAdmin = createAsyncThunk("admin/login", async (credentials, thunkAPI) => {
//   try {
//     const response = await adminLogin(credentials);
//     localStorage.setItem("adminToken", response.data.token);
//     localStorage.setItem("admin", JSON.stringify(response.data));
//     return response.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(
//       error.response?.data?.message || error.message || "Login failed"
//     );
//   }
// });

// // Register Admin
// export const registerAdmin = createAsyncThunk("admin/register", async (data, thunkAPI) => {
//   try {
//     const response = await adminRegister(data);
//     localStorage.setItem("adminToken", response.data.token);
//     localStorage.setItem("admin", JSON.stringify(response.data));
//     return response.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(
//       error.response?.data?.message || error.message || "Registration failed"
//     );
//   }
// });

// // ========== User Thunks ==========

// // Fetch Users
// export const fetchAllUsers = createAsyncThunk("admin/fetchUsers", async (_, thunkAPI) => {
//   try {
//     const response = await fetchUsers();
//     return response.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(
//       error.response?.data?.message || error.message || "Error fetching users"
//     );
//   }
// });

// // Toggle User Status
// export const toggleUserStatusAction = createAsyncThunk("admin/toggleUserStatus", async (id, thunkAPI) => {
//   try {
//     await toggleUserStatus(id);
//     thunkAPI.dispatch(fetchAllUsers());
//   } catch (error) {
//     return thunkAPI.rejectWithValue(
//       error.response?.data?.message || error.message || "Error toggling user status"
//     );
//   }
// });

// // Delete User
// export const deleteUserAction = createAsyncThunk("admin/deleteUser", async (id, thunkAPI) => {
//   try {
//     await deleteUser(id);
//     thunkAPI.dispatch(fetchAllUsers());
//   } catch (error) {
//     return thunkAPI.rejectWithValue(
//       error.response?.data?.message || error.message || "Error deleting user"
//     );
//   }
// });

// // ========== Booking Thunks ==========


// // Fetch Bookings
// export const fetchAllBookings = createAsyncThunk("admin/fetchBookings", async (_, thunkAPI) => {
//   try {
//     const response = await fetchBookings();
//     console.log("Fetched bookings response:", response.data); // Debug
//     return response.data.bookings; // ✅ Only return the array
//   } catch (error) {
//     return thunkAPI.rejectWithValue(
//       error.response?.data?.message || error.message || "Error fetching bookings"
//     );
//   }
// });



// // Update Booking Status
// export const updateBookingStatusAction = createAsyncThunk("admin/updateBookingStatus", async ({ id, status }, thunkAPI) => {
//   try {
//     await updateBookingStatus(id, status);
//     thunkAPI.dispatch(fetchAllBookings());
//   } catch (error) {
//     return thunkAPI.rejectWithValue(
//       error.response?.data?.message || error.message || "Error updating booking status"
//     );
//   }
// });

// // ========== Invoice Thunks ==========

// export const fetchAllInvoices = createAsyncThunk("admin/fetchInvoices", async (_, thunkAPI) => {
//   try {
//     const response = await fetchInvoices();
//     return response.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(
//       error.response?.data?.message || error.message || "Error fetching invoices"
//     );
//   }
// });

// // ========== Service Thunks ==========

// // Fetch Services
// export const fetchAllServices = createAsyncThunk("admin/fetchServices", async (_, thunkAPI) => {
//   try {
//     const response = await fetchServices();
//     return response.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(
//       error.response?.data?.message || error.message || "Error fetching services"
//     );
//   }
// });

// // Delete Service
// export const deleteServiceAction = createAsyncThunk("admin/deleteService", async (id, thunkAPI) => {
//   try {
//     await deleteService(id);
//     thunkAPI.dispatch(fetchAllServices());
//   } catch (error) {
//     return thunkAPI.rejectWithValue(
//       error.response?.data?.message || error.message || "Error deleting service"
//     );
//   }
// });

// // ========== Slice ==========

// const adminSlice = createSlice({
//   name: "admin",
//   initialState: {
//     admin: JSON.parse(localStorage.getItem("admin")) || null, // Single instance of `admin`
//     users: [],
//     bookings: [],
//     invoices: [],
//     services: [],
//     isLoading: false,
//     error: null,
//   },
//   reducers: {
//     logoutAdmin: (state) => {
//       state.admin = null;
//       localStorage.removeItem("adminToken");
//       localStorage.removeItem("admin");
//     },
//     clearAdminError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Login
//       .addCase(loginAdmin.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(loginAdmin.fulfilled, (state, action) => {
//         state.admin = action.payload;
//         state.isLoading = false;
//       })
//       .addCase(loginAdmin.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })

//       // Register
//       .addCase(registerAdmin.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(registerAdmin.fulfilled, (state, action) => {
//         state.admin = action.payload;
//         state.isLoading = false;
//       })
//       .addCase(registerAdmin.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })

//       // Users
//       .addCase(fetchAllUsers.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllUsers.fulfilled, (state, action) => {
//         state.users = action.payload;
//         state.isLoading = false;
//       })
//       .addCase(fetchAllUsers.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })
//       .addCase(toggleUserStatusAction.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(toggleUserStatusAction.fulfilled, (state) => {
//         state.isLoading = false;
//       })
//       .addCase(toggleUserStatusAction.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })
//       .addCase(deleteUserAction.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(deleteUserAction.fulfilled, (state) => {
//         state.isLoading = false;
//       })
//       .addCase(deleteUserAction.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })

//       // Bookings
//       .addCase(fetchAllBookings.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllBookings.fulfilled, (state, action) => {
//         state.bookings = action.payload;
//         state.isLoading = false;
//       })
//       .addCase(fetchAllBookings.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })
//       .addCase(updateBookingStatusAction.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(updateBookingStatusAction.fulfilled, (state) => {
//         state.isLoading = false;
//       })
//       .addCase(updateBookingStatusAction.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })

//       // Invoices
//       .addCase(fetchAllInvoices.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllInvoices.fulfilled, (state, action) => {
//         state.invoices = action.payload;
//         state.isLoading = false;
//       })
//       .addCase(fetchAllInvoices.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })

//       // Services
//       .addCase(fetchAllServices.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllServices.fulfilled, (state, action) => {
//         state.services = action.payload;
//         state.isLoading = false;
//       })
//       .addCase(fetchAllServices.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })
//       .addCase(deleteServiceAction.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(deleteServiceAction.fulfilled, (state) => {
//         state.isLoading = false;
//       })
//       .addCase(deleteServiceAction.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logoutAdmin, clearAdminError } = adminSlice.actions;
// export default adminSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  adminLogin,
  adminRegister,
  fetchUsers,
  toggleUserStatus,
  deleteUser,
  updateBookingStatus,
  fetchBookings,
  fetchInvoices,
  fetchServices,
  deleteService,
} from "../../utils/adminApi";

// 🔹 helper to normalize errors
const normalizeError = (err) => {
  if (!err) return null;
  if (typeof err === "string") return err;
  if (err.message) return err.message;
  return JSON.stringify(err);
};

// ========== Auth Thunks ==========

// Login Admin
export const loginAdmin = createAsyncThunk(
  "admin/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await adminLogin(credentials);
      localStorage.setItem("adminToken", response.data.token);
      localStorage.setItem("admin", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  }
);

// Register Admin
export const registerAdmin = createAsyncThunk(
  "admin/register",
  async (data, thunkAPI) => {
    try {
      const response = await adminRegister(data);
      localStorage.setItem("adminToken", response.data.token);
      localStorage.setItem("admin", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Registration failed"
      );
    }
  }
);

// ========== User Thunks ==========
export const fetchAllUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await fetchUsers();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Error fetching users"
      );
    }
  }
);

export const toggleUserStatusAction = createAsyncThunk(
  "admin/toggleUserStatus",
  async (id, thunkAPI) => {
    try {
      await toggleUserStatus(id);
      thunkAPI.dispatch(fetchAllUsers());
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Error toggling user status"
      );
    }
  }
);

export const deleteUserAction = createAsyncThunk(
  "admin/deleteUser",
  async (id, thunkAPI) => {
    try {
      await deleteUser(id);
      thunkAPI.dispatch(fetchAllUsers());
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Error deleting user"
      );
    }
  }
);

// ========== Booking Thunks ==========
export const fetchAllBookings = createAsyncThunk(
  "admin/fetchBookings",
  async (_, thunkAPI) => {
    try {
      const response = await fetchBookings();
      return response.data.bookings;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Error fetching bookings"
      );
    }
  }
);

export const updateBookingStatusAction = createAsyncThunk(
  "admin/updateBookingStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      await updateBookingStatus(id, status);
      thunkAPI.dispatch(fetchAllBookings());
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Error updating booking status"
      );
    }
  }
);

// ========== Invoice Thunks ==========
export const fetchAllInvoices = createAsyncThunk(
  "admin/fetchInvoices",
  async (_, thunkAPI) => {
    try {
      const response = await fetchInvoices();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Error fetching invoices"
      );
    }
  }
);

// ========== Service Thunks ==========
export const fetchAllServices = createAsyncThunk(
  "admin/fetchServices",
  async (_, thunkAPI) => {
    try {
      const response = await fetchServices();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Error fetching services"
      );
    }
  }
);

export const deleteServiceAction = createAsyncThunk(
  "admin/deleteService",
  async (id, thunkAPI) => {
    try {
      await deleteService(id);
      thunkAPI.dispatch(fetchAllServices());
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Error deleting service"
      );
    }
  }
);

// ========== Slice ==========
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: JSON.parse(localStorage.getItem("admin")) || null,
    users: [],
    bookings: [],
    invoices: [],
    services: [],
    isLoading: false,
    error: null, // ✅ always a string or null
  },
  reducers: {
    logoutAdmin: (state) => {
      state.admin = null;
      localStorage.removeItem("adminToken");
      localStorage.removeItem("admin");
    },
    clearAdminError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
 .addCase(loginAdmin.fulfilled, (state, action) => {
  state.isLoading = false;
  state.user = action.payload;   // ✅ store full backend response
  state.token = action.payload.token;
  state.error = null;
})



      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = normalizeError(action.payload);
      })

      // Register
      .addCase(registerAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.admin = action.payload;
        state.isLoading = false;
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = normalizeError(action.payload);
      })

      // Users
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = normalizeError(action.payload);
      })
      .addCase(toggleUserStatusAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(toggleUserStatusAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(toggleUserStatusAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = normalizeError(action.payload);
      })
      .addCase(deleteUserAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUserAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteUserAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = normalizeError(action.payload);
      })

      // Bookings
      .addCase(fetchAllBookings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = normalizeError(action.payload);
      })
      .addCase(updateBookingStatusAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBookingStatusAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateBookingStatusAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = normalizeError(action.payload);
      })

      // Invoices
      .addCase(fetchAllInvoices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllInvoices.fulfilled, (state, action) => {
        state.invoices = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllInvoices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = normalizeError(action.payload);
      })

      // Services
      .addCase(fetchAllServices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllServices.fulfilled, (state, action) => {
        state.services = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = normalizeError(action.payload);
      })
      .addCase(deleteServiceAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteServiceAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteServiceAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = normalizeError(action.payload);
      });
  },
});

export const { logoutAdmin, clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;
