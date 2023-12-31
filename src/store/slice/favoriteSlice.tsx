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
    favoriteToggle(state, action) {
      for (let i = 0; i < state.length; i++) {
        if (
          state[i].id === action.payload &&
          state[i].isFavoriteButtonOn === false
        ) {
          state[i].isFavoriteButtonOn = true;
        }else if (state[i].id === action.payload &&
          state[i].isFavoriteButtonOn === true){
            state[i].isFavoriteButtonOn = false;
          }
      }
    },
  },
});
export const { addFavoriteList, deleteFavoriteList, favoriteToggle } =
  favoriteListSlice.actions;
export default favoriteListSlice;
