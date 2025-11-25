import { configureStore } from "@reduxjs/toolkit";
import petsReducer from "./slices/pets/";
import catsReducer from "./slices/cats/";
// import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    pets: petsReducer,
    cats: catsReducer,
    // auth: authReducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;