import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/AboutUs";
import News from "./pages/News";
import CulturalHeritage from "./pages/CulturalHeritage";
import PrivateRoute from "./components/layout/PrivateRoute";
import ForumDiscussion from "./pages/ForumDiscussion";
import LoginPage from "./pages/Login";
import ScrollableSections from "./pages/Test";
import Contoh from "./pages/Contoh";
import House from "./pages/House";
import Users from "./pages/Users";
import Playlist from "./pages/Playlist";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/test" element={<ScrollableSections />} />
        <Route exact path="/contoh" element={<Contoh />} />
        <Route exact path="/house" element={<House />} />
        <Route exact path="/playlist" element={<Playlist />} />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route
          exact
          path="/dashboard"
          element={<PrivateRoute component={<Dashboard />} />}
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
      </Routes>
    </>
  );
}

export default App;
