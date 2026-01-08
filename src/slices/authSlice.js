import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCartFromStorage, clearCart } from "./cartSlice";

/* =====================
   LOGIN THUNK
===================== */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { dispatch }) => {
    // ⛔ Replace with API later
    localStorage.setItem("isAuth", "true");
    localStorage.setItem("loggedInUser", JSON.stringify(userData));

    // 🔥 Load user cart
    const cartKey = `cart_${userData.email}`;
    const storedCart = JSON.parse(localStorage.getItem(cartKey)) || {};
    dispatch(setCartFromStorage(storedCart));

    return userData;
  }
);

/* =====================
   LOGOUT THUNK
===================== */
// export const logoutUser = createAsyncThunk(
//   "auth/logoutUser",
//   async (_, { dispatch }) => {
//     localStorage.removeItem("loggedInUser");
//     localStorage.removeItem("isAuth");

//     dispatch(clearCart());
//     return null;
//   }
// );

/* =====================
   SLICE
===================== */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("loggedInUser")) || null,
    isAuthenticated: !!JSON.parse(localStorage.getItem("isAuth"))
  },
  reducers: {
    logoutUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("isAuth");
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
