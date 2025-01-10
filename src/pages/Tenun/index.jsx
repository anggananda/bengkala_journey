import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  List,
  Image,
  Input,
  Modal,
  Skeleton,
  notification,
} from "antd";
import {
  HeartOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  SortDescendingOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { getTenun, postLike } from "../../services/apiService";
import { formatToRupiah } from "../../utils/formatToRupiah";
import { convertReviewToStars } from "../../utils/convertReview";
import useAuth from "../../store/useAuth";
import { redirectToWhatsApp } from "../../utils/redirectWhatsapp";
const url = import.meta.env.VITE_BASE_URL;

const { Text, Title } = Typography;

const { Meta } = Card;

const Tenun = () => {
  const [isModal, setIsModal] = useState(false);
  const [tenun, setTenun] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedTenun, setSelectedTenun] = useState(null);
  const userID = useAuth((state) => state.auth.id);

  const fetchTenun = async () => {
    setIsLoading(true);
    try {
      const result = await getTenun();
      console.log(result);
      setTenun(result.datas);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    fetchTenun();
  }, []);

  const handleLike = async (tenunId) => {
    const formData = new FormData();
    if (userID) {
      formData.append("user_id", userID);
      formData.append("tenun_id", tenunId);
      try {
        const result = await postLike(formData);
        notification.success({
          message: "Success add to likes",
          description: "Success add tenun to list likes",
        });
      } catch (error) {
        notification.error({
          message: "Tenun is already exis",
          description: "tenun is already exis in list likes",
        });
        throw error;
      }
    }
  };

  const handleModal = (record) => {
    setIsModal((prev) => !prev);
    setSelectedTenun(record);
  };

  const filteredTenun = tenun.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const highestReview = Math.max(...tenun.map((item) => item.review));

  // Filter tenun dengan review tertinggi
  const mostPopular = tenun
    .filter((item) => item.review === highestReview)
    .slice(0, 1);

  console.log({ search: search });
  console.log({ mostPopular: mostPopular });

  return (
    <div className="">
      <Modal
        onCancel={() => setIsModal((prev) => !prev)}
        title={
          <span className="font-semibold text-xl font-poppins">
            Details Tenun Kolok
          </span>
        }
        open={isModal}
        footer={null}
        width={800}
        className="rounded-lg shadow-2xl animate-fade-in"
        centered
      >
        {selectedTenun && (
          <Row gutter={[24, 16]}>
            <Col xs={24} sm={24} md={12}>
              <Card
                style={{
                  backgroundImage: `url("${url}/${selectedTenun?.image}")`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                className="h-[400px] border-none"
              />
            </Col>
            <Col xs={24} sm={24} md={12}>
              <div className="space-y-4">
                <Text className="font-bold text-2xl font-poppins text-gray-800">
                  {selectedTenun.title}
                </Text>
                <Text className="font-medium text-sm font-poppins text-gray-500 flex items-center gap-1">
                  {convertReviewToStars(selectedTenun.review)}{" "}
                  <span>({selectedTenun.review})</span>
                </Text>
                <Text className="text-sm font-light font-poppins text-gray-600 leading-relaxed">
                  {selectedTenun.description}
                </Text>
                <div className="text-lg font-medium font-poppins text-gray-700">
                  Price:{" "}
                  <span className="font-bold text-green-600">
                    {formatToRupiah(selectedTenun?.price)}
                  </span>
                </div>
                <div className="mt-6 flex gap-4">
                  <Button
                    onClick={redirectToWhatsApp}
                    type="primary"
                    className="bg-green-600 hover:!bg-green-500 border-none shadow-lg px-6 py-2 rounded-lg"
                    icon={<ShoppingCartOutlined />}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Modal>

      <div className="p-8">
        <div className="">
          <Text className="text-xl font-poppins font-semibold">
            Batik and Kain Tenun
          </Text>
        </div>
        <div className="mb-4">
          <Text className=" font-poppins font-light">Batik and Kain Tenun</Text>
        </div>
        <Row gutter={[24, 0]}>
          {mostPopular.map((popular) => (
            <Col xs={24} sm={24} md={16} className="hidden md:block">
              <Card className="h-[300px] hover:scale-105 duration-500 ease-in-out transition-all">
                <Row gutter={[24, 0]}>
                  <Col xs={24} sm={24} md={12}>
                    <Card
                      style={{
                        backgroundImage: `url("${url}/${popular?.image}")`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                      className="h-[250px] border-none"
                    />
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <div className="">
                      <Text className="font-semibold text-lg font-poppins">
                        {popular?.title}
                      </Text>
                    </div>
                    <div className="">
                      <Text className="font-light font-poppins text-xs">
                        {convertReviewToStars(popular.review)} ({popular.review}
                        )
                      </Text>
                    </div>
                    <div className="mb-2">
                      <Text className="text-xs font-light font-poppins">
                        {popular.description.length >= 200
                          ? `${popular.description.slice(0, 200)}...`
                          : popular.description}
                      </Text>
                    </div>
                    <div className="">
                      <Text className="font-poppins font-light">
                        Price:{" "}
                        <span className="font-bold text-green-600">
                          {formatToRupiah(popular.price)}
                        </span>
                      </Text>
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <Button
                        className="hover:!text-red-800 hover:!border-red-800"
                        onClick={() => handleLike(popular.ID)}
                      >
                        <HeartOutlined />
                      </Button>
                      <Button
                        type="normal"
                        className="bg-green-600 hover:bg-green-500 text-white"
                      >
                        <ShoppingCartOutlined /> Buy Now
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}

          <Col xs={24} sm={24} md={8}>
            <Card className="bg-[url('./imgs/tenun.png')] bg-cover bg-center brightness-50 shadow-xl h-[250px] hover:scale-105 duration-500 ease-in-out transition-all  from-sky-200 via-blue-300 to-indigo-400 rounded-lg flex flex-col justify-between p-4"></Card>
          </Col>
        </Row>
      </div>
      <div className="mt-4 px-8 flex flex-col gap-6">
        <div className="flex items-center justify-end">
          <div className="">
            <Input
              className="p-2 text-gray-400 w-[300px] shadow-lg"
              allowClear
              placeholder="search tenun..."
              onChange={(e) => setSearch(e.target.value)}
              prefix={<SearchOutlined />}
            />
          </div>
        </div>

        {tenun.length > 0 && !isLoading ? (
          <List
            grid={{
              gutter: 20,
              md: 1,
              lg: 4,
              xl: 4,
            }}
            dataSource={filteredTenun}
            renderItem={(item) => (
              <List.Item>
                <Card
                  className="hover:scale-105 transition-all shadow-lg ease-in-out duration-500"
                  cover={
                    <div>
                      <Image src={`${url}/${item?.image}`} />
                    </div>
                  }
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => handleModal(item)}
                  >
                    <Meta
                      title={item.title}
                      description={
                        item.description.length >= 200
                          ? `${item.description.slice(0, 200)}...`
                          : item.description
                      }
                    />
                    <div className="flex justify-between items-center mt-4">
                      <div className="">
                        <Text className="font-poppins font-light">
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
              </List.Item>
            )}
          />
        ) : isLoading ? (
          <Skeleton active={true} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Tenun;
