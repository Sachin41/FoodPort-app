import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: { totalItems: 0, cartItems: {} },
    reducers: {
        addItemsToCart(state, action) {
            const { id } = action.payload;
            state.totalItems += 1;
            if (state.cartItems[id]) {
                state.cartItems[id].quantity += 1
            } else {
                state.cartItems[id] = { item: action.payload, quantity: 1 }
            }
        },
        removeItemsToCart(state, action) {
            const { id } = action.payload;
            state.totalItems>0? state.totalItems-= 1: state.totalItems= 0 ;
            if (state.cartItems[id].quantity > 1) {                
                state.cartItems[id].quantity -= 1
            } else {
                delete state.cartItems[id];
            }
        },
        clearCart(state) {
            state.totalItems = 0;
            state.cartItems = {}
        }
    }
})
export const { addItemsToCart, removeItemsToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;