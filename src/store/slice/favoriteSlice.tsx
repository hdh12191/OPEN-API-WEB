import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  comments_count: number;
  id: number;
  points: number;
  time_ago: string;
  title: string;
  user: string;
  isFavoriteButtonOn: boolean;
}

const initialState: InitialState[] = [];

const favoriteListSlice = createSlice({
  name: "favoriteList",
  initialState,
  reducers: {
    addFavoriteList(state, action) {
      const isExist = state.find((state) => state.id === action.payload.id);
      if (isExist) {
        return;
      } else {
        state.push(action.payload);
      }
    },
    deleteFavoriteList(state, action) {
      return state.filter((feed) => feed.id !== action.payload);
    },
  },
});
export const { addFavoriteList, deleteFavoriteList } =
  favoriteListSlice.actions;
export default favoriteListSlice;
