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
  },
});
export const { addFavoriteList } = favoriteListSlice.actions;
export default favoriteListSlice;
