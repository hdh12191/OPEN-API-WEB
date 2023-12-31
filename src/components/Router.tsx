import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/home";
import NewsDetailPage from "../pages/newsDetailPage";
import FavoritesPage from "../pages/favoritesPage";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setNewsFeeds } from "../store/slice/newsFeedsSlice";
import NEWS_URL from "../apis/newsFeedApi";
import axios from "axios";
import Error from "./Error";
import NewsFeed from "./NewsList";

export default function Router() {
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const makeFeeds = (feeds: NewsFeed[]) => {
    for (let i = 0; i < feeds.length; i++) {
      feeds[i].isFavoriteButtonOn = false;
    }
    return feeds;
  };

  useEffect(() => {
    try {
      const getNewsFeeds = async () => {
        const newsFeeds = await axios.get(NEWS_URL);
        dispatch(setNewsFeeds(makeFeeds(newsFeeds.data)));
      };
      getNewsFeeds();
    } catch (e) {
      setError(true);
    }
  }, [dispatch]);

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
