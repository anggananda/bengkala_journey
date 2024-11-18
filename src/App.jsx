import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/AboutUs";
import News from "./pages/News";
import CulturalHeritage from "./pages/CulturalHeritage";
import PrivateRoute from "./components/layout/PrivateRoute";
import ForumDiscussion from "./pages/ForumDiscussion";
import LoginPage from "./pages/Login";
import Playlist from "./pages/Playlist";
import Report from "./pages/Report";
import LandingPage from "./pages/LandingPage";
import Contributions from "./pages/Contributions";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<LoginPage />} />
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
          path="/heritage"
          element={<PrivateRoute component={<CulturalHeritage />} />}
        />
        <Route
          exact
          path="/forum"
          element={<PrivateRoute component={<ForumDiscussion />} />}
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
      </Routes>
    </>
  );
}

export default App;
