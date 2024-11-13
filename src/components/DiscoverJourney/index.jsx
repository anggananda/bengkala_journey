import React from "react";
import { Row, Col, Card, Typography, Button, List } from "antd";
import { Link } from "react-router-dom";
import {
  EnvironmentOutlined,
  MessageOutlined,
  BookOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

const discover = [
  {
    id: 1,
    name: "Cultural Heritage",
    description:
      "Immerse yourself in the rich traditions and heritage of Bali.",
    icon: <BookOutlined className="text-2xl text-gray-700" />, // Adjust icon color for better contrast
    route: "/heritage",
  },
  {
    id: 2,
    name: "Destinations",
    description:
      "Explore breathtaking destinations that offer unique experiences.",
    icon: <AppstoreAddOutlined className="text-2xl text-gray-700" />, // Adjust icon color for better contrast
    route: "/heritage",
  },
  {
    id: 3,
    name: "News & Updates",
    description: "Keep informed with the latest news, events, and trends.",
    icon: <EnvironmentOutlined className="text-2xl text-gray-700" />, // Adjust icon color for better contrast
    route: "/heritage",
  },
  {
    id: 4,
    name: "Discussion Forum",
    description:
      "Engage with the community and share your insights in lively discussions.",
    icon: <MessageOutlined className="text-2xl text-gray-700" />, // Adjust icon color for better contrast
    route: "/heritage",
  },
];

const DiscoverJourney = () => {
  return (
    <div className="my-10">
      <div className="max-w-[650px] mx-auto flex flex-col justify-center items-center">
        <h1 className="text-center font-poppins text-xl md:text-4xl font-bold">
          Discover Your Journey
        </h1>
        <Text className="text-gray-600 text-sm md:text-base font-poppins font-light text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus cumque
          corporis magni veniam, facere assumenda ut nobis dolorum unde quas
          harum id minus ab accusantium tenetur? Non soluta blanditiis ipsum.
        </Text>
      </div>

      <div className="max-w-[1280px] mx-auto mt-8">
        <Row gutter={[24, 0]} className="p-2 md:p-0">
          <Col sm={24} md={8}>
            <Card
              cover={
                <div className="overflow-hidden">
                  <img
                    className="hover:scale-110 transition-all ease-in-out duration-500"
                    src="https://images.unsplash.com/photo-1531778272849-d1dd22444c06?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJhbGl8ZW58MHx8MHx8fDA%3D"
                  />
                </div>
              }
            >
              <div className="flex justify-center items-center">
                <Link to="/dashboard">
                  <Button type="primary">See More...</Button>
                </Link>
              </div>
            </Card>
          </Col>
          <Col sm={24} md={16}>
            <Title level={3} className="text-center mb-4 font-semibold">
              List Your Journey
            </Title>
            <List
              grid={{
                gutter: 16,
                sm: 1,
                md: 2,
                lg: 2,
                xl: 2,
              }}
              dataSource={discover}
              renderItem={(item) => (
                <List.Item>
                  <Link to={item.route}>
                    <Card className="flex items-center justify-between p-4 hover:shadow-md transition-shadow duration-200 ease-in-out rounded-md">
                      <div className="flex items-center">
                        <div className="text-2xl text-blue-500 mr-2">
                          {item.icon}
                        </div>
                        <div>
                          <Title level={4} className="text-gray-800 mb-0">
                            {item.name}
                          </Title>
                          <Text className="text-gray-600">
                            {item.description}
                          </Text>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DiscoverJourney;
