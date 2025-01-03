import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Input,
  Card,
  Typography,
  List,
  Avatar,
  Image,
  Tag,
  Button,
  Tooltip,
  Drawer,
  Form,
  Select,
  Pagination,
  Dropdown,
  FloatButton,
  Skeleton,
} from "antd";

import {
  FileMarkdownOutlined,
  MessageOutlined,
  UserOutlined,
  AntDesignOutlined,
  PlusOutlined,
  SearchOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { getForums } from "../../services/apiService";

const { Text, Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const forums = [
  {
    id: 1,
    subject: "subject 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores id nostrum iure fugiat aspernatur voluptatum deserunt ducimus illo modi ut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores id nostrum iure fugiat aspernatur voluptatum deserunt ducimus illo modi ut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores id nostrum iure fugiat aspernatur voluptatum deserunt ducimus illo modi ut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores id nostrum iure fugiat aspernatur voluptatum deserunt ducimus illo modi ut?",
    img: "./imgs/angga.png",
  },
  {
    id: 2,
    subject: "subject 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores id nostrum iure fugiat aspernatur voluptatum deserunt ducimus illo modi ut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores id nostrum iure fugiat aspernatur voluptatum deserunt ducimus illo modi ut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores id nostrum iure fugiat aspernatur voluptatum deserunt ducimus illo modi ut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores id nostrum iure fugiat aspernatur voluptatum deserunt ducimus illo modi ut?",
    img: "./imgs/anggie.jpeg",
  },
  {
    id: 3,
    subject: "subject 3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores id nostrum iure fugiat aspernatur voluptatum deserunt ducimus illo modi ut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores id nostrum iure fugiat aspernatur voluptatum deserunt ducimus illo modi ut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores id nostrum iure fugiat aspernatur voluptatum deserunt ducimus illo modi ut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores id nostrum iure fugiat aspernatur voluptatum deserunt ducimus illo modi ut?",
    img: "./imgs/angga.png",
  },
  {
    id: 4,
    subject: "subject 4",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores id nostrum iure fugiat aspernatur voluptatum deserunt ducimus illo modi ut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores id nostrum iure fugiat aspernatur voluptatum deserunt ducimus illo modi ut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores id nostrum iure fugiat aspernatur voluptatum deserunt ducimus illo modi ut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores id nostrum iure fugiat aspernatur voluptatum deserunt ducimus illo modi ut?",
    img: "./imgs/anggie.jpeg",
  },
  {
    id: 5,
    subject: "subject 5",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores id nostrum iure fugiat aspernatur voluptatum deserunt ducimus illo modi ut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores id nostrum iure fugiat aspernatur voluptatum deserunt ducimus illo modi ut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores id nostrum iure fugiat aspernatur voluptatum deserunt ducimus illo modi ut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores id nostrum iure fugiat aspernatur voluptatum deserunt ducimus illo modi ut?",
    img: "./imgs/angga.png",
  },
];

const users = [
  {
    id: 1,
    img: "./imgs/angga.png",
    username: "Dwiangga",
    email: "anggadek867@gmail.com",
  },
  {
    id: 2,
    img: "./imgs/anggie.jpeg",
    username: "Anggie",
    email: "anggadek867@gmail.com",
  },
  {
    id: 3,
    img: "./imgs/angga.png",
    username: "Candra",
    email: "anggadek867@gmail.com",
  },
  {
    id: 4,
    img: "./imgs/angga.png",
    username: "Cahya",
    email: "anggadek867@gmail.com",
  },
  {
    id: 5,
    img: "./imgs/angga.png",
    username: "Yastika",
    email: "anggadek867@gmail.com",
  },
];

const DiscussionForum = () => {
  const [forums, setForums] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchForums = async () => {
    setIsLoading(true);
    try {
      const result = await getForums();
      console.log(result.datas);
      setForums(result.datas);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    fetchForums();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const onFinish = (values) => {
    console.log("Form Values:", values);
  };

  const [isDesc, setIsDesc] = useState(true);

  const [selectedTags, setSelectedTags] = useState([]);

  // Mengelola perubahan tag yang dipilih
  const handleTagChange = (value) => {
    setSelectedTags(value);
  };

  const dropdownContent = (
    <div style={{ padding: "10px", width: "400px" }}>
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="Choose tag for filter"
        onChange={handleTagChange}
        value={selectedTags}
        allowClear
      >
        <Option value="tradition">Tradition</Option>
        <Option value="history">History</Option>
        <Option value="art">Art and Culture</Option>
        <Option value="tourism">Tourism</Option>
        <Option value="others">Others</Option>
      </Select>
    </div>
  );

  return (
    <div className="overflow-hidden">
      {/* Float Button */}
      <FloatButton className="block md:hidden" icon={<PlusOutlined />} />
      {/* Form Add New Forum */}
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen((prev) => !prev)}
        placement="bottom"
        bodyStyle={{ padding: "24px", background: "#f5f5f5" }}
        height="80vh"
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Title level={3}>Tambah Forum Diskusi</Title>
        </div>
        <Form
          layout="vertical"
          onFinish={onFinish}
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Form.Item
            label="Subject"
            name="subject"
            rules={[{ required: true, message: "Subject tidak boleh kosong!" }]}
          >
            <Input placeholder="Masukkan subject diskusi" />
          </Form.Item>

          <Form.Item
            label="Deskripsi"
            name="description"
            rules={[
              { required: true, message: "Deskripsi tidak boleh kosong!" },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Masukkan deskripsi diskusi"
              style={{ resize: "none" }}
            />
          </Form.Item>

          <Form.Item
            label="Tag"
            name="tag"
            rules={[{ required: true, message: "Pilih setidaknya satu tag!" }]}
          >
            <Select
              mode="multiple"
              placeholder="Pilih tag terkait"
              allowClear
              options={[
                { label: "Adat Istiadat", value: "adat" },
                { label: "Sejarah", value: "sejarah" },
                { label: "Seni Budaya", value: "seni" },
                { label: "Wisata", value: "wisata" },
                { label: "Lainnya", value: "lainnya" },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                height: "45px",
                backgroundColor: "#1890ff",
                borderColor: "#1890ff",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Tambah Forum
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      <Row gutter={[24, 0]}>
        <Col md={16} className="md:mx-10 my-4">
          <Input
            className="p-4 text-gray-400 mb-2"
            allowClear
            placeholder="search forum..."
            prefix={<SearchOutlined />}
          />
          <Row className="mb-5 flex justify-end items-center px-2" gutter={16}>
            <Button
              className="mr-2"
              icon={
                isDesc ? <SortAscendingOutlined /> : <SortDescendingOutlined />
              }
              onClick={() => setIsDesc((prev) => !prev)}
            >
              Sort
            </Button>

            <Dropdown
              overlay={dropdownContent}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Button icon={<FilterOutlined />}>Filter</Button>
            </Dropdown>
          </Row>
          {!isLoading && forums.length > 0 ? (
            <List
              grid={{
                gutter: 10,
                md: 1,
                lg: 1,
                xl: 1,
                xxl: 1,
              }}
              dataSource={forums}
              pagination={{ pageSize: 6}}
              renderItem={(item) => (
                <List.Item>
                  <Card>
                    <Text className="text-3xl font-semibold text-slate-800 font-poppins">
                      {item.subject}
                    </Text>
                    <Row
                      gutter={[24, 0]}
                      className="flex justify-between items-center my-5"
                    >
                      <Col className="flex justify-center items-center gap-4">
                        <Avatar
                          size={50}
                          src={
                            <Image
                              src="./imgs/angga.png"
                              className="w-full h-full object-cover"
                            />
                          }
                          className="shadow-md"
                          shape="square"
                        />

                        <div className="flex flex-col justify-center items-start">
                          <Text className="font-semibold text-gray-600">
                            Username
                          </Text>
                          <Text className="font-light text-gray-400">
                            6 hours ago
                          </Text>
                        </div>
                      </Col>
                      <Col>
                        <Tag color="magenta">magenta</Tag>
                        <Tag color="red">red</Tag>
                        <Tag color="volcano">volcano</Tag>
                      </Col>
                    </Row>

                    <Text className="font-poppins font-light justify-evenly">
                      {`${item.detail.slice(0, 350)}...`}
                    </Text>

                    <Row
                      gutter={[24, 0]}
                      className="flex justify-between items-center my-5"
                    >
                      <Col className="flex justify-center items-center gap-4">
                        <Button>
                          <FileMarkdownOutlined />
                        </Button>
                        <Button>
                          <MessageOutlined /> Add Response
                        </Button>
                      </Col>
                      <Col>
                        <Avatar.Group
                          size="large"
                          max={{
                            count: 2,
                            style: {
                              color: "#f56a00",
                              backgroundColor: "#fde3cf",
                              cursor: "pointer",
                            },
                            popover: {
                              trigger: "click",
                            },
                          }}
                        >
                          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                          <Avatar
                            style={{
                              backgroundColor: "#f56a00",
                            }}
                          >
                            K
                          </Avatar>
                          <Tooltip title="Ant User" placement="top">
                            <Avatar
                              style={{
                                backgroundColor: "#87d068",
                              }}
                              icon={<UserOutlined />}
                            />
                          </Tooltip>
                          <Avatar
                            style={{
                              backgroundColor: "#1677ff",
                            }}
                            icon={<AntDesignOutlined />}
                          />
                        </Avatar.Group>
                      </Col>
                    </Row>
                  </Card>
                </List.Item>
              )}
            />
          ) : isLoading ? (
            <Skeleton active={true} />
          ) : (
            ""
          )}
        </Col>

        <Col md={6} className="">
          <Card className="my-4 hidden md:block">
            <Button
              type="primary"
              className="w-full"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <PlusOutlined /> Start a New Forum
            </Button>

            <div className="mt-4">
              <Text className="font-semibold font-poppins text-slate-600">
                User forum contributions
              </Text>
              <List
                className="mt-4"
                grid={{
                  gutter: 10,
                  sm: 1,
                  md: 1,
                  lg: 1,
                  xl: 1,
                }}
                dataSource={users}
                renderItem={(item) => (
                  <List.Item>
                    <Row>
                      <div className="flex justify-center items-center gap-4">
                        <Avatar
                          className="shadow-md"
                          size={40}
                          src={<Image src={item.img} />}
                        />
                        <div className="flex flex-col ">
                          <Text className=" text-slate-700">
                            {item.username}
                          </Text>
                          <Text className="font-light text-[12px] text-gray-400">
                            {item.email}
                          </Text>
                        </div>
                      </div>
                    </Row>
                  </List.Item>
                )}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DiscussionForum;
