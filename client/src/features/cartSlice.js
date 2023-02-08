import { createSlice } from '@reduxjs/toolkit'; 

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
      items: []
    },
    reducers: {
        loadCart(state, action) {
            return(action.payload);
        },
        addItem(state, action) {
            state.items.push(action.payload);
        },
        removeItem(state, action) {
            const index = state.items.findIndex((item) => item.product_name === action.payload);
            if (index !== -1) {
                state.items.splice(index, 1);
            }
        },
        setCart(state, action) {
            state.items = action.payload;
        }
    }
});


export const selectCartItems = (state) => state.cart.items;
export const { loadCart, addItem, removeItem, setCart } = cartSlice.actions;
export default cartSlice.reducer;