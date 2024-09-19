import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import languageSlice from "./languageSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    lang: languageSlice,
  },
});

export default store;
