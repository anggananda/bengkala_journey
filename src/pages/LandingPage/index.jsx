import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import MainLayout from "../../components/layout/Main";
import HeroScrolling from "../../components/HeroScrolling";
import CultureHighlights from "../../components/CultureHighlight";
import UserTestimonials from "../../components/UserTestimonials";
import GallerySection from "../../components/GallerySection";
import DiscoverJourney from "../../components/DiscoverJourney";

const LandingPage = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);

  return (
    <div className="">
      <MainLayout>
        <div className="">
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
    </div>
  );
};

export default LandingPage;
