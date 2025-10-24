import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  List,
  Avatar,
  Button,
  Skeleton,
  Form,
  Input,
  Select,
  Upload,
  message,
  Drawer,
  Tooltip,
  Image,
  Dropdown,
  Carousel,
} from "antd";
import { Link } from "react-router-dom";
import {
  CalendarOutlined,
  UploadOutlined,
  InfoCircleOutlined,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { getNews, postNews } from "../../services/apiService";
import { formatDate } from "../../utils/dateUtils";
import useAuth from "../../store/useAuth";
const url = import.meta.env.VITE_BASE_URL;

const { Text } = Typography;

const News = () => {
  const [form] = Form.useForm();

  const [news, setNews] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const role = useAuth((state) => state.auth.role);
  const [search, setSearch] = useState("");

  console.log({ roleeee: role });

  const fetchNews = async () => {
    setIsLoading((prev) => !prev);
    try {
      const result = await getNews();
      console.log(result);
      setIsLoading((prev) => !prev);
      setNews(result.datas.filter((item) => item.status.includes("general")));
      setFeaturedNews(
        result.datas.filter((item) => item.status.includes("featured"))
      );
    } catch (error) {
      setIsLoading((prev) => !prev);
      throw error;
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const filteredNews = news.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="md:px-10 py-5">
      <Row gutter={[24, 0]}>
        <Col xs={24} sm={24} md={16}>
          <Carousel arrows infinite autoplay>
            {/* Card 1 */}
            <Card className="group relative bg-[url('/imgs/n1.png')] bg-cover bg-center h-[450px] hover:scale-105 hover:shadow-2xl duration-500 ease-in-out transition-all rounded-lg overflow-hidden border border-transparent hover:border-purple-500"></Card>

            {/* Card 2 */}
            <Card className="group relative bg-[url('/imgs/n2.png')] bg-cover bg-center h-[450px] hover:scale-105 hover:shadow-2xl duration-500 ease-in-out transition-all rounded-lg overflow-hidden border border-transparent hover:border-purple-500"></Card>

            {/* Card 3 */}
            <Card className="group relative bg-[url('/imgs/n3.png')] bg-cover bg-center h-[450px] hover:scale-105 hover:shadow-2xl duration-500 ease-in-out transition-all rounded-lg overflow-hidden border border-transparent hover:border-purple-500"></Card>
          </Carousel>
        </Col>

        <Col md={8}>
          <Text className="font-semibold text-slate-700 font-poppins text-lg">
            Other featured news
          </Text>
          <div className="mt-4">
            {featuredNews.length > 0 && !isLoading ? (
              <List
                grid={{
                  gutter: 10,
                  md: 1,
                  lg: 1,
                  xl: 1,
                }}
                dataSource={featuredNews}
                pagination={{ pageSize: 5 }}
                renderItem={(item) => (
                  <List.Item>
                    <Link to={`/detailnews/${item.ID}`}>
                      <div className="flex justify-start items-center gap-2">
                        <div className="">
                          <Image
                            placeholder={
                              <Image
                                preview={false}
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                                width={60}
                                height={60}
                              />
                            }
                            src={`${url}/${item.image}`}
                            width={60}
                            height={60}
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div className="flex flex-col justify-center items-start">
                          <div className="flex gap-2 justify-start items-center">
                            <CalendarOutlined className="text-gray-400" />
                            <Text className="text-gray-400 text-xs font-poppins">
                              {formatDate(item.CreatedAt)}
                            </Text>
                          </div>
                          <Text className="font-normal text-slate-600">
                            {item.title}
                          </Text>
                        </div>
                      </div>
                    </Link>
                  </List.Item>
                )}
              />
            ) : isLoading ? (
              <Skeleton active={true} />
            ) : (
              ""
            )}
          </div>
        </Col>
      </Row>
      <div className="px-4 mt-4">
        <Row
          gutter={[24, 0]}
          className="flex justify-between items-center mb-3"
        >
          <div className="px-3 flex justify-between items-center w-full">
            <div className="">
              <Text className="text-slate-800 font-semibold font-poppins text-xl">
                Recent News
              </Text>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <Input
                onChange={(e) => setSearch(e.target.value)}
                className="w-[300px] p-3 text-gray-500 font-poppins"
                placeholder="search..."
                allowClear
                prefix={<SearchOutlined />}
              />
            </div>
          </div>
        </Row>
        <Row gutter={[24, 0]} className="">
          <Col md={24}>
            {news.length > 0 && !isLoading ? (
              <List
                grid={{
                  gutter: 25,
                  sm: 1,
                  md: 3,
                  lg: 3,
                  xl: 3,
                }}
                dataSource={filteredNews}
                pagination={{ pageSize: 6 }}
                renderItem={(item) => (
                  <List.Item>
                    <Link to={`/detailnews/${item.ID}`}>
                      <div className="">
                        <div className="rounded-md h-[250px] overflow-hidden mb-3">
                          <img
                            src={`${url}/${item.image}`}
                            className="h-full w-full object-cover hover:scale-105 transition-all ease-in-out duration-500"
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Text className="text-base font-medium font-poppins">
                            {item.title}
                          </Text>
                          <Text className="text-gray-500 font-light text-xs font-poppins">
                            {`${item.description.slice(0, 100)}...`}
                          </Text>
                        </div>
                        <div className="mt-3">
                          <Text className="text-xs font-poppins text-slate-700">
                            {formatDate(item.CreatedAt)}
                          </Text>
                        </div>
                      </div>
                    </Link>
                  </List.Item>
                )}
              />
            ) : isLoading ? (
              <Skeleton active={true} />
            ) : (
              <h1>no data</h1>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default News;
