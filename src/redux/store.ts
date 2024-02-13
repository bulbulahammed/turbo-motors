import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import authSlice from "./feature/user/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    [api.reducerPath]: api.reducer,
  },
  // To prevent Overwrite middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
