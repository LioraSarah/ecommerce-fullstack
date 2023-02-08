import { createSlice } from '@reduxjs/toolkit';

export const catalogueSlice = createSlice({
  name: 'catalogue',
  initialState: {
    items: [],
    category: "",
    isLoadingCatalog: false
  },
  reducers: {
    setCategorie(state, action) {
      state.category = action.payload;
    },
    setProducts(state, action) {
      state.items = action.payload;
    },
    clearCart(state) {
      state.items = [];
    },
    setIsLoading(state, action) {
      state.isLoadingCatalog = action.payload;
    }
  },
});

export const selectAllItems = (state) => state.catalogue.items;

export const selectCategory = (state) => state.catalogue.category;

export const selectIsLoading = (state) => state.catalogue.isLoadingCatalog;

export const {setCategorie, setProducts, setIsLoading} = catalogueSlice.actions;

export default catalogueSlice.reducer;