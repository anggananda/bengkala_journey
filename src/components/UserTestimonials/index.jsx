import React, { useEffect, useState } from "react";
import { Avatar, Card, Col, Row, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getTestimonials } from "../../services/apiService";
const url = import.meta.env.VITE_BASE_URL;

const { Title, Text } = Typography;

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    quote:
      "Visiting Bengkala was a transformative experience! The Kolok culture is rich and vibrant, and I learned so much about their traditions.",
  },
  {
    id: 2,
    name: "Jane Smith",
    quote:
      "The warmth of the Kolok community made me feel at home. I highly recommend experiencing their traditional festivals!",
  },
  {
    id: 3,
    name: "Michael Lee",
    quote:
      "Bengkala's unique cultural heritage is something everyone should witness. The craftsmanship and dances are breathtaking!",
  },
  {
    id: 4,
    name: "Sara Johnson",
    quote:
      "I fell in love with Kolok cuisine! Every dish tells a story of tradition and flavor that you can't find anywhere else.",
  },
];

const UserTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  const fetchTestimonial = async () => {
    try {
      const result = await getTestimonials();
      console.log(result.datas);
      setTestimonials(result.datas.slice(0, 4));
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchTestimonial();
  }, []);

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-[1280px] mx-auto px-4">
        <Title level={3} className=" mb-8">
          What Our Visitors Say
        </Title>
        <Row gutter={[16, 24]} justify="center">
          {testimonials.map((testimonial) => (
            <Col xs={24} sm={12} md={8} key={testimonial.id}>
              <Card
                hoverable
                className="shadow rounded border border-gray-200 p-6"
              >
                <div className="flex items-center gap-2 mb-4 justify-center">
                  <Avatar
                    src={`${url}/${testimonial.avatar_url}`}
                    icon={
                      <UserOutlined className="text-3xl text-gray-500 mr-2" />
                    }
                  />
                  <Text className="font-semibold text-gray-800">
                    {testimonial.username}
                  </Text>
                </div>
                <Text className="text-gray-700 italic text-center block">
                  "{testimonial.quote}"
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default UserTestimonials;
