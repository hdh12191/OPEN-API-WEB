import { createSlice } from "@reduxjs/toolkit";

export interface InitialState {
  comments_count: number;
  id: number;
  points: number;
  time_ago: string;
  title: string;
  user: string;
  isFavoriteButtonOn: boolean;
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
    
    toggleOn(state, action) {
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.payload) state[i].isFavoriteButtonOn = true;
      }
    },
    toggleOff(state, action) {
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.payload) state[i].isFavoriteButtonOn = false;
      }
    },
  },
});

export const { setNewsFeeds, deleteNewsFeed, toggleOn,toggleOff} = newsFeedsSlice.actions;
export default newsFeedsSlice;
