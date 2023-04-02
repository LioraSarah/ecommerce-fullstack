import { createSlice } from '@reduxjs/toolkit';

//redux slice of the logged in user details state
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    isAuthenticated: false,
    isVerified: false,
    userType: ''
  },
  reducers: {
    loaduser(state, action) {
      return(action.payload);
    },
    setUser(state, action) {
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.isVerified = action.payload.isVerified;
      state.userType = action.payload.userType;
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
    },
    setIsVerified(state, action) {
      state.isVerified = action.payload;
    }
  }
});

export const selectUserId = (state) => state.user.id;
export const selectFirstName = (state) => state.user.firstName;
export const selectLastName = (state) => state.user.lastName;
export const selectEmail = (state) => state.user.email;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectIsVerified = (state) => state.user.isVerified;
export const selectUserType = (state) => state.user.userType;

export const { loaduser, setUser, setAuthenticated, logOut, setIsVerified } = userSlice.actions;
export default userSlice.reducer;