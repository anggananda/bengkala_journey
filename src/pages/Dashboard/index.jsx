import React, { useState, useEffect } from "react";
import {
  FloatButton,
  Row,
  Col,
  List,
  Card,
  Avatar,
  Typography,
  Button,
  Skeleton,
  Divider,
  Tag,
  Image,
} from "antd";
import { RobotFilled } from "@ant-design/icons";
import ChatbotWidget from "../../components/Chatbot";
import useAuth from "../../store/useAuth";
import useProfile from "../../store/useProfile";
import { getCurrentDayPeriod } from "../../utils/currentDayPeriod";
import {
  getAllReply,
  getContent,
  getForums,
  getNews,
  getTenun,
} from "../../services/apiService";
import { Link } from "react-router-dom";
import { formatToRupiah } from "../../utils/formatToRupiah";
import { formatDate } from "../../utils/dateUtils";
import Chart from "react-apexcharts";
const url = import.meta.env.VITE_BASE_URL;
import {
  HeartOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  SortDescendingOutlined,
  HeartFilled,
  CalendarOutlined,
} from "@ant-design/icons";
import ReactPlayer from "react-player";

const { Text, Title } = Typography;
const { Meta } = Card;

const tagColors = {
  adat: "gold",
  sejarah: "blue",
  seni: "purple",
  wisata: "green",
  lainnya: "gray",
};

