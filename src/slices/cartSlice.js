import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:8000/api/cart', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return await res.json();
});

export const addItemToCart = createAsyncThunk('cart/addItemToCart', async (item) => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:8000/api/cart/addItem', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(item)
    });
    return await res.json();
})

export const removeItemFromCart = createAsyncThunk('cart/removeItemFromCart', async (itemId) => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:8000/api/cart/removeItem', {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            menuItemId: itemId
        })
    });
    return await res.json();
})

export const clearCart = createAsyncThunk('cart/clearCart', async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:8000/api/cart/clear', {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return await res.json();
})

const cartSlice = createSlice({
    name: 'cart',
    initialState: { totalItems: 0, cartItems: [], loading: false, error: null },
    reducers: {
        resetCart(state, action) {
            state.totalItems = 0;
            state.cartItems = [];
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => { state.loading = true; })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload.cart.items;
                state.totalItems = action.payload.cart.items.reduce(
                    (sum, item) => sum + item.quantity, 0
                );
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addItemToCart.pending, (state) => { state.loading = true; })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                console.log("add item action", action.payload);
                state.loading = false;
                state.cartItems = action.payload.items;
                state.totalItems = action.payload.items.reduce(
                    (sum, item) => sum + item.quantity, 0
                );
            })
            .addCase(addItemToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(removeItemFromCart.pending, (state) => { state.loading = true; })
            .addCase(removeItemFromCart.fulfilled, (state, action) => {
                console.log("action", action.payload);
                state.loading = false;
                state.cartItems = action.payload.items;
                state.totalItems = action.payload.items.reduce(
                    (sum, item) => sum + item.quantity, 0
                );
            })
            .addCase(removeItemFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(clearCart.pending, (state) => { state.loading = true; })
            .addCase(clearCart.fulfilled, (state, action) => {
                console.log("action clear cart", action.payload);
                state.loading = false;
                state.cartItems = action.payload.items;
                state.totalItems = 0;
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;