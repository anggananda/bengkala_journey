import React from "react";
import { Card, Row, Col, List, Carousel, Typography } from "antd";
import { CalendarOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Text, Title } = Typography;

const imgs = [
  "https://plus.unsplash.com/premium_photo-1678303396234-4180231353df?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1710611228734-5273e3f1ee72?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1678303396234-4180231353df?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1710611228734-5273e3f1ee72?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const Contributions = () => {
  return (
    <div className="">
      <div className="mb-6">
        <Carousel autoplay arrows infinite>
          {imgs.map((img, index) => (
            <div className="h-[200px] md:h-[500px] overflow-hidden" key={index}>
              <img
                src={img}
                className="object-cover hover:scale-110 transition-all ease-in-out duration-500 h-full w-full brightness-50" // Darker filter
                alt=""
              />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="flex justify-center items-center mb-4">
        <Text className="text-xl font-poppins font-semibold">
          Explore the nature of Bengkala
        </Text>
      </div>

      <div className="px-2">
        <List
          grid={{
            gutter: 10,
            xs: 1,
            md: 4,
            lg: 4,
            xl: 4,
          }}
          dataSource={imgs}
          renderItem={(item) => (
            <List.Item>
              <Card></Card>
            </List.Item>
          )}
        />
        <div className="mb-2 flex justify-end items-center gap-2">
          <button className="group flex items-center gap-1">
            <Link to="/contents">
              <Text className="text-gray-500 group-hover:text-blue-500 transition-colors">
                Read Another News
              </Text>
            </Link>
            <ArrowRightOutlined className="text-gray-400 group-hover:text-blue-500 transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contributions;
