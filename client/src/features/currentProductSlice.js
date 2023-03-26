import { createSlice } from '@reduxjs/toolkit';

export const currentProductSlice = createSlice({
  name: 'currentProduct',
  initialState: {
    product: {}
  },
  reducers: {
    setCurrentProduct(state, action) {
      state.product = action.payload.product;
      if (state.product) {
        state.product.quantity = action.payload.quantity;
      }
    },
    setQuantity(state, action) {
      state.product.quantity = action.payload;
  }
  }
});

export const selectCurrentProduct = (state) => state.currentProduct.product;

export const { setCurrentProduct, setQuantity } = currentProductSlice.actions;

export default currentProductSlice.reducer;