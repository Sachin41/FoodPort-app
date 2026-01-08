import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: { totalItems: 0, cartItems: {} },
    reducers: {
        addItemsToCart(state, action) {
            const { id, userKey  } = action.payload;
            state.totalItems += 1;
            if (state.cartItems[id]) {
                state.cartItems[id].quantity += 1
            } else {
                state.cartItems[id] = { item: action.payload, quantity: 1 }
            }
            localStorage.setItem(userKey, JSON.stringify(state.cartItems));
        },
        removeItemsToCart(state, action) {
            const { id, userKey  } = action.payload;
            state.totalItems > 0 ? state.totalItems -= 1 : state.totalItems = 0;
            if (state.cartItems[id].quantity > 1) {
                state.cartItems[id].quantity -= 1
                localStorage.setItem(userKey, JSON.stringify(state.cartItems));
            } else {
                delete state.cartItems[id];
                localStorage.removeItem(userKey);
            }
        },
        clearCart(state, action) {
            const { userKey  } = action.payload;
            state.totalItems = 0;
            state.cartItems = {};
            localStorage.removeItem(userKey);
        },
        setCartFromStorage: (state, action) => {
            const storedCart = action.payload || {};
            state.cartItems = storedCart;
            // ✅ Recalculate totalItems
            state.totalItems = Object.values(storedCart).reduce(
                (sum, item) => sum + item.quantity,
                0
            );
        }
    }
})
export const { addItemsToCart, removeItemsToCart, clearCart, setCartFromStorage } = cartSlice.actions;
export default cartSlice.reducer;