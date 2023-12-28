import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  comments_count: number;
  id: number;
  points: number;
  time_ago: string;
  title: string;
  user: string;
}

const initialState: InitialState[] = [];

const favoriteListSlice = createSlice({
  name: "favoriteList",
  initialState,
  reducers: {
    addFavoriteList(state, action) {
      state.push(action.payload);
    },
    deleteFavoriteList(state, action) {
      return state.filter((feed) => feed.id !== action.payload);
    },
  },
});
export const { addFavoriteList, deleteFavoriteList } =
  favoriteListSlice.actions;
export default favoriteListSlice;
