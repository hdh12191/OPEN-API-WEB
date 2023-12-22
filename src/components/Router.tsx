import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/home";
import NewsDetailPage from "../pages/newsDetailPage";
import FavoritesPage from "../pages/favoritesPage";

export default function Router() {
  return (
    <Routes>
      <Route path="/newslist" element={<HomePage />} />
      <Route path="/newsdetail/:id" element={<NewsDetailPage />} />
      <Route path="/favoriteslist" element={<FavoritesPage />} />
      <Route path="*" element={<Navigate replace to="/newslist" />} />
    </Routes>
  );
}
