import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  comments_count: number;
  domain?: string;
  id: number;
  points: number;
  time?: 1703237527;
  time_ago: string;
  title: string;
  type?: string;
  url?: string;
  user: string;
  disabled?: true;
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
      const id = state.findIndex((a) => {
        return a.id === action.payload.id;
      });
      state.splice(id, 1);
    },
  },
});
export const { addFavoriteList, deleteFavoriteList } =
  favoriteListSlice.actions;
export default favoriteListSlice;
