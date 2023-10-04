import { configureStore } from "@reduxjs/toolkit";
import erdSlice from "./erdSlice";

export const store = configureStore({
  reducer: {
    erdData: erdSlice,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // .concat(apiSlice.middleware),
});
