//TODO Libraries
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    //put all initial values of the state
    user: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    registerMessage: null,
    isEmailVerified: false,
  },
  reducers: {
    //put all actions of the states for example:
    // setUser(state) {
    //   state.user = "majdi";
    // },
    login(state, action) {
      state.user = action.payload;
      //payload take the data from the server API
      state.registerMessage = null;
    },
    logout(state) {
      state.user = null;
    },
    register(state, action) {
      state.registerMessage = action.payload;
    },
    setUserPhoto(state, action) {
      state.user.profilePhoto = action.payload;
    },
    setUserName(state, action) {
      state.user.username = action.payload;
    },
    setIsEmailVerified(state) {
      state.isEmailVerified = true;
      state.registerMessage = null;
    },
  },
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authActions, authReducer };
