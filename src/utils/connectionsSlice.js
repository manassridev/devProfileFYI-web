import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
    removeConnections: (_state, action) => {
      return null;
    },
  },
});

export const { addConnections, removeConnections } = connectionsSlice.actions;
export default connectionsSlice.reducer;
