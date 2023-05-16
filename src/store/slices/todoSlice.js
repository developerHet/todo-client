import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  filterStatus: "all",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialValue,
  reducers: {
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { updateFilterStatus } = todoSlice.actions;
export default todoSlice.reducer;
