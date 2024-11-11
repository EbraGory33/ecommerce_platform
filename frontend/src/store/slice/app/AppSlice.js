import { createSlice } from "@reduxjs/toolkit";

const app = createSlice({
  name: "app",
  initialState: {
    serverUrl: "http://127.0.0.1:8000",
  },
  reducers: {
  },
});

export const { toggleLoading, isLoggedIn } = app.actions;
export default app.reducer;