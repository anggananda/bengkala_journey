import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  List,
  Button,
  Card,
  Typography,
  Avatar,
  Skeleton,
} from "antd";
import { CalendarOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { getNewsByID, getNews } from "../../services/apiService";
import { formatDate } from "../../utils/dateUtils";
const url = import.meta.env.VITE_BASE_URL;

const { Text } = Typography;

const DetailNews = () => {
  const [newsByID, setNewsByID] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [featuredLoading, setFeaturedLoading] = useState(false);
  const [newsLoading, setNewsLoading] = useState(false);
  const param = useParams();

  const fetchNewsByID = async () => {
    if (!param.id) return;
    setNewsLoading(true);
    try {
      const result = await getNewsByID(param.id);
      console.log(result.datas);
      setNewsByID(result.datas);
      setNewsLoading(false);
    } catch (error) {
      setNewsLoading(false);
      throw error;
    }
  };

  const fetchNews = async () => {
    setFeaturedLoading(true);
    try {
      const result = await getNews();
      console.log(
        result.datas.filter((item) => item.status.includes("featured"))
      );
      setFeaturedNews(
        result.datas.filter((item) => item.status.includes("featured"))
      );
      setFeaturedLoading(false);
    } catch (error) {
      setFeaturedLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    if (param.id) {
      fetchNewsByID();
    }
  }, [param]);

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);

  return (
    <div className="md:p-6" data-aos="zoom-in">
      <Row gutter={[24, 10]}>
        {!newsLoading ? (
          <Col md={16}>
            <div className="flex flex-col justify-start mb-4">
              <Text className="text-slate-800 font-semibold text-xl font-poppins">
                {newsByID.title}
              </Text>
              <div className="flex gap-2 justify-start items-center">
                <CalendarOutlined className="text-gray-400" />
                <Text className="text-gray-400 font-poppins text-sm">
                  {formatDate(newsByID.CreatedAt)}
                </Text>
              </div>
            </div>
            <div className="h-[500px] rounded-md">
              <img
                src={`${url}/${newsByID.image}`}
                alt=""
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="mt-4 text-justify">
              <Text className="text-gray-500 font-poppins font-light">
                {newsByID.description}
              </Text>
            </div>

            <div className="mt-8 flex justify-end items-center gap-2">
              <Link to="/news">
                <button className="group flex items-center gap-1">
                  <Text className="text-gray-400 group-hover:text-blue-500 transition-colors">
                    Read Another News
                  </Text>
                  <ArrowRightOutlined className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                </button>
              </Link>
            </div>
          </Col>
        ) : newsLoading ? (
          <Skeleton active={true} />
        ) : (
          ""
        )}
        <Col md={8}>
          <Text className="text-slate-800 font-semibold text-lg font-poppins">
            Featured News
          </Text>

          {featuredNews.length > 0 && !featuredLoading ? (
            <div className="">
              <List
                grid={{
                  gutter: 10,
                  sm: 1,
                  md: 1,
                  lg: 1,
                  xl: 1,
                  xxl: 1,
                }}
                dataSource={featuredNews}
                renderItem={(item) => (
                  <List.Item>
                    <Link to={`/detailnews/${item.ID}`}>
                      <div className="flex justify-start items-center gap-3">
                        <div className="">
                          <Avatar
                            src={`${url}/${item.image}`}
                            shape="square"
                            size={100}
                          />
                        </div>
                        <div className="">
                          <div className="flex gap-2 justify-start items-center">
                            <CalendarOutlined className="text-gray-400" />
                            <Text className="text-gray-400 text-xs font-poppins">
                              {formatDate(item.CreatedAt)}
                            </Text>
                          </div>
                          <Text className="text-slate-800 font-semibold font-poppins">
                            {item.title}
                          </Text>
                        </div>
                      </div>
                    </Link>
                  </List.Item>
                )}
              />
            </div>
          ) : featuredLoading ? (
            <Skeleton active={true} />
          ) : (
            ""
          )}
        </Col>
      </Row>
    </div>
  );
};

export default DetailNews;
