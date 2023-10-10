import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "./newsSlice";
import userSlice from "./userSlice";
const store = configureStore({
  reducer: {
    news: newsSlice,
    user: userSlice,
  },
});

export default store;
