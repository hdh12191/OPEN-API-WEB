import { configureStore } from "@reduxjs/toolkit";
import favoriteListSlice from "./slice/favoriteSlice";
import newsFeedsSlice from "./slice/newsFeedsSlice";

const store = configureStore({
  reducer: {
    favrioiteList: favoriteListSlice.reducer,
    newsFeeds: newsFeedsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
