import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  List,
  Typography,
  Avatar,
  Image,
  Tooltip,
  notification,
} from "antd";
import {
  InstagramFilled,
  TikTokFilled,
  PhoneFilled,
  WechatFilled,
  MailFilled,
  GithubFilled,
} from "@ant-design/icons";
import { IoLocation } from "react-icons/io5";
import Aos from "aos";
import "aos/dist/aos.css";
import { postMessage } from "../../services/apiService";
import useAuth from "../../store/useAuth";

const { Text } = Typography;
const { TextArea } = Input;

const teams = [
  {
    id: 1,
    name: "Dwi Angga",
    img: "./imgs/angga.png",
    position: "Founder & CEO",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel laborum voluptatibus quae rerum alias esse.",
    ig: "https://instagram.com/angga_dwinnd",
  },
  {
    id: 2,
    name: "Candra",
    img: "./imgs/candra.jpg",
    position: "UI/UX Design",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel laborum voluptatibus quae rerum alias esse.",
    ig: "https://instagram.com/angga_dwinnd",
  },
  {
    id: 3,
    name: "Cahya",
    img: "./imgs/cahya.png",
    position: "Frontend Dev",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel laborum voluptatibus quae rerum alias esse.",
    ig: "https://instagram.com/angga_dwinnd",
  },
  {
    id: 4,
    name: "Yastika",
    img: "./imgs/yas.jpg",
    position: "Backend Dev",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel laborum voluptatibus quae rerum alias esse.",
    ig: "https://instagram.com/angga_dwinnd",
  },
];

