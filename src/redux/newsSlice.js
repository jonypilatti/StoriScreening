import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for your feature/module
const initialState = {
  news: [],
};

const newsSlice = createSlice({
  name: "news", // Replace 'yourFeature' with the name of your feature/module
  initialState,
  reducers: {
    // Define your actions (reducers) here
    // For example:
    fetchMostRecentNews: (state, action) => {
      state.news = action.payload;
    },
  },
});

export const { fetchMostRecentNews } = newsSlice.actions; // Export your actions
export default newsSlice.reducer; // Export your reducer
