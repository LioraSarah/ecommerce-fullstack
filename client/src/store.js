// import searchReducer from '../features/search/searchSlice.js';
// import postPreviewsReducer from '../features/posts/postPreviewsSlice';
// import subredditsReducer from '../features/subredditsSlice';
import catalogueReducer from './features/catalogSlice';
import cartReducer from './features/cartSlice';
import userReducer from './features/loginSlice';
import currentProductSlice from './features/currentProductSlice';
import logger from 'redux-logger';


import { applyMiddleware, configureStore } from '@reduxjs/toolkit'; 
import { composeWithDevTools } from 'redux-devtools-extension';

export default configureStore({
  reducer: {
    catalogue: catalogueReducer,
    cart: cartReducer,
    user: userReducer,
    currentProduct: currentProductSlice
  },
  middleware: [(composeWithDevTools) => applyMiddleware(logger)]
});