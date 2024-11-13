import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import CultureHighlights from "../../components/CultureHighlight";
import DiscoverJourney from "../../components/DiscoverJourney";
import HeroScrolling from "../../components/HeroScrolling";
import UserTestimonials from "../../components/UserTestimonials";
import GallerySection from "../../components/GallerySection";

const Contoh = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className="">
      <HeroScrolling />
      <div data-aos="fade-up">
        <DiscoverJourney />
      </div>
      <div data-aos="fade-right">
        <CultureHighlights />
      </div>
      <div data-aos="zoom-in">
        <GallerySection />
      </div>
      <div data-aos="zoom-in">
        <UserTestimonials />
      </div>
    </div>
  );
};

export default Contoh;
