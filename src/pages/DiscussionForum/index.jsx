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
  Popconfirm,
  notification,
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
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import {
  deleteForum,
  getAllReply,
  getContribute,
  getForums,
  postForum,
  updateForum,
} from "../../services/apiService";
import useAuth from "../../store/useAuth";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/dateUtils";
const url = import.meta.env.VITE_BASE_URL;

const { Text, Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const DiscussionForum = () => {
  const [form] = Form.useForm();
  const [forums, setForums] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userID = useAuth((state) => state.auth.id);
  const role = useAuth((state) => state.auth.role);
  const [isOpen, setIsOpen] = useState(false);
  const [isDesc, setIsDesc] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchForum, setSearchForum] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [idSelected, setIdSelected] = useState(null);
  const [contribute, setContribute] = useState([]);
  const [isContribute, setIsContribute] = useState(false);
  const [reply, setReply] = useState([]);

  const tagColors = {
    adat: "gold",
    sejarah: "blue",
    seni: "purple",
    wisata: "green",
    lainnya: "gray",
  };

  const fetchForums = async () => {
    setIsLoading(true);
    try {
      const result = await getForums();
      const filteredForums = result.datas.filter((item) => !item.deleted_at);
      setForums(sortForums(filteredForums, isDesc));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const sortForums = (data, isDescending) => {
    return data.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return isDescending ? dateB - dateA : dateA - dateB;
    });
  };

  const toggleSortOrder = () => {
    setIsDesc((prev) => !prev);
    setForums(sortForums([...forums], !isDesc));
  };

  const fetchContribute = async () => {
    setIsContribute(true);
    try {
      const result = await getContribute(); // Mengambil data dari API
      console.log({ testing: result });

      // Filter untuk menghapus duplikat berdasarkan username
      const uniqueData = Array.from(
        new Map(result.datas.map((item) => [item.username, item])).values()
      );

      // Masukkan data tanpa duplikat ke state
      setContribute(uniqueData);
      setIsContribute(false);
    } catch (error) {
      setIsContribute(false);
      console.error("Error fetching contributions:", error);
      throw error;
    }
  };

  const fetchReply = async () => {
    try {
      const result = await getAllReply();
      console.log({ testbang: result });

      // Create a unique array based on forum_id and user_id
      const uniqueData = Array.from(
        new Map(
          result.datas.map((item) => [`${item.forum_id}_${item.user_id}`, item])
        ).values()
      );

      // Filter out replies that have deleted_at not empty
      const filteredReplies = uniqueData.filter(
        (item) => item.deleted_at === ""
      );

      // Set the filtered replies to state
      setReply(filteredReplies);
    } catch (error) {
      console.error("Error fetching replies:", error);
    }
  };

  useEffect(() => {
    fetchContribute();
  }, []);

  useEffect(() => {
    fetchForums();
  }, []);

  useEffect(() => {
    fetchReply();
  }, []);

  const postNewForum = async (values) => {
    const formData = new FormData();
    formData.append("subject", values.subject);
    formData.append("detail", values.detail);
    formData.append("tag", values.tag);
    formData.append("user_id", userID);
    try {
      if (isEdit) {
        const result = await updateForum(formData, idSelected);
      } else {
        const result = await postForum(formData);
      }
      setIsOpen(false);
      fetchForums();
      notification.success({
        message: "Successfully",
        description: "Success sumbit forum",
      });
      form.resetFields();
    } catch (error) {
      notification.error({
        message: "Failed",
        description: "Failed submit forum",
      });
      throw error;
    }
  };

  const handleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  // Mengelola perubahan tag yang dipilih
  const handleTagChange = (value) => {
    setSelectedTags(value);
  };

  const filteredForums = forums.filter((item) =>
    item.subject.toLowerCase().includes(searchForum.toLowerCase())
  );

  const onClose = () => {
    if (isEdit) {
      form.resetFields();
      setIsEdit(false);
      setIdSelected(null);
    }
    handleDrawer();
  };

  const handleMoreOptionsClick = (id) => {
    setDropdownVisible((prev) => (prev === id ? null : id));
  };

  const handleEdit = async (record) => {
    setIsEdit(true);
    setIdSelected(record.forum_id);
    form.setFieldValue("subject", record.subject);
    form.setFieldValue("detail", record.subject);
    form.setFieldValue("tag", record.tag);
    handleDrawer();
    setDropdownVisible(null);
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteForum(id);
      fetchForums();
      notification.success({
        message: "Successfully",
        description: "Success delete forum",
      });
    } catch (error) {
      notification.error({
        message: "Failed",
        description: "Failed to delete forum",
      });
      throw error;
    }
  };

  const getColor = (tag) => {
    return tagColors[tag.toLowerCase()] || "red";
  };

  return (
    <div className="overflow-hidden">
      {/* Float Button */}
      <FloatButton
        onClick={() => setIsOpen((prev) => !prev)}
        className="block md:hidden"
        icon={<PlusOutlined />}
      />
      {/* Form Add New Forum */}
      <Drawer
        open={isOpen}
        title="Tambah Forum Diskusi"
        onClose={() => onClose()}
        placement="right"
        bodyStyle={{
          padding: "24px",
          background: "#f9fafb",
          color: "#333",
          borderLeft: "1px solid #e0e0e0",
        }}
        height="80vh"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={postNewForum}
          style={{
            background: "#fff",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Form.Item
            label={
              <span style={{ fontWeight: "600", color: "#4A4A4A" }}>
                Subject
              </span>
            }
            name="subject"
            rules={[{ required: true, message: "Subject tidak boleh kosong!" }]}
          >
            <Input
              placeholder="Masukkan subject diskusi"
              style={{
                borderRadius: "8px",
                padding: "10px 12px",
                fontSize: "14px",
              }}
            />
          </Form.Item>

          <Form.Item
            label={
              <span style={{ fontWeight: "600", color: "#4A4A4A" }}>
                Detail
              </span>
            }
            name="detail"
            rules={[{ required: true, message: "Detail tidak boleh kosong!" }]}
          >
            <TextArea
              rows={4}
              placeholder="Masukkan detail diskusi"
              style={{
                resize: "none",
                borderRadius: "8px",
                padding: "10px 12px",
                fontSize: "14px",
              }}
            />
          </Form.Item>

          <Form.Item
            label={
              <span style={{ fontWeight: "600", color: "#4A4A4A" }}>Tag</span>
            }
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
              style={{
                borderRadius: "8px",
                fontSize: "14px",
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                height: "45px",
                backgroundColor: "#1677ff",
                borderColor: "#1677ff",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "8px",
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
            onChange={(e) => setSearchForum(e.target.value)}
            prefix={<SearchOutlined />}
          />
          <Row className="mb-5 flex justify-end items-center px-2" gutter={16}>
            <Tooltip title={isDesc ? "z-a" : "a-z"} placement="right">
              <Button
                className="mr-2"
                icon={
                  isDesc ? (
                    <SortDescendingOutlined />
                  ) : (
                    <SortAscendingOutlined />
                  )
                }
                onClick={toggleSortOrder}
              >
                Sort
              </Button>
            </Tooltip>
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
              dataSource={filteredForums}
              pagination={{ pageSize: 6 }}
              renderItem={(item) => (
                <List.Item>
                  <Card>
                    <div className="flex justify-between items-center">
                      <Text className="text-lg md:text-3xl font-semibold text-slate-800 font-poppins">
                        {item.subject}
                      </Text>

                      {item.user_id === userID ||
                      role === "admin" ||
                      role === "super admin" ? (
                        <div className="flex justify-end">
                          <MoreOutlined
                            className="text-xl cursor-pointer"
                            onClick={() =>
                              handleMoreOptionsClick(item.forum_id)
                            }
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      {dropdownVisible === item.forum_id && (
                        <div className="absolute right-0 mt-32 bg-white border rounded shadow-lg z-10">
                          <button
                            onClick={() => handleEdit(item)}
                            className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <EditOutlined className="mr-2" />
                            Edit
                          </button>
                          <Popconfirm
                            title="Delete the Forum"
                            description="Are you sure to delete this forum?"
                            onConfirm={() => handleDelete(item.forum_id)}
                            okText="Delete"
                            cancelText="Cancle"
                          >
                            <button className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                              <DeleteOutlined className="mr-2" />
                              Delete
                            </button>
                          </Popconfirm>
                        </div>
                      )}
                    </div>
                    <Row
                      gutter={[24, 0]}
                      className="flex justify-between items-center my-5"
                    >
                      <Col className="flex justify-center items-center gap-4">
                        <Avatar
                          size={50}
                          src={`${url}/${item.avatar_url}`}
                          className="shadow-md"
                          // shape="square"
                        />

                        <div className="flex flex-col justify-center items-start">
                          <Text className="text-xs md:text-base font-semibold text-gray-600">
                            {item.first_name} {item.last_name}
                          </Text>
                          <Text className="text-xs md:text-base font-light text-gray-400">
                            {formatDate(item.created_at)}
                          </Text>
                        </div>
                      </Col>
                      <Col className="mt-2 md:mt-0">
                        {item.tag.split(",").map((tag, index) => (
                          <Tag color={getColor(tag.trim())} key={index}>
                            {tag.trim()}
                          </Tag>
                        ))}
                      </Col>
                    </Row>

                    <Text className="text-xs md:text-base font-poppins font-light justify-evenly">
                      {`${
                        item.detail.length >= 1000
                          ? `${item.detail.slice(0, 1000)}...`
                          : item.detail.slice(0, 1000)
                      }`}
                    </Text>

                    <Row
                      gutter={[24, 0]}
                      className="flex justify-between items-center my-5"
                    >
                      <Col className="flex justify-center items-center gap-4">
                        <Link to={`/detail-forums/${item.forum_id}`}>
                          <Button className="text-xs md:text-base">
                            <MessageOutlined /> Add Response
                          </Button>
                        </Link>
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
                          {reply
                            .filter((user) => user.forum_id === item.forum_id) // Filter reply berdasarkan forum_id
                            .map((user, index) => (
                              <Tooltip
                                title={user.first_name}
                                key={index}
                                placement="top"
                              >
                                <Avatar
                                  style={{
                                    backgroundColor: user.color || "#1677ff", // Warna default jika tidak ada warna
                                  }}
                                  src={
                                    user.avatar_url
                                      ? `${url}/${user.avatar_url}`
                                      : null
                                  } // URL avatar jika tersedia
                                  icon={!user.avatar_url && <UserOutlined />} // Ikon default jika avatar kosong
                                >
                                  {!user.avatar_url && user.first_name?.[0]}{" "}
                                  {/* Tampilkan inisial jika avatar kosong */}
                                </Avatar>
                              </Tooltip>
                            ))}
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

        <Col md={6} className="mr-4">
          <Card className="my-4 mr-4 hidden md:block">
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
              {contribute.length > 0 && !isContribute ? (
                <List
                  className="mt-4"
                  grid={{
                    gutter: 10,
                    sm: 1,
                    md: 1,
                    lg: 1,
                    xl: 1,
                  }}
                  dataSource={contribute}
                  renderItem={(item) => (
                    <List.Item>
                      <Row>
                        <div className="flex justify-center items-center gap-4">
                          <Avatar
                            className="shadow-md"
                            size={40}
                            src={<Image src={`${url}/${item.avatar_url}`} />}
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
              ) : isContribute ? (
                <Skeleton active={true} />
              ) : (
                "no data"
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DiscussionForum;
