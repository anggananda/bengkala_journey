import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import UrgentFloatButton from "../../components/UrgentFloatButton";
import InfoModal from "../../components/InfoModal";
import ParallaxSection from "../../components/ParallaxSection";
import MainLayout from "../../components/layout/Main";
import { useLocation } from "react-router-dom";
import HeroScrolling from "../../components/HeroScrolling";
import CultureHighlights from "../../components/CultureHighlight";
import UserTestimonials from "../../components/UserTestimonials";
import GallerySection from "../../components/GallerySection";
import DiscoverJourney from "../../components/DiscoverJourney";

const Dashboard = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="">
      {location.pathname === "/" ? (
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
      ) : (
        <div className="">
          <ParallaxSection />
          <UrgentFloatButton showModal={showModal} />
          <InfoModal closeModal={closeModal} isModalOpen={isModalOpen} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
