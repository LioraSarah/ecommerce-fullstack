import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    isAuthenticated: false
  },
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
    },
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    logOut(state) {
      state.id = null;
      state.firstName = '';
      state.lastName = '';
      state.email = '';
      state.isAuthenticated = false;
    }
  }
});

export const selectUserId = (state) => state.user.id;
export const selectFirstName = (state) => state.user.firstName;
export const selectLastName = (state) => state.user.lastName;
export const selectEmail = (state) => state.user.email;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;

export const { setUser, setAuthenticated, logOut } = userSlice.actions;
export default userSlice.reducer;