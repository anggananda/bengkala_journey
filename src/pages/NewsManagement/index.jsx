import React, { useState, useEffect } from "react";
import {
  Card,
  Skeleton,
  Table,
  Typography,
  Button,
  Input,
  Space,
  notification,
  Modal,
  Drawer,
  Form,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  deleteUser,
  getAllUsers,
  editUserRegister,
  register,
  getNews,
} from "../../services/apiService";
import { formatDate } from "../../utils/dateUtils";
import useAuth from "../../store/useAuth";
import ModalDelete from "../../components/ModalDelete";

const { Text } = Typography;

const UserManagement = () => {
  const [form] = Form.useForm();
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [newsRecord, setNewsRecord] = useState(null);
  const [isDrawer, setIsDrawer] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [idSelected, setIdSelected] = useState(null);
  const [search, setSearch] = useState("");
  const id = useAuth((state) => state.auth.id);

  const handleModal = () => {
    setModal((prev) => !prev);
  };

  const showDrawer = () => {
    setIsDrawer((prev) => !prev);
  };

  const handleDrawerEdit = (record) => {
    setIsEdit(true);
    setIsDrawer((prev) => !prev);
    setIdSelected(record.ID);
    form.setFieldValue("username", record.username);
    form.setFieldValue("role", record.role);
  };

  const onClose = () => {
    if (isEdit) {
      form.resetFields();
      setIsEdit(false);
      setIdSelected(null);
    }
    setIsDrawer((prev) => !prev);
  };

  const fetchNews = async () => {
    try {
      const result = await getNews();
      console.log(result.datas);
      setNews(result.datas);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSubmit = () => {};
  const handleDelete = () => {};

  const filteredNews = news.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  //   const handleDelete = async () => {
  //     try {
  //       const result = await deleteUser(userRecord.ID);
  //       if (result !== 200) {
  //         throw new Error("Failed to delete user");
  //       }
  //       fetchnews();
  //       setUserRecord(null);
  //       notification.success({
  //         message: "Delete Successfully",
  //         description: "Success delete data news",
  //       });
  //     } catch (error) {
  //       throw error;
  //     }
  //   };

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="normal"
            className="bg-green-800 hover:bg-green-700 text-white"
            icon={<EditOutlined />}
            onClick={() => {
              handleDrawerEdit(record);
            }}
          >
            Update
          </Button>
          <Button
            icon={<DeleteOutlined />}
            type="normal"
            className="text-white bg-red-800 hover:bg-red-700"
            onClick={() => {
              setNewsRecord(record);
              handleModal();
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
    {
      title: "Title",
      //   dataIndex: "title",
      //   key: "title",
      render: (_, record) => `${record.title.slice(0, 40)}...`,
    },
    {
      title: "Description",
      //   dataIndex: "description",
      //   key: "description",
      render: (_, record) => `${record.description.slice(0, 80)}...`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => text || "N/A",
    },
    {
      title: "Last Modified",
      render: (_, record) => formatDate(record.UpdatedAt),
    },
  ];

  return (
    <div className="p-4">
      <Drawer
        open={isDrawer}
        onClose={onClose}
        placement="bottom"
        bodyStyle={{
          padding: "2rem",
          backgroundColor: "#f9fafb", // Light gray background
          borderRadius: "1rem 1rem 0 0",
        }}
      >
        <div className="space-y-6">
          <Form form={form} layout="vertical" className="space-y-4">
            {/* Username Input */}
            <Form.Item
              name="username"
              label={
                <span className="text-gray-700 text-sm font-medium">
                  Username
                </span>
              }
              rules={[
                { required: true, message: "Please enter your username" },
              ]}
            >
              <Input
                placeholder="Enter your username"
                className="rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </Form.Item>
            {!isEdit && (
              <Form.Item
                name="password"
                label={
                  <span className="text-gray-700 text-sm font-medium">
                    password
                  </span>
                }
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
              >
                <Input
                  placeholder="Enter your password"
                  className="rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
              </Form.Item>
            )}

            {/* Role Input */}
            <Form.Item
              name="role"
              label={
                <span className="text-gray-700 text-sm font-medium">Role</span>
              }
              rules={[{ required: true, message: "Please enter your role" }]}
            >
              <Input
                placeholder="Enter your role"
                className="rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleSubmit}
                className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring focus:ring-blue-300 focus:outline-none"
              >
                Create
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Drawer>
      <ModalDelete
        modal={modal}
        handleDelete={handleDelete}
        handleModal={handleModal}
      />

      <div className="mb-2">
        <Text className="text-slate-800 text-2xl font-semibold font-poppins">
          News Management - News Data
        </Text>
      </div>

      <div className="mb-4">
        <Text className="text-slate-800 font-poppins">
          Manage the content of news here
        </Text>
      </div>

      <Card>
        <div className="flex justify-between items-center">
          <div className="">
            <Text className="text-lg font-poppins font-semibold text-slate-800">
              All news <span className="text-gray-500">{news.length}</span>
            </Text>
          </div>

          <div className="flex justify-center items-center gap-2">
            <Input
              onChange={(e) => setSearch(e.target.value)}
              className="w-[300px] p-1 text-gray-500 font-poppins"
              placeholder="search..."
              allowClear
              prefix={<SearchOutlined />}
            />
            <Button icon={<PlusOutlined />} type="primary" onClick={showDrawer}>
              Add News
            </Button>
          </div>
        </div>

        {news.length > 0 && !isLoading ? (
          <div className="mt-6">
            <Table
              rowKey="ID"
              dataSource={filteredNews}
              className="custom-ant-table"
              columns={columns}
              bordered={false}
              indentSize={3}
              pagination={{ pageSize: 6 }}
            />
          </div>
        ) : isLoading ? (
          <Skeleton active={true} />
        ) : (
          ""
        )}
      </Card>
    </div>
  );
};

export default UserManagement;
