import React, { useEffect } from "react";
import { Row, Col, Typography } from "antd";
import Aos from "aos";
import "aos/dist/aos.css";

const { Title, Paragraph, Text } = Typography;

const Kolok = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Row gutter={[24, 16]} justify="center">
        <Col md={18} xs={24}>
          {/* Header Section */}
          <div className="mb-6" data-aos="fade-up">
            <Title
              level={2}
              className="text-gray-800 font-bold font-poppins text-center"
            >
              The Culture of Kolok in Bengkala
            </Title>
            <Paragraph className="text-center text-gray-600 font-light">
              An Insight into a Unique Tradition
            </Paragraph>
          </div>

          {/* Image Section */}
          <div className="overflow-hidden rounded-lg mb-6" data-aos="zoom-in">
            <img
              src={`./imgs/news2.png`}
              alt="Kolok Culture"
              className="w-full h-[300px] object-cover rounded-md shadow-lg"
            />
          </div>

          {/* Content Section */}
          <div data-aos="fade-up">
            <Paragraph className="text-gray-700 text-justify font-light leading-7 font-poppins">
              <Text strong>Bengkala Village</Text>, located in Buleleng, Bali,
              is home to a community known as the <Text strong>Kolok</Text>—a
              term referring to individuals born with hearing and speech
              impairments. This unique genetic trait has been passed down
              through generations due to a recessive gene within the community.
              However, what makes the Kolok culture extraordinary is not their
              condition but how they have embraced it and created a vibrant and
              inclusive environment.
            </Paragraph>

            <Paragraph className="text-gray-700 text-justify font-light leading-7 font-poppins">
              In Bengkala, inclusivity and harmony are at the heart of daily
              life. The Kolok community has developed their own sign language,
              locally referred to as <Text strong>Kata Kolok</Text>, which has
              become an integral part of the village's identity. This sign
              language is unique and distinct from international systems like
              ASL (American Sign Language), as it has evolved organically to
              meet the specific needs of the Kolok people in Bengkala.
            </Paragraph>

            <Title level={4} className="text-gray-800 mt-4">
              Janger Kolok: A Unique Cultural Performance
            </Title>
            <Paragraph className="text-gray-700 text-justify font-light leading-7 font-poppins">
              One of the most captivating aspects of Bengkala's cultural
              heritage is the
              <Text strong> Janger Kolok</Text>, a traditional dance performance
              adapted to include the Kolok community. Janger is a traditional
              Balinese folk dance usually performed in pairs, involving
              intricate movements, chanting, and dramatic storytelling. The
              Kolok version of Janger transforms this art form into something
              uniquely beautiful and meaningful.
            </Paragraph>

            <Paragraph className="text-gray-700 text-justify font-light leading-7 font-poppins">
              <ul className="list-disc list-inside">
                <li>
                  <Text strong>Adaptation of Movement:</Text> Janger Kolok
                  emphasizes visual storytelling through expressive hand
                  gestures and facial expressions. Since the performers cannot
                  hear the accompanying gamelan music, they rely on visual cues,
                  vibrations, and synchronized group practice to maintain rhythm
                  and coordination.
                </li>
                <li>
                  <Text strong>Sign Language Integration:</Text> Kata Kolok is
                  seamlessly incorporated into the performance, making the dance
                  a medium of communication as well as artistic expression.
                </li>
                <li>
                  <Text strong>Cultural Significance:</Text> Janger Kolok is
                  more than entertainment; it is a celebration of diversity and
                  inclusion.
                </li>
              </ul>
            </Paragraph>

            <Title level={4} className="text-gray-800 mt-4">
              The Spirit of Resilience
            </Title>
            <Paragraph className="text-gray-700 text-justify font-light leading-7 font-poppins">
              The Kolok culture in Bengkala is a testament to human adaptability
              and ingenuity. By creating a thriving environment where everyone
              is included, the village serves as a beacon of inspiration for
              inclusivity and acceptance. The Janger Kolok, in particular,
              stands as a powerful symbol of how art can transcend limitations
              and bring people together.
            </Paragraph>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Kolok;
