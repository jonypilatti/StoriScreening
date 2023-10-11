import { configureStore } from "@reduxjs/toolkit";
import recipientsSlice from "./recipientsSlice";
const store = configureStore({
  reducer: {
    data: recipientsSlice,
  },
});

export default store;
