import React, { useEffect } from "react";
import useAuth from "./store/useAuth";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/AboutUs";
import News from "./pages/News";
import CulturalHeritage from "./pages/CulturalHeritage";
import PrivateRoute from "./components/layout/PrivateRoute";
import LoginPage from "./pages/Login";
import Playlist from "./pages/Playlist";
import Report from "./pages/Report";
import LandingPage from "./pages/LandingPage";
import Contributions from "./pages/Contributions";
import Profile from "./pages/Profile";
import DiscussionForum from "./pages/DiscussionForum";
import DetailNews from "./pages/DetailNews";
import RegisterPage from "./pages/Register";
import Management from "./pages/Management";
import UserManagement from "./pages/UserManagement";
import NewsManagement from "./pages/NewsManagement";
import Testing from "./pages/Testing";

function App() {
  const initAuth = useAuth((state) => state.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/test" element={<Testing />} />
        <Route
          exact
          path="/dashboard"
          element={<PrivateRoute component={<Dashboard />} />}
        />
        <Route
          exact
          path="/contributions"
          element={<PrivateRoute component={<Contributions />} />}
        />
        <Route
          exact
          path="/profile"
          element={<PrivateRoute component={<Profile />} />}
        />
        <Route
          exact
          path="/forums"
          element={<PrivateRoute component={<DiscussionForum />} />}
        />
        <Route
          exact
          path="/about"
          element={<PrivateRoute component={<AboutUs />} />}
        />
        <Route
          exact
          path="/news"
          element={<PrivateRoute component={<News />} />}
        />
        <Route
          exact
          path="/detailnews/:id"
          element={<PrivateRoute component={<DetailNews />} />}
        />
        <Route
          exact
          path="/heritage"
          element={<PrivateRoute component={<CulturalHeritage />} />}
        />
        <Route
          exact
          path="/playlist"
          element={<PrivateRoute component={<Playlist />} />}
        />
        <Route
          exact
          path="/report"
          element={<PrivateRoute component={<Report />} />}
        />
        <Route
          exact
          path="/management"
          element={<PrivateRoute component={<Management />} />}
        />
        <Route
          exact
          path="/users"
          element={<PrivateRoute component={<UserManagement />} />}
        />
        <Route
          exact
          path="/news-content"
          element={<PrivateRoute component={<NewsManagement />} />}
        />
      </Routes>
    </>
  );
}

export default App;
