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
} from "@ant-design/icons";
import { getNews, postNews } from "../../services/apiService";
import { formatDate } from "../../utils/dateUtils";
import useAuth from "../../store/useAuth";
const url = import.meta.env.VITE_BASE_URL;

const { Text } = Typography;
const { Meta } = Card;
const { TextArea } = Input;

const News = () => {
  const [isDrawer, setIsDrawer] = useState(false);
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState([]);
  const [filePreview, setFilePreview] = useState(null);

  const [news, setNews] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const role = useAuth((state) => state.auth.role);

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

  const handleDrawer = () => {
    setIsDrawer((prev) => !prev);
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj;
      setFilePreview(URL.createObjectURL(file));
    } else {
      setFilePreview(null);
    }
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("status", values.status);
    if (fileList.length > 0) {
      formData.append("image", fileList[0].originFileObj);
    }

    try {
      const response = await postNews(formData);
      message.success("File uploaded successfully!");
      fetchNews();
      handleDrawer();
      form.resetFields();
      setFileList([]);
      setFilePreview(null);
    } catch (error) {
      // message.error(
      //   error.response?.data?.error || "Failed to submit the form!"
      // );
      console.log(error);
      throw error;
    }
  };

  return (
    <div className="md:px-10 py-5">
      <Drawer
        open={isDrawer}
        height={600}
        onClose={() => handleDrawer()}
        placement="bottom"
      >
        <div className="max-w-md mx-auto p-5">
          <Card
            title={
              <h3 className="text-lg font-bold text-gray-800">
                Upload File Form
              </h3>
            }
            bordered={false}
            className="rounded-xl shadow-lg bg-white"
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{ status: "general" }}
            >
              {/* Title Input */}
              <Form.Item
                name="title"
                label={
                  <span className="flex items-center">
                    Title&nbsp;
                    <Tooltip title="Give your file a descriptive title">
                      <InfoCircleOutlined className="text-gray-500" />
                    </Tooltip>
                  </span>
                }
                rules={[{ required: true, message: "Please input the title!" }]}
              >
                <Input
                  placeholder="E.g., Annual Report 2024"
                  className="rounded-md border-gray-300 focus:ring focus:ring-blue-500 focus:border-blue-500"
                />
              </Form.Item>

              {/* Description Input */}
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: "Please input the description!" },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Write a brief description of the file..."
                  className="rounded-md border-gray-300 focus:ring focus:ring-blue-500 focus:border-blue-500"
                />
              </Form.Item>

              {/* Status Input */}
              <Form.Item
                name="status"
                label="Status"
                rules={[
                  { required: true, message: "Please input the status!" },
                ]}
              >
                <Input
                  placeholder=""
                  className="rounded-md border-gray-300 focus:ring focus:ring-blue-500 focus:border-blue-500"
                />
              </Form.Item>

              {/* Drag and Drop File Upload */}
              <Form.Item
                name="image"
                label={
                  <span className="flex items-center">
                    Upload File&nbsp;
                    <Tooltip title="Only one file is allowed. Max size: 10MB">
                      <InfoCircleOutlined className="text-gray-500" />
                    </Tooltip>
                  </span>
                }
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                rules={[{ required: true, message: "Please upload a file!" }]}
              >
                <Upload
                  beforeUpload={() => false}
                  maxCount={1}
                  onChange={handleFileChange}
                  className="border-2 border-dashed border-gray-400 p-6 rounded-md flex flex-col items-center justify-center cursor-pointer"
                  showUploadList={false} // Hide default file list
                >
                  <div className="text-center">
                    <UploadOutlined className="text-4xl text-blue-500" />
                    <p className="mt-2 text-gray-600">
                      Drag & drop your file here, or click to select one
                    </p>
                  </div>
                </Upload>
                {filePreview && (
                  <div className="mt-4">
                    <h4 className="font-semibold">File Preview:</h4>
                    <img
                      src={filePreview}
                      alt="File Preview"
                      className="w-full h-auto mt-2 border rounded-md"
                    />
                  </div>
                )}
              </Form.Item>

              {/* Submit Button */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Drawer>

      <Row gutter={[24, 0]}>
        <Col xs={24} sm={24} md={16}>
          <Carousel arrows infinite autoplay>
            <Card className="bg-[url('https://images.unsplash.com/photo-1531778272849-d1dd22444c06?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJhbGl8ZW58MHx8MHx8fDA%3D')] bg-cover bg-center h-[410px] hover:scale-105 duration-500 ease-in-out transition-all"></Card>
            <Card className="bg-[url('https://images.unsplash.com/photo-1531778272849-d1dd22444c06?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJhbGl8ZW58MHx8MHx8fDA%3D')] bg-cover bg-center h-[410px] hover:scale-105 duration-500 ease-in-out transition-all"></Card>
            <Card className="bg-[url('https://images.unsplash.com/photo-1531778272849-d1dd22444c06?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJhbGl8ZW58MHx8MHx8fDA%3D')] bg-cover bg-center h-[410px] hover:scale-105 duration-500 ease-in-out transition-all"></Card>
            <Card className="bg-[url('https://images.unsplash.com/photo-1531778272849-d1dd22444c06?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJhbGl8ZW58MHx8MHx8fDA%3D')] bg-cover bg-center h-[410px] hover:scale-105 duration-500 ease-in-out transition-all"></Card>
            <Card className="bg-[url('https://images.unsplash.com/photo-1531778272849-d1dd22444c06?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJhbGl8ZW58MHx8MHx8fDA%3D')] bg-cover bg-center h-[410px] hover:scale-105 duration-500 ease-in-out transition-all"></Card>
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
          <Text className="text-slate-800 font-semibold font-poppins text-xl">
            Recent News
          </Text>
          <div className="flex gap-2 justify-center items-center">
            <Button>All News</Button>

            <Button onClick={() => handleDrawer()} type="primary">
              Post News
            </Button>
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
                dataSource={news}
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
