import React, { useEffect } from "react";
import { Card, Col, Row, Typography, Button, Avatar } from "antd";
import Aos from "aos";
import "aos/dist/aos.css";

const { Title, Text } = Typography;
const { Meta } = Card;

const highlights = [
  {
    id: 1,
    title: "Traditional Dance",
    description:
      "Experience the rhythm and grace of Kolok's traditional dances performed during festivals.",
    image:
      "https://akcdn.detik.net.id/community/media/visual/2023/09/17/tari-janger-kolok-dibawakan-oleh-penyandang-disabilitas-dari-desa-bengkala_169.jpeg?w=700&q=90",
  },
  {
    id: 2,
    title: "Local Crafts",
    description:
      "Discover the exquisite craftsmanship of Kolok artisans, known for their intricate handwoven textiles.",
    image: "./imgs/g1.jpeg",
  },
  {
    id: 3,
    title: "Festivals and Celebrations",
    description:
      "Join us in celebrating Kolok festivals that bring the community together with joyful festivities.",
    image: "./imgs/aslibengkala.JPG",
  },
  {
    id: 4,
    title: "Culinary Traditions",
    description:
      "Savor the flavors of Kolok cuisine, where traditional dishes showcase our rich culinary heritage.",
    image:
      "https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/2019/07/24/2425833339.jpg",
  },
];

const CultureHighlights = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className="bg-gray-100 py-12 mt-10" data-aos="fade-right">
      <div className="max-w-[1280px] mx-auto mt-8 px-4">
        <Title
          level={2}
          className="text-center text-5xl font-extrabold mb-6 text-gray-800"
        >
          Discover Kolok Culture
        </Title>
        <Text className="text-center block mb-10 text-gray-600 font-light">
          Explore the unique traditions, arts, and community spirit of
          Bengkala's Kolok culture.
        </Text>

        <Row gutter={[24, 24]} justify="center">
          {highlights.map((highlight) => (
            <Col xs={24} sm={12} md={8} lg={6} key={highlight.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={highlight.title}
                    src={highlight.image}
                    className="object-cover h-56 rounded-lg"
                  />
                }
                className="transition-transform transform hover:scale-105 shadow-lg rounded-lg border border-gray-200"
                bodyStyle={{ padding: "24px" }}
              >
                <Meta
                  avatar={
                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                  }
                  title={highlight.title}
                  description={highlight.description}
                />
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-10">
          <Button
            type="primary"
            size="large"
            href="/join"
            className="shadow-lg hover:shadow-xl transition-shadow bg-blue-600 border-none rounded-full py-2 px-6"
          >
            Join the Conversation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CultureHighlights;
