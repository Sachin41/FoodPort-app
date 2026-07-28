import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCart } from "./cartSlice";

/* =====================
   LOGIN THUNK
===================== */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { dispatch }) => {
    // ⛔ Replace with API later
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    // dispatch(fetchCart);

    return userData;
  }
);

/* =====================
   SLICE
===================== */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("loggedInUser")) || null,
    isAuthenticated: !!JSON.parse(localStorage.getItem("loggedInUser"))
  },
  reducers: {
    logoutUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("loggedInUser");
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
  },
});
export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
