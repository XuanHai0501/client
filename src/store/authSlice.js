import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogged: false,
    userInfo: {},
    isLoading: true,
  },
  reducers: {
    initialProfile: (state, { payload }) => {
      state.isLogged = true;
      state.userInfo = payload;
      state.isLoading = false;
    },
  },
});

export const { initialProfile } = authSlice.actions;
export default authSlice.reducer;
