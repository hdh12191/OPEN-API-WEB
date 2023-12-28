import { createSlice } from "@reduxjs/toolkit";

export interface InitialState {
  comments_count: number;
  id: number;
  points: number;
  time_ago: string;
  title: string;
  user: string;
}

const initialState: InitialState[] = [];

const newsFeedsSlice = createSlice({
  name: "newsFeeds",
  initialState,
  reducers: {
    setNewsFeeds(state, action) {
      state.push(...action.payload);
    },
    deleteNewsFeed(state, action) {
      return state.filter((newsFeed) => newsFeed.id !== action.payload);
    },
  },
});

export const { setNewsFeeds, deleteNewsFeed } = newsFeedsSlice.actions;
export default newsFeedsSlice;
