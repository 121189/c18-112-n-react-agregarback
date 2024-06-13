import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  /* isLoggedIn: Boolean(localStorage.getItem("queRapidaToken")), */
  isLoggedIn: Boolean(Cookies.get("userToken")),
  user: {
    name: localStorage.getItem("queRapidaName"),
    email: localStorage.getItem("queRapidaEmail"),
    /* token: localStorage.getItem("queRapidaToken"), */
    token: Cookies.get("userToken"),
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user.name = user.name;
      state.user.email = user.email;
      state.user.token = accessToken;
      state.isLoggedIn = true;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.user = {};
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
