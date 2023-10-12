import { configureStore } from "@reduxjs/toolkit";
import recipientsSlice from "./recipientsSlice";
import userSlice from "./userSlice";
const store = configureStore({
  reducer: {
    data: recipientsSlice,
    user: userSlice,
  },
});

export default store;
