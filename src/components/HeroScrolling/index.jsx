import React from "react";
import { Button, Carousel, Typography } from "antd";
import { Link } from "react-router-dom";

const imgs = [
  "https://plus.unsplash.com/premium_photo-1678303396234-4180231353df?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1710611228734-5273e3f1ee72?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1678303396234-4180231353df?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1710611228734-5273e3f1ee72?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1678303396234-4180231353df?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const { Text, Title } = Typography;

const HeroScrolling = () => {
  return (
    <div className="relative">
      {/* Overlay Text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-[50]">
        <div className="flex flex-col justify-center items-center w-[350px] md:w-[600px] p-2">
          <h1 className="text-xl  text-white md:text-4xl font-bold font-poppins">
            Explore The World
          </h1>
          <Text className="text-white font-light text-center text-xs font-poppins">
            Discover the beauty, culture, and new experiences that await you.
            With every step, create new stories and meaningful connections.
            Start your journey today.
          </Text>
          <Link to="/login" className="mt-3">
            <Button
              className="bg-slate-800 hover:bg-slate-700 text-white outline-none"
              type="normal"
            >
              Explore
            </Button>
          </Link>
        </div>
      </div>

      <Carousel autoplay>
        {imgs.map((img, index) => (
          <div className="h-[700px] md:h-[500px] overflow-hidden" key={index}>
            <img
              src={img}
              className="object-cover hover:scale-110 transition-all ease-in-out duration-500 h-full w-full brightness-50" // Darker filter
              alt=""
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroScrolling;
