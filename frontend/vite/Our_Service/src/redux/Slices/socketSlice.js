import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: { isConnected: false },
  reducers: {
    setSocketConnected: (state, action) => {
      state.isConnected = action.payload;
    },
  },
});

export const { setSocketConnected } = socketSlice.actions; // ✅ Export action
export default socketSlice.reducer;
