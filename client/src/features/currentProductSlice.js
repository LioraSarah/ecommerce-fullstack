import { createSlice } from '@reduxjs/toolkit';

export const currentProductSlice = createSlice({
  name: 'currentProduct',
  initialState: {
    product: {}
  },
  reducers: {
    setCurrentProduct(state, action) {
      state.product = action.payload;
    }
  }
});

export const selectCurrentProduct = (state) => state.currentProduct.product;

export const { setCurrentProduct } = currentProductSlice.actions;

export default currentProductSlice.reducer;