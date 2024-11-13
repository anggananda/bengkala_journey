import React, { useRef } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import {
  FloatButton,
  Card,
  List,
  Typography,
  Divider,
  Row,
  Col,
  Image,
  Button,
} from "antd";
import { UpOutlined } from "@ant-design/icons";
import HeroScrolling from "../HeroScrolling";
import { Link } from "react-router-dom";

const { Text, Title } = Typography;
const { Meta } = Card;

const sections = [
  {
    id: "about",
    title: "Kehidupan Bengkala",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At atque consequuntur inventore debitis obcaecati nisi provident similique itaque? Voluptas, ut! Placeat nihil adipisci maxime doloribus, cumque modi nostrum rerum temporibus nulla ut consequuntur deleniti, dolor a ex ratione. Reprehenderit, alias.",
    img: "bg-hero.jpg",
  },
  {
    id: "heritage",
    title: "Budaya Bengkala",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At atque consequuntur inventore debitis obcaecati nisi provident similique itaque? Voluptas, ut! Placeat nihil adipisci maxime doloribus, cumque modi nostrum rerum temporibus nulla ut consequuntur deleniti, dolor a ex ratione. Reprehenderit, alias.",
    img: "bg-hero.jpg",
  },
  {
    id: "news",
    title: "Berita Bengkala",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At atque consequuntur inventore debitis obcaecati nisi provident similique itaque? Voluptas, ut! Placeat nihil adipisci maxime doloribus, cumque modi nostrum rerum temporibus nulla ut consequuntur deleniti, dolor a ex ratione. Reprehenderit, alias.",
    img: "bg-hero.jpg",
  },
];

const ParallaxSection = () => {
  const parallax = useRef(null);

  const scrollToTop = () => {
    parallax.current.scrollTo(0);
  };

  return (
    <Parallax pages={3} ref={parallax} className="">
      {/* Section 1: Hero Section */}
      <ParallaxLayer offset={0} speed={2}>
        <HeroScrolling />
        <div className="my-3 mx-auto md:my-6 max-w-[320px] md:max-w-[1250px]">
          <div className="">
            <Title className="text-center" level={3}>
              Bengkala
            </Title>
          </div>
          <Divider />
          <List
            grid={{
              gutter: 16,
              md: 3,
              lg: 3,
              xl: 3,
              xxl: 3,
            }}
            dataSource={sections}
            renderItem={(item) => (
              <List.Item>
                <Card
                  actions={[
                    <Link to={`/${item.id}`}>
                      {" "}
                      <Button type="primary">See detail</Button>
                    </Link>,
                  ]}
                  cover={
                    <div className="overflow-hidden">
                      <img
                        className="hover:scale-105 transition-all ease-in-out duration-500"
                        src={`./imgs/${item.img}`}
                      />
                    </div>
                  }
                >
                  <Meta title={item.title} description={item.description} />
                </Card>
              </List.Item>
            )}
          />
        </div>
      </ParallaxLayer>

      {/* Section 2: Sejarah dan Kehidupan Budaya Kolok */}
      <ParallaxLayer offset={1} speed={1.2} className="bg-green-800">
        <div style={{ padding: "60px 20px" }}>
          <Row justify="center">
            <Col xs={24} md={20} lg={16}>
              <Title level={2} style={{ textAlign: "center", color: "#333" }}>
                Budaya Kolok – Harmoni dalam Keheningan
              </Title>
              <Text
                style={{
                  display: "block",
                  textAlign: "center",
                  color: "#595959",
                  fontSize: "16px",
                  lineHeight: "1.8",
                  maxWidth: "700px",
                  margin: "0 auto 24px",
                }}
              >
                Budaya Kolok di Desa Bengkala telah berkembang selama
                berabad-abad. Kolok adalah istilah untuk masyarakat yang
                berkomunikasi melalui bahasa isyarat lokal,{" "}
                <strong>Kata Kolok</strong>. Dalam keheningan, mereka menemukan
                harmoni dan cara untuk tetap terhubung dalam kehidupan
                sehari-hari.
              </Text>
            </Col>
          </Row>
          <Row
            gutter={[16, 16]}
            justify="center"
            style={{ marginTop: "24px", maxWidth: "800px", margin: "0 auto" }}
          >
            <Col xs={24} md={12}>
              <Image
                src="/imgs/bg-hero.jpg"
                alt="Sejarah Kolok"
                preview={false}
                style={{
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Col>
            <Col xs={24} md={12}>
              <Image
                src="/imgs/bg-hero.jpg"
                alt="Kehidupan Kolok"
                preview={false}
                style={{
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Col>
          </Row>
          <List
            grid={{
              gutter: 16,
              md: 3,
              lg: 3,
              xl: 3,
              xxl: 3,
            }}
            dataSource={sections}
            renderItem={(item) => (
              <List.Item>
                <Card
                  actions={[
                    <Link to={`/${item.id}`}>
                      {" "}
                      <Button type="primary">See detail</Button>
                    </Link>,
                  ]}
                  cover={
                    <div className="overflow-hidden">
                      <img
                        className="hover:scale-105 transition-all ease-in-out duration-500"
                        src={`./imgs/${item.img}`}
                      />
                    </div>
                  }
                >
                  <Meta title={item.title} description={item.description} />
                </Card>
              </List.Item>
            )}
          />
        </div>
      </ParallaxLayer>

      {/* Section 3: Wisata Budaya dan Event Desa */}
      <ParallaxLayer offset={2} speed={0.2} className="bg-red-800">
        <div className="px-10 py-20">
          <h2 className="text-4xl font-bold mb-5 text-gray-800">
            Wisata Budaya Kolok dan Pengalaman yang Tak Terlupakan
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Desa Bengkala menawarkan pengalaman wisata budaya yang unik. Anda
            dapat belajar <strong>bahasa isyarat Kolok</strong>, mengikuti
            kegiatan adat, atau menghadiri festival tahunan desa yang penuh
            warna.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <img
              src="./imgs/bg-hero.jpg"
              alt="Event Budaya"
              className="rounded-lg shadow-md"
            />
            <img
              src="./imgs/bg-hero.jpg"
              alt="Wisata Edukasi"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
        <FloatButton
          icon={<UpOutlined />}
          type=""
          tooltip={<h1>Up</h1>}
          onClick={scrollToTop}
          className="bg-slate-800 hover:bg-slate-700 text-white"
        />
      </ParallaxLayer>
    </Parallax>
  );
};

export default ParallaxSection;
