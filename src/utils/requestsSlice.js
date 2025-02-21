import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      const updatedArray = state.filter((s) => s._id === action.payload);
      return updatedArray;
    },
  },
});
export const { addRequests, removeRequest } = requestsSlice.actions;
export default requestsSlice.reducer;