const AboutUs = () => {
  const userID = useAuth((state) => state.auth.id);
  const [form] = Form.useForm();
  useEffect(() => {
    Aos.init({
      duration: 1000, // Durasi animasi
      easing: "ease-in-out", // Efek easing
    });
  }, []);

  const onFinish = async (values) => {
    try {
      if (userID) {
        const formData = new FormData();
        formData.append("message", values.message);
        formData.append("user_id", userID);
        const result = await postMessage(formData);
        form.resetFields();
        notification.success({
          message: "Send Message",
          description: `Success to send message`,
        });
      }
    } catch (error) {
      notification.error({
        message: "Failed Send Message",
        description: "Check Your Input Edit",
      });
      throw error;
    }
  };

  return (
    <div className="overflow-hidden">
      <Row gutter={[24, 0]}>
        <Col md={24} className="p-4" data-aos="zoom-in">
          <div className="flex flex-col gap-6 justify-center items-center">
            <Text className="text-4xl font-medium font-poppins text-slate-800">
              About Us
            </Text>
            <div className="md:w-[600px] text-center">
              <Text className="font-poppins text-center font-light text-sm">
                We are dedicated to sharing Bengkala’s unique culture and
                *Kolok* heritage, promoting inclusivity and preserving tradition
                through a vibrant digital platform.
              </Text>
            </div>
            <div className="px-5 md:px-20">
              <Row gutter={[24, 10]} className="flex items-center">
                <Col md={12}>
                  <div className="">
                    <img
                      src="./imgs/aslibengkala.JPG"
                      className="shadow-lg rounded-lg"
                      alt=""
                    />
                  </div>
                </Col>
                <Col md={12}>
                  <div className="text-justify">
                    <Text className="font-light font-poppins text-slate-700 text-xs">
                      This website shines a spotlight on Bengkala Village, a
                      truly unique community in Bali renowned for its large
                      population of deaf individuals, known locally as "Kolok."
                      What makes this village so special is the way its
                      residents embrace inclusivity through a local sign
                      language called *Kata Kolok*, which is used by everyone to
                      communicate in daily life. Through this platform, we aim
                      to showcase the rich culture, traditions, and social
                      harmony of Bengkala Village to the world. More than just a
                      cultural introduction, the website also advocates for
                      inclusive tourism and celebrates the strength of local
                      heritage. From the warm hospitality of its people to its
                      vibrant traditions, Bengkala invites you to explore a
                      world where inclusivity and culture come together in a
                      truly inspiring way.
                    </Text>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
        <div className="bg-gray-100 py-8" data-aos="fade-up">
          <Col md={24}>
            <div className="flex flex-col gap-4 justify-center items-center ">
              <Text className="font-light text-slate-800 font-poppins">
                Our Team
              </Text>
              <Text className="text-4xl font-medium font-poppins text-slate-800">
                Leadership Team
              </Text>
              <Text className="font-light text-slate-800 font-poppins">
                We are Building the Future of Software Development
              </Text>
            </div>
          </Col>
          <div className="md:px-10">
            <Col md={24} className="mt-8">
              <List
                grid={{
                  gutter: 20,
                  xs: 1,
                  sm: 1,
                  md: 4,
                  lg: 4,
                  xl: 4,
                  xxl: 4,
                }}
                dataSource={teams}
                renderItem={(item) => (
                  <List.Item>
                    <div className="flex flex-col justify-center items-center gap-2">
                      <Avatar
                        className="shadow-md"
                        src={<Image src={item.img} />}
                        size={80}
                      />
                      <div className="flex flex-col justify-center items-center">
                        <Text className="text-slate-800 font-semibold font-poppins">
                          {item.name}
                        </Text>
                        <Text>{item.position}</Text>
                      </div>
                      <Text className="text-center text-xs font-poppins text-slate-600">
                        {item.description}
                      </Text>
                      <div className="flex gap-4">
                        <a href="">
                          <Tooltip title="Instagram">
                            <InstagramFilled className="text-xl" />
                          </Tooltip>
                        </a>
                        <a href="">
                          <Tooltip title="Tiktok">
                            <TikTokFilled className="text-xl" />
                          </Tooltip>
                        </a>
                        <a href="">
                          <Tooltip title="Github">
                            <GithubFilled className="text-xl" />
                          </Tooltip>
                        </a>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </Col>
          </div>
        </div>
        <div className="py-10 px-5 md:px-32">
          <Col md={24}>
            <Row gutter={[24, 0]}>
              <Col md={12} data-aos="fade-right">
                <div className="flex flex-col">
                  <Text className="font-semibold text-slate-800 font-poppins text-lg">
                    Call Us
                  </Text>
                  <Text className="text-sm font-poppins text-gray-400 font-extralight">
                    Call our team Mon-Fri from 8am to 5am
                  </Text>
                  <div className="flex gap-2 justify-start items-center mt-2">
                    <PhoneFilled />
                    <Text className="font-poppins font-semibold text-slate-800">
                      +62 822 3690 3868
                    </Text>
                  </div>
                </div>
                <div className="flex flex-col mt-8">
                  <Text className="font-semibold text-slate-800 font-poppins text-lg">
                    Chat with us
                  </Text>
                  <Text className="text-sm font-poppins text-gray-400 font-extralight">
                    Speak to our frindly team via live chat
                  </Text>
                  <div className="flex gap-2 justify-start items-center mt-3">
                    <WechatFilled />
                    <Text className="font-poppins font-semibold text-slate-800">
                      Start a live chat
                    </Text>
                  </div>
                  <div className="flex gap-2 justify-start items-center mt-2">
                    <MailFilled />
                    <Text className="font-poppins font-semibold text-slate-800">
                      Shoot us an email
                    </Text>
                  </div>
                  <div className="flex gap-2 justify-start items-center mt-2">
                    <InstagramFilled />
                    <Text className="font-poppins font-semibold text-slate-800">
                      Message us on Instagram
                    </Text>
                  </div>
                </div>
                <div className="flex flex-col mt-8">
                  <Text className="font-semibold text-slate-800 font-poppins text-lg">
                    Visit Us
                  </Text>
                  <Text className="text-sm font-poppins font-extralight text-gray-400 ">
                    Visit us in our company
                  </Text>
                  <div className="flex gap-2 justify-start items-center mt-3">
                    <IoLocation size={20} />
                    <Text className="font-poppins font-semibold text-slate-800">
                      Singaraja, Buleleng, Bali
                    </Text>
                  </div>
                </div>
              </Col>
              <Col md={12} data-aos="fade-left">
                <div className="w-[400px] md:w-[500px]">
                  <Form onFinish={onFinish} form={form}>
                    <Form.Item name="message">
                      <div className="">
                        <div className="mb-2">
                          <Text className="text-slate-800 font-semibold font-poppins">
                            Message
                          </Text>
                        </div>
                        <TextArea
                          rows={10}
                          className="font-poppins text-gray-400"
                        />
                      </div>
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full"
                      >
                        Send Message
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </Col>
            </Row>
          </Col>
        </div>
      </Row>
    </div>
  );
};

export default AboutUs;
