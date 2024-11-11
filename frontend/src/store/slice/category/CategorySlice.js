import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryInfo: [],
  },
  reducers: {
    LoadCategories: (state, action) => {
      return { categoryInfo: action.payload };
    },
    LoadCategoriesFail: (state, action) => {
      return { error: action.payload };
    },
  },
});

export const { LoadCategories, LoadCategoriesFail} =
categorySlice.actions;
export default categorySlice.reducer;