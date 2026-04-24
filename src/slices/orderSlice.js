import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: []
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },

    addOrder: (state, action) => {
      state.orders.unshift(action.payload); // latest first
    },

    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find(o => o.orderId === orderId);
      if (order) {
        order.status = status;
      }
    }
  }
});

export const { setOrders, addOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;