import { configureStore } from "@reduxjs/toolkit";
import favoriteListSlice from "./slice/favoriteSlice";

const store = configureStore({
  reducer: {
    favrioiteList: favoriteListSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;