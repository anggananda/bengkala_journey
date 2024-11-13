import React from "react";
import { Card, Typography, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const galleryImages = [
  "https://images.unsplash.com/photo-1531778272849-d1dd22444c06?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJhbGl8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1531778272849-d1dd22444c06?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJhbGl8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1531778272849-d1dd22444c06?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJhbGl8ZW58MHx8MHx8fDA%3D",
];

const GallerySection = () => {
  return (
    <div className="py-12">
      <div className="max-w-screen-lg mx-auto px-4">
        {/* Title */}
        <Title
          level={3}
          className="text-xl md:text-3xl font-semibold text-center"
        >
          Explore Our Gallery
        </Title>
        <Text className="block text-center text-gray-700 mb-6 text-sm md:text-base">
          Discover the vibrant culture of Bengkala through our stunning imagery.
        </Text>

        {/* Gallery */}
        <div className="flex overflow-x-auto space-x-4 pb-4 mt-6 custom-scrollbar">
          {galleryImages.map((image, index) => (
            <Card
              key={index}
              hoverable
              className="min-w-[220px] md:min-w-[260px] border-none shadow-lg"
              bodyStyle={{ padding: 0 }}
              cover={
                <div className="overflow-hidden">
                  <img
                    alt={`Gallery Image ${index + 1}`}
                    src={image}
                    className="transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                </div>
              }
            >
              <div className="p-3 text-center">
                <p className="text-gray-500 text-xs md:text-sm">
                  Explore this moment in our culture.
                </p>
              </div>
            </Card>
          ))}
          {/* Button Card */}
          <Card className="min-w-[220px] md:min-w-[260px] flex items-center justify-center border-none shadow-lg">
            <Button
              type="primary"
              href="/login"
              className="w-full flex items-center justify-center"
              icon={<ArrowRightOutlined />}
              size="large"
            >
              Log In for More
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
