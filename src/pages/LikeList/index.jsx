import React, { useState, useEffect } from "react";
import {
  Card,
  List,
  Typography,
  Input,
  Divider,
  Skeleton,
  Row,
  Col,
  Image,
  Button,
  notification,
  Popconfirm,
} from "antd";
import { deleteLike, getLike } from "../../services/apiService";
import useAuth from "../../store/useAuth";
import {
  HeartOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  SortDescendingOutlined,
  HeartFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import { convertReviewToStars } from "../../utils/convertReview";
import { formatToRupiah } from "../../utils/formatToRupiah";
import { redirectToWhatsApp } from "../../utils/redirectWhatsapp";
const url = import.meta.env.VITE_BASE_URL;

const { Text, Title } = Typography;

const LikeList = () => {
  const [likes, setLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const userID = useAuth((state) => state.auth.id);

  const fetchLike = async () => {
    setIsLoading(true);
    try {
      const result = await getLike();
      console.log(result.datas.filter((item) => item.user_id == userID));
      setLikes(result.datas.filter((item) => item.user_id == userID));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    if (userID) {
      fetchLike();
    }
  }, [userID]);

  const filteredLike = likes.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      const result = await deleteLike(id);
      if (result.status === 200) {
        notification.success({
          message: "Success delete tenun",
          description: "Success add tenun to list likes",
        });
      }
      fetchLike();
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="p-4">
      <Card>
        <div className="flex justify-between items-center">
          <div className="">
            <Text className="text-slate-700 font-poppins font-semibold text-lg">
              List of Kain Tenun
            </Text>
          </div>
          <div className="">
            <Input
              className="p-2 text-gray-400 w-[300px] shadow-sm !outline-none"
              allowClear
              placeholder="search tenun..."
              onChange={(e) => setSearch(e.target.value)}
              prefix={<SearchOutlined />}
            />
          </div>
        </div>
        <Divider />
        {likes.length > 0 && !isLoading ? (
          <List
            grid={{
              gutter: 10,
              sm: 1,
              xs: 1,
              lg: 1,
              xl: 1,
            }}
            dataSource={filteredLike}
            renderItem={(item) => (
              <List.Item>
                <Row gutter={[24, 0]}>
                  <Col xs={24} sm={24} md={6} className="">
                    <div className="h-[200px] w-full rounded-md">
                      <img
                        src={`${url}/${item.image}`}
                        className="!h-full !w-full !object-cover rounded-md"
                      />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={18}>
                    <div className="flex justify-between">
                      <div className="">
                        <div className="flex flex-col">
                          <Text className="font-bold text-2xl font-poppins text-gray-800 mb-4">
                            {item.title}
                          </Text>
                          <Text className="font-medium text-sm font-poppins text-gray-500 flex items-center gap-1 mb-1">
                            {convertReviewToStars(item.review)}{" "}
                            <span>({item.review})</span>
                          </Text>
                          <Text className="text-sm font-light font-poppins text-gray-600 leading-relaxed mb-2">
                            {item.description}
                          </Text>
                          <div className="text-lg font-medium font-poppins text-gray-700">
                            Price:{" "}
                            <span className="font-bold text-green-600">
                              {formatToRupiah(parseInt(item?.price))}
                            </span>
                          </div>
                          <Button
                            onClick={redirectToWhatsApp}
                            type="primary"
                            className="bg-green-600 mt-8 w-[200px] hover:!bg-green-500 border-none shadow-lg px-6 py-2 rounded-lg"
                            icon={<ShoppingCartOutlined />}
                          >
                            Buy Now
                          </Button>
                        </div>
                      </div>
                      <div className="">
                        <Popconfirm
                          title="Delete the Forum"
                          description="Are you sure to delete this forum?"
                          onConfirm={() => handleDelete(item.id)}
                          okText="Delete"
                          cancelText="Cancle"
                        >
                          <Button className="hover:!border-red-800 hover:!text-red-800">
                            <DeleteOutlined /> Delete
                          </Button>
                        </Popconfirm>
                      </div>
                    </div>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        ) : isLoading ? (
          <Skeleton active={true} />
        ) : (
          ""
        )}
      </Card>
    </div>
  );
};

export default LikeList;
