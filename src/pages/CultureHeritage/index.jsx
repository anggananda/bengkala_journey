import React, { useEffect } from "react";
import { Card, List, Col, Row, Typography, Button, Carousel } from "antd";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

const { Text, Title } = Typography;

const imgs = ["./imgs/3.png", "./imgs/1.png", "./imgs/2.png"];

const CultureHeritage = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000, // Durasi animasi
      easing: "ease-in-out", // Efek easing
    });
  }, []);
  return (
    <div className="">
      <div className="relative bg-gradient-to-b from-blue-500 to-blue-300 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Carousel autoplay infinite>
            {imgs.map((img, index) => (
              <div
                className="h-[600px] md:h-[500px] overflow-hidden"
                key={index}
              >
                <img
                  src={img}
                  className="object-cover opacity-70 hover:scale-110 transition-all ease-in-out duration-500 h-full w-full brightness-50" // Darker filter
                  alt=""
                />
              </div>
            ))}
          </Carousel>
        </div>

        {/* Overlay Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center py-16 px-6">
          <h1 className="text-4xl sm:text-5xl font-bold font-poppins mb-4">
            Explore the Beauty of Bengkala
          </h1>
          <p className="text-lg sm:text-xl font-light max-w-2xl">
            Discover breathtaking moments captured through the lens of our
            community. From nature to culture, experience the essence of
            Bengkala.
          </p>
          <div className="mt-[150px]"></div>
        </div>

        {/* Decorative Element */}
        <div className="absolute bottom-0 w-full">
          <svg
            className="fill-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path d="M0,224L80,213.3C160,203,320,181,480,186.7C640,192,800,224,960,234.7C1120,245,1280,235,1360,229.3L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </div>
      <div
        className="mx-16 my-[20px] gap-4  grid grid-cols-1 md:grid-cols-2"
        data-aos="fade-left"
      >
        <div className="">
          <div>
            <Text className="text-3xl font-poppins font-bold text-slate-700 uppercase">
              Discover Yourselft with Nature
            </Text>
          </div>
          <div className="my-2 h-[8px] w-[60px] bg-green-700 rounded-full"></div>
          <div className="mt-4">
            <Text className="text-xs font-light font-poppins text-gray-500">
              The "Kolok" community in Desa Bengkala, Bali, is a unique group of
              individuals with congenital hearing and speech impairments who
              have enriched the village’s cultural identity. They communicate
              using <span className="font-semibold">Kata Kolok</span>, a distinctive sign language developed
              locally, reflecting the community's resilience and creativity.
              Fully integrated into village life, the Kolok people actively
              participate in religious ceremonies, traditional arts, and daily
              activities, showcasing a harmonious coexistence with hearing
              residents. Despite challenges such as limited access to education
              and economic opportunities, their contributions to preserving
              cultural traditions and promoting inclusivity highlight the
              village's strong sense of unity and mutual respect.
            </Text>
          </div>
          <div className="my-3">
            <Link to="/kolok">
              <Button
                type="normal"
                className="bg-green-800 hover:bg-green-700 text-white"
              >
                Explore
              </Button>
            </Link>
          </div>
        </div>
        <div className="bg-[url('./imgs/budaya.png')] bg-cover rounded-lg shadow-md"></div>
      </div>
      <div
        className="mx-16 my-[20px] mt-10 gap-4 grid grid-cols-1 md:grid-cols-2"
        data-aos="fade-right"
      >
        <div className="bg-[url('./imgs/tenun.png')] bg-cover rounded-lg shadow-md"></div>
        <div className="">
          <div>
            <Text className="text-3xl font-poppins font-bold text-slate-700 uppercase">
              Tenun Kolok Bengkala
            </Text>
          </div>
          <div className="my-2 h-[8px] w-[60px] bg-yellow-500 rounded-full"></div>
          <div className="mt-4">
            <Text className="text-xs font-light font-poppins text-gray-500">
              The <span className="font-semibold">Tenun Kolok</span> is a unique handwoven fabric crafted by the
              Kolok community in Desa Bengkala, showcasing their exceptional
              skill and artistry despite their hearing and speech impairments.
              This traditional weaving is not only a source of livelihood but
              also a cultural expression, reflecting the intricate patterns and
              vibrant colors inspired by Balinese heritage. Each piece of Tenun
              Kolok is crafted with meticulous care, symbolizing the resilience
              and creativity of the Kolok weavers. The fabric has gained
              recognition for its authenticity and is an embodiment of the
              village's efforts to preserve traditional crafts while empowering
              the Kolok community economically and socially.
            </Text>
          </div>
          <div className="my-3">
            <Link to="/tenun">
              <Button
                type="normal"
                className="bg-yellow-500 hover:bg-yellow-400"
              >
                Explore
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CultureHeritage;
