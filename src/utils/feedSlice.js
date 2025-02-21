import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeFeed: (state, action) => {
      return null;
    },
    removeUserFromFeed: (state, action) => {
      const updatedFeedArray = state.filter((s) => s._id !== action.payload);
      return updatedFeedArray;
    },
  },
});

export const { addFeed, removeUserFromFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
