import { createSlice, current } from '@reduxjs/toolkit';
import { isEmptyObj } from '../components/mainView/helper';

//redox slice for the current product being clicked state
export const currentProductSlice = createSlice({
  name: 'currentProduct',
  initialState: {
    product: {}
  },
  reducers: {
    setCurrentProduct(state, action) {
      state.product = action.payload.product;
      console.log("in current slice");
      console.log(current(state));
      console.log(current(state.product));
      console.log(isEmptyObj(state.product));
      if (!isEmptyObj(state.product)) {
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