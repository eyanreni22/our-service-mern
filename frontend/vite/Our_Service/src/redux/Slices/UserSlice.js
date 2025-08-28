// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../utils/api";
// import { getUserFromStorage, getToken, removeToken } from "../../utils/auth";

// const API_URL = "http://localhost:5000/api/users";

// // ✅ Register User
// export const registerUser = createAsyncThunk(
//   "user/register",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const { data } = await api.post(`${API_URL}/register`, userData);
//       console.log("✅ Register API Response:", data);

//       // ✅ Store Token & User in LocalStorage
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       return { user: data.user, token: data.token };
//     } catch (error) {
//       console.error("🚨 Register API Error:", error.response?.data);
//       return rejectWithValue(error.response?.data?.message || "Something went wrong");
//     }
//   }
// );

// // ✅ Login User
// export const loginUser = createAsyncThunk(
//   "user/login",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const { data } = await api.post(`${API_URL}/login`, userData);

//       console.log("🔑 Token received from backend:", data.token); // ✅ Debugging

//       if (!data.user || !data.token) {
//         console.error("❌ API returned incomplete data:", data);
//         return rejectWithValue("Invalid login response");
//       }

//       // ✅ Store Token in localStorage
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       return { user: data.user, token: data.token };
//     } catch (error) {
//       console.error("🚨 Login API Error:", error.response?.data);
//       return rejectWithValue(error.response?.data?.message || "Something went wrong");
//     }
//   }
// );

// // ✅ Get User Profile
// export const getUserProfile = createAsyncThunk(
//   "user/profile",
//   async (_, thunkAPI) => {
//     try {
//       const token = getToken();
//       if (!token) throw new Error("No authentication token found");

//       const response = await api.get(`${API_URL}/profile`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch profile");
//     }
//   }
// );

// // ✅ Logout User
// export const logout = createAsyncThunk("user/logout", async () => {
//   removeToken();
//   localStorage.removeItem("user");
//   return null;
// });

// // ✅ Initial State
// const initialState = {
//   user: getUserFromStorage(),
//   token: getToken(),
//   loading: false,
//   error: null,
// };

// // ✅ User Slice
// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(getUserProfile.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getUserProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(getUserProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(logout.fulfilled, (state) => {
//         state.user = null;
//         state.token = null;
//       });
//   },
// });

// export default userSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { getUserFromStorage, getToken, removeToken } from "../../utils/auth";

const API_URL = "/users";

// Register User
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`${API_URL}/register`, userData);
      console.log("✅ Register API Response:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return { user: data.user, token: data.token };
    } catch (error) {
      console.error("🚨 Register API Error:", error.response?.data);
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`${API_URL}/login`, userData);
      console.log("🔑 Token received:", data.token);

      if (!data.user || !data.token) {
        return rejectWithValue("Invalid login response");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return { user: data.user, token: data.token };
    } catch (error) {
      console.error("🚨 Login API Error:", error.response?.data);
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

// // ✅ Register User
// export const registerUser = createAsyncThunk(
//   "user/register",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const { data } = await api.post("/users/register", userData);
//       console.log("✅ Register API Response:", data);

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       return { user: data.user, token: data.token };
//     } catch (error) {
//       console.error("🚨 Register API Error:", error.response?.data);
//       return rejectWithValue(error.response?.data?.message || "Something went wrong");
//     }
//   }
// );

// // ✅ Login User
// export const loginUser = createAsyncThunk(
//   "user/login",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const { data } = await api.post("/users/login", userData); // ✅ fixed
//       console.log("🔑 Token received:", data.token);
//       if (!data.user || !data.token) {
//         console.error("❌ API returned incomplete data:", data);
//         return rejectWithValue("Invalid login response");
//       }

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       return { user: data.user, token: data.token };
//     } catch (error) {
//       console.error("🚨 Login API Error:", error.response?.data);
//       return rejectWithValue(error.response?.data?.message || "Something went wrong");
//     }
//   }
// );


// ✅ Get User Profile
export const getUserProfile = createAsyncThunk(
  "user/profile",
  async (_, thunkAPI) => {
    try {
      const token = getToken();
      if (!token) throw new Error("No authentication token found");

      const response = await api.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch profile");
    }
  }
);

// ✅ Logout User
export const logout = createAsyncThunk("user/logout", async () => {
  removeToken();
  localStorage.removeItem("user");
  return null;
});

// ✅ Initial State
const initialState = {
  user: getUserFromStorage() || null,
  token: getToken() || null,
  loading: false,
  error: null,
};

// ✅ User Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export default userSlice.reducer;
