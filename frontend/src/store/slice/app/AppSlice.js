import { createSlice } from "@reduxjs/toolkit";

const app = createSlice({
  name: "app",
  initialState: {
    serverUrl: process.env.REACT_APP_API_BASE_URL,
  },
  reducers: {
  },
});

export const { toggleLoading, isLoggedIn } = app.actions;
export default app.reducer;