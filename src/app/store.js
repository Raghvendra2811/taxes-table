// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { taxApi } from "./taxSlice";

const store = configureStore({
  reducer: {
    [taxApi.reducerPath]: taxApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taxApi.middleware),
});

export default store;
