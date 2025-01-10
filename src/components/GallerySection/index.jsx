import React, { useEffect, useState } from "react";
import { Typography, Avatar } from "antd";
import { getContent } from "../../services/apiService";
const url = import.meta.env.VITE_BASE_URL;

const { Title, Text } = Typography;

const GallerySection = () => {
  const [contents, setContents] = useState([]);

  const fetchContent = async () => {
    try {
      const result = await getContent();
      console.log(result.datas.slice(0, 6));
      setContents(result.datas.filter((data) => !data.deleted_at).slice(0, 8));
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

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

        <div className="columns-1 sm:columns-2 md:columns-3 gap-2 space-y-4">
          {contents.map((item) => (
            <div
              key={item.id}
              className="relative group cursor-pointer overflow-hidden"
              onClick={() => showModal(item)}
            >
              <img
                src={`${url}/${item.image}`}
                alt={item.name}
                className="w-full object-cover transition duration-300 group-hover:brightness-75"
              />

              {/* Overlay info muncul saat hover */}
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex justify-between items-center w-full gap-1">
                  {/* Kiri: Avatar dan info */}
                  <div className="flex items-center">
                    <Avatar
                      className="shadow-lg w-10 h-10"
                      src={`${url}/${item.avatar_url}`}
                    />
                    <div className="text-white text-xs font-poppins">
                      <p className="font-semibold">
                        {item.first_name} {item.last_name}
                      </p>
                      <p className="text-gray-300">{item.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
