import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userOptionsIsOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    closeUserOptions: (state, payload) => {
      state.userOptionsIsOpen = false;
    },
    toggleUserOptions: (state, payload) => {
      state.userOptionsIsOpen = !state.userOptionsIsOpen;
    },
  },
});

export const { closeUserOptions, toggleUserOptions } = uiSlice.actions;
export default uiSlice.reducer;