const Dashboard = () => {
  const role = useAuth((state) => state.auth.role);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const username = useAuth((state) => state.auth.username);
  const photo = useProfile((state) => state.profile.photoProfile);
  const [isLoading, setIsLoading] = useState(false);
  const [forum, setForum] = useState([]);
  const [tenun, setTenun] = useState([]);
  const [forums, setForums] = useState(0);
  const [posts, setPosts] = useState(0);
  const [replies, setReplies] = useState(0);
  const userID = useAuth((state) => state.auth.id);

  const fetchForums = async () => {
    setIsLoading(true);
    try {
      const result = await getForums();
      console.log({
        forum: result.datas.filter((item) => !item.deleted_at),
      });

      const filteredForums = result.datas.filter(
        (item) => item.user_id === userID && item.deleted_at === ""
      );
      console.log({ filtereeddbro: filteredForums });

      setForums(filteredForums.length);
      if (!Array.isArray(result.datas)) {
        throw new Error("Data format invalid: result.datas is not an array.");
      }

      // Ambil hanya 5 data pertama
      const limitedData = result.datas
        .filter((item) => !item.deleted_at)
        .slice(0, 5);
      console.log(limitedData);
      setForum(limitedData);
    } catch (error) {
      console.error("Error fetching forums:", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(forum);

  useEffect(() => {
    if (userID) {
      fetchForums();
      fetchReply();
      fetchContent();
    }
  }, [userID]);

  const fetchTenun = async () => {
    setIsLoading(true);
    try {
      const result = await getTenun();
      console.log(result);
      setTenun(result.datas.slice(0, 5));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const fetchReply = async () => {
    try {
      const result = await getAllReply();
      console.log({ testbang: result.datas });

      const filteredReplies = result.datas.filter(
        (item) => item.user_id === userID && item.deleted_at === ""
      );

      setReplies(filteredReplies.length);
    } catch (error) {
      console.error("Error fetching replies:", error);
    }
  };

  const fetchContent = async () => {
    try {
      const result = await getContent();
      const filteredReplies = result.datas.filter(
        (item) => item.user_id === userID && item.deleted_at === ""
      );

      setPosts(filteredReplies.length);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchTenun();
  }, []);

  const [news, setNews] = useState([]);

  console.log({ roleeee: role });

  const fetchNews = async () => {
    setIsLoading((prev) => !prev);
    try {
      const result = await getNews();
      console.log(result);
      setNews(result.datas.slice(0, 5));
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const getColor = (tag) => {
    return tagColors[tag.toLowerCase()] || "red";
  };
  return (
    <div className="p-4 relative">
      <Row gutter={[24, 0]}>
        <Col md={16} lg={16} sm={24} xs={24}>
          <Card className="h-[150px] md:h-[350px] shadow-lg rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 flex flex-col justify-center items-center text-white p-8 transition-transform transform hover:scale-105">
            <div className="text-center">
              <h1 className="md:text-4xl font-poppins font-semibold mb-2">
                Welcome Back, {username}!
              </h1>
              <p className="mt-2 text-xs md:text-lg font-light font-poppins">
                We’re glad to see you again. Let’s continue your journey today!
              </p>
            </div>
            <div className="mt-6 flex justify-center items-center space-x-6">
              <Link to="/culture">
                <Button className="bg-white font-poppins text-blue-500 font-semibold rounded-full hover:bg-gray-100 md:px-8 md:py-2 transition">
                  Start Exploring
                </Button>
              </Link>
              <Link to="/about">
                <Button className="bg-blue-700 font-poppins text-white font-semibold rounded-full hover:bg-blue-600 md:px-8 md:py-2 transition">
                  Learn More
                </Button>
              </Link>
            </div>
          </Card>

          <div className="my-4">
            <div className="mb-1">
              <Text className="text-sm md:text-lg font-poppins font-semibold text-slate-800 mb-2">
                Tenun Kolok
              </Text>
            </div>
            {tenun.length > 0 && !isLoading ? (
              <div className="flex overflow-x-auto space-x-8 pb-4 custom-scrollbar">
                {tenun.map((item) => (
                  <Card
                    key={item.ID}
                    className="min-w-[200px] md:min-w-[260px] hover:scale-105 transition-all shadow-lg ease-in-out duration-500"
                    cover={
                      <div className="h-[120px] md:h-[200px]">
                        <img
                          className="object-cover h-full w-full"
                          src={`${url}/${item?.image}`}
                          alt={item.title}
                        />
                      </div>
                    }
                  >
                    <div
                      className="cursor-pointer"
                      onClick={() => handleModal(item)}
                    >
                      <Meta
                        className="text-xs md:text-base"
                        title={item.title}
                        description={
                          item.description.length >= 200
                            ? `${item.description.slice(0, 50)}...`
                            : item.description
                        }
                      />
                      <div className="flex justify-between items-center mt-1 md:mt-4">
                        <div className="">
                          <Text className="text-xs md:text-base font-poppins font-light">
                            Price:{" "}
                            <span className="font-bold text-green-600">
                              {formatToRupiah(item.price)}
                            </span>
                          </Text>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="">
                        <Text className="font-semibold font-poppins text-xs">
                          ⭐️ {item.review}
                        </Text>
                      </div>
                      <div className="">
                        <Button
                          className="hover:!text-red-800 text-xs hover:!border-red-800"
                          onClick={() => handleLike(item.ID)}
                        >
                          <HeartOutlined />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : isLoading ? (
              <Skeleton active={true} />
            ) : (
              ""
            )}

            <div className="flex justify-end  pr-2">
              <Link to="/tenun">
                <Text className="text-blue-500 underline">See all</Text>
              </Link>
            </div>
          </div>

          <div className="mb-1">
            <Text className="text-sm md:text-lg font-poppins font-semibold text-slate-800 mb-2">
              News
            </Text>
          </div>
          {/* News */}
          <div className="flex overflow-x-auto space-x-8 pb-4 custom-scrollbar">
            {news.map((item) => (
              <div className="min-w-[220px] md:min-w-[260px] hover:scale-105 transition-all shadow-lg ease-in-out duration-500">
                <div className="rounded-md h-[200px] overflow-hidden mb-3">
                  <img
                    src={`${url}/${item.image}`}
                    className="h-full w-full object-cover hover:scale-105 transition-all ease-in-out duration-500"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-2 px-2">
                  <Text className="text-xs md:text-base font-medium font-poppins">
                    {item.title}
                  </Text>
                  <Text className="text-gray-500 font-light text-[10px] md:text-xs font-poppins">
                    {`${item.description.slice(0, 100)}...`}
                  </Text>
                </div>
                <div className="mt-3 px-2">
                  <Text className="text-[8px] md:text-xs font-poppins text-slate-700">
                    {formatDate(item.CreatedAt)}
                  </Text>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end pr-2">
            <Link to="/news">
              <Text className="text-blue-500 underline">See all</Text>
            </Link>
          </div>
        </Col>
        <Col md={8} lg={8} sm={24} xs={24}>
          <Card>
            <div className="flex justify-center items-center flex-col gap-2">
              <Avatar
                src={`${url}/${photo}`}
                size={100}
                className="shadow-lg"
              />
              <div className="">
                <div className="">
                  <Text className="text-lg font-poppins text-slate-800">
                    Good {getCurrentDayPeriod()} {username}
                  </Text>
                </div>
                <div className="text-center">
                  <Text className="font-poppins font-light text-gray-400 text-xs">
                    Continue to your journey
                  </Text>
                </div>
              </div>
            </div>
            {/* Contribution Vertical Bar Chart */}
            <div className="mt-8">
              <Text className="text-base font-poppins font-semibold text-gray-800 mb-2">
                Your Contribution Overview
              </Text>
              <Card className="bg-gray-50 border-none shadow-lg rounded-lg">
                <Chart
                  options={{
                    chart: {
                      type: "donut",
                    },
                    labels: ["Posts", "Forums", "Replies"],
                    legend: {
                      position: "bottom",
                      labels: {
                        colors: "#6B7280",
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "12px",
                      },
                    },
                    colors: ["#4F46E5", "#6366F1", "#A5B4FC"],
                    dataLabels: {
                      enabled: true,
                      style: {
                        fontSize: "12px",
                        fontFamily: "Poppins, sans-serif",
                      },
                    },
                    tooltip: {
                      y: {
                        formatter: (val) => `${val} contributions`,
                      },
                    },
                  }}
                  series={[posts, forums, replies]} // Data dinamis
                  type="donut"
                  height={250}
                />
              </Card>
            </div>
            <div className="mt-6">
              <Text className="text-slate-800 font-poppins font-semibold">
                Forum Disccussion
              </Text>
              <Card className="bg-gray-50 border-none shadow-lg mt-2">
                {forum.length > 0 && !isLoading ? (
                  <List
                    grid={{
                      gutter: 10,
                      sm: 1,
                      lg: 1,
                      md: 1,
                      xl: 1,
                      xxl: 1,
                    }}
                    dataSource={forum}
                    renderItem={(item) => (
                      <List.Item>
                        <div className="flex gap-3 items-center">
                          <div className="">
                            <Avatar
                              size={40}
                              src={`${url}/${item.avatar_url}`}
                            />
                          </div>
                          <div className="">
                            <div className="flex flex-col ">
                              <Text className="text-xs font-poppins font-semibold text-slate-800">
                                {item.first_name} {item.last_name}
                              </Text>
                              <Text className="text-xs font-poppins font-light text-gray-400">
                                {item.email}
                              </Text>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          {item.tag.split(",").map((tag, index) => (
                            <Tag color={getColor(tag.trim())} key={index}>
                              {tag.trim()}
                            </Tag>
                          ))}
                        </div>
                        <Divider />
                      </List.Item>
                    )}
                  />
                ) : isLoading ? (
                  <Skeleton active />
                ) : (
                  ""
                )}
                <div className="">
                  <Link to="/forums">
                    <Button className="w-full rounded-full border-none">
                      See All
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </Card>
        </Col>
      </Row>
      <div className="mt-4">
        <Row gutter={[24, 0]}>
          <Col md={24} lg={24} xl={24}>
            <Card className="shadow-md rounded-lg md:p-6 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Video Section */}
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <ReactPlayer
                    className="rounded-lg"
                    width="100%"
                    controls
                    url={
                      "https://www.youtube.com/watch?v=lvXs53kQYk8&feature=youtu.be"
                    }
                  />
                </div>

                {/* Description Section */}
                <div className="flex flex-col gap-4">
                  <Text className="text-sm md:text-xl font-semibold text-gray-800">
                    Sejarah Desa Bengkala Buleleng Yang Di Kenal Desa Kolok,
                    Bisu dan Tuli
                  </Text>
                  <Text className="text-xs md:text-sm text-gray-600">
                    Sejarah Desa Bisu yang terletak di Buleleng yakni desa
                    bengkala, desa ini dikenal beberapa warga nya memang ada
                    komunitas kolok atau bisu tuli Namun demikian mereka tidak
                    dikucilkan oleh warga yang normal pada lainnya, benarkah
                    bisu ini disebabkan oleh mitos bahwa bisu ini adalah
                    kutukan? Simak selengkanya
                  </Text>
                  <Link to="/playlist">
                    <Button
                      type="primary"
                      className="rounded-lg text-xs md:text-base w-[100px] md:w-[160px] bg-indigo-500 hover:bg-indigo-600 border-none px-2 py-1 md:px-4 md:py-2 font-medium text-white"
                    >
                      See All Videos
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      {!isChatOpen && (
        <FloatButton
          icon={<RobotFilled className="text-white text-lg" />}
          onClick={toggleChat}
          tooltip={
            <h1 className="text-sm font-semibold text-white">Chat Bot</h1>
          }
          className="bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out"
          type=""
        />
      )}
      <ChatbotWidget isChatOpen={isChatOpen} toggleChat={toggleChat} />
    </div>
  );
};

export default Dashboard;
