import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import MainLayout from "../../components/layout/Main";
import HeroScrolling from "../../components/HeroScrolling";
import CultureHighlights from "../../components/CultureHighlight";
import UserTestimonials from "../../components/UserTestimonials";
import GallerySection from "../../components/GallerySection";
import DiscoverJourney from "../../components/DiscoverJourney";
import useAuth from "../../store/useAuth";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const isLogin = useAuth((state) => state.auth.login);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate("/dashboard");
    }
  }, [isLogin, navigate]);

  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);

  return (
    <MainLayout>
      <div className="overflow-hidden">
        <HeroScrolling />
        <div data-aos="fade-up">
          <DiscoverJourney />
        </div>
        <div data-aos="fade-right">
          <CultureHighlights />
        </div>
        <div data-aos="fade-left">
          <GallerySection />
        </div>
        <div data-aos="zoom-in">
          <UserTestimonials />
        </div>
      </div>
    </MainLayout>
  );
};

export default LandingPage;
