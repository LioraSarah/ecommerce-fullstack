import { createSlice, current } from '@reduxjs/toolkit'; 

//redux slice of cart state
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
        updateQuantity(state, action) {
            const index = action.payload.index;
            state.items[index].quantity = action.payload.quantity;
        },
        removeItem(state, action) {
            const index = action.payload;
            if (index !== -1) {
                state.items.splice(index, 1);
            }
        },
        setCart(state, action) {
            state.items = action.payload;
        },
        clearCart(state) {
            state.items = [];
        }
    }
});


export const selectCartItems = (state) => state.cart.items;
export const { loadCart, addItem, removeItem, setCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;