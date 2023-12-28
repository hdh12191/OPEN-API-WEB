import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/home";
import NewsDetailPage from "../pages/newsDetailPage";
import FavoritesPage from "../pages/favoritesPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setNewsFeeds } from "../store/slice/newsFeedsSlice";
import { RootState } from "../store/store";
import NEWS_URL from "../apis/newsFeedApi";
import axios from "axios";
import Error from "./Error";

export default function Router() {
  const newsFeeds = useSelector((state: RootState) => {
    return state.newsFeeds;
  });
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const getNewsFeeds = async () => {
        const newsFeeds = await axios.get(NEWS_URL);
        console.log(newsFeeds.data);
        dispatch(setNewsFeeds(newsFeeds.data));
      };
      getNewsFeeds();
    } catch (e) {
      setError(true);
    }
  }, []);

  return (
    <>
      {error ? (
        <Error />
      ) : (
        <Routes>
          <Route path="/newslist" element={<HomePage />} />
          <Route path="/newsdetail/:id" element={<NewsDetailPage />} />
          <Route path="/favoriteslist" element={<FavoritesPage />} />
          <Route path="*" element={<Navigate replace to="/newslist" />} />
        </Routes>
      )}
    </>
  );
}
