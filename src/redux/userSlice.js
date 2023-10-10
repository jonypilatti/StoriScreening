import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for your feature/module
const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: "user", // Replace 'yourFeature' with the name of your feature/module
  initialState,
  reducers: {
    // Define your actions (reducers) here
    // For example:
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { fetchMostRecentNews } = userSlice.actions; // Export your actions
export default userSlice.reducer; // Export your reducer
