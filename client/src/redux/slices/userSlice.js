import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: Boolean(localStorage.getItem("queRapidaToken")),
  user: {
    name: localStorage.getItem("queRapidaName"),
    email: localStorage.getItem("queRapidaEmail"),
    token: localStorage.getItem("queRapidaToken"),
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
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
