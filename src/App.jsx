import React, { useEffect, useState } from "react";
import { notification } from "antd";
import useAuth from "./store/useAuth";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
import PlaylistManagement from "./pages/PlaylistManagement";
import DetailDiscussion from "./pages/DetailDiscussion";
import { authStorage } from "./utils/encryptStorage";
import Tenun from "./pages/Tenun";
import TenunManagement from "./pages/TenunManagement";
import LikeList from "./pages/LikeList";
import CultureHeritage from "./pages/CultureHeritage";
import Kolok from "./pages/Kolok";

function App() {
  const initAuth = useAuth((state) => state.initAuth);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedKey = location.pathname;

  console.log(selectedKey);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await initAuth();

        if (response?.status === 401) {
          await authStorage.removeToken();
          await authStorage.removeUsername();
          if (selectedKey === "/" || selectedKey === "/register") {
            navigate(selectedKey);
          } else {
            navigate("/login");
          }
        } else {
          if (selectedKey !== location.pathname) {
            navigate(selectedKey);
          }
        }
      } catch (error) {
        console.error("Error during authentication check:", error);
      }
    };

    checkAuth();
  }, [initAuth, navigate]);

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
          path="/detail-forums/:id"
          element={<PrivateRoute component={<DetailDiscussion />} />}
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
          path="/culture"
          element={<PrivateRoute component={<CultureHeritage />} />}
        />
        <Route
          exact
          path="/kolok"
          element={<PrivateRoute component={<Kolok />} />}
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
          path="/tenun"
          element={<PrivateRoute component={<Tenun />} />}
        />
        <Route
          exact
          path="/like"
          element={<PrivateRoute component={<LikeList />} />}
        />
        <Route
          exact
          path="/users-management"
          element={<PrivateRoute component={<UserManagement />} />}
        />
        <Route
          exact
          path="/news-management"
          element={<PrivateRoute component={<NewsManagement />} />}
        />
        <Route
          exact
          path="/playlist-management"
          element={<PrivateRoute component={<PlaylistManagement />} />}
        />
        <Route
          exact
          path="/tenun-management"
          element={<PrivateRoute component={<TenunManagement />} />}
        />
      </Routes>
    </>
  );
}

export default App;
