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
} from "../../services/apiService";
import { formatDate } from "../../utils/dateUtils";
import useAuth from "../../store/useAuth";
import ModalDelete from "../../components/ModalDelete";

const { Text } = Typography;

const UserManagement = () => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [userRecord, setUserRecord] = useState(null);
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

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("username", form.getFieldValue("username"));
    formData.append("role", form.getFieldValue("role"));
    if (!isEdit) {
      formData.append("password", form.getFieldValue("password"));
    }

    try {
      if (isEdit) {
        await editUserRegister(formData, idSelected);
        notification.success({
          message: "Edit Successfully",
          description: "Success edit data users",
        });
      } else {
        await register(formData);
        notification.success({
          message: "Create Successfully",
          description: "Success create data users",
        });
      }
      form.resetFields();
      fetchUsers();
      onClose();
    } catch (error) {
      notification.error({
        message: "Failed",
        description: `Failed to modify users ${error}`,
      });
      throw error;
    }
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

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const result = await getAllUsers();
      console.log(result);
      setUsers(
        result.datas.filter(
          (item) => item.role !== "super admin" && item.ID !== id
        )
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    if (id) {
      fetchUsers();
    }
  }, [id]);

  const filteredUsers = users.filter((item) =>
    item.username.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    try {
      const result = await deleteUser(userRecord.ID);
      if (result !== 200) {
        throw new Error("Failed to delete user");
      }
      fetchUsers();
      setUserRecord(null);
      notification.success({
        message: "Delete Successfully",
        description: "Success delete data users",
      });
    } catch (error) {
      throw error;
    }
  };

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
              setUserRecord(record);
              handleModal();
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text) => text || "N/A",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
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
        height={500}
        open={isDrawer}
        onClose={onClose}
        placement="bottom"
        bodyStyle={{
          padding: "2rem",
          backgroundColor: "#f9fafb", // Light gray background
          borderRadius: "1rem 1rem 0 0",
          boxShadow: "0 -4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        }}
      >
        <div className="space-y-6">
          <Form form={form} layout="vertical" className="space-y-4">
            {/* Username Input */}
            <Form.Item
              name="username"
              label={
                <span className="text-gray-800 text-sm font-semibold">
                  Username
                </span>
              }
              rules={[
                { required: true, message: "Please enter your username" },
              ]}
            >
              <Input
                placeholder="Enter your username"
                className="rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                style={{ padding: "12px 16px" }} // Increased padding for comfort
              />
            </Form.Item>

            {/* Password Input (Conditional) */}
            {!isEdit && (
              <Form.Item
                name="password"
                label={
                  <span className="text-gray-800 text-sm font-semibold">
                    Password
                  </span>
                }
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
              >
                <Input
                  placeholder="Enter your password"
                  type="password"
                  className="rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  style={{ padding: "12px 16px" }} // Increased padding for comfort
                />
              </Form.Item>
            )}

            {/* Role Input */}
            <Form.Item
              name="role"
              label={
                <span className="text-gray-800 text-sm font-semibold">
                  Role
                </span>
              }
              rules={[{ required: true, message: "Please enter your role" }]}
            >
              <Input
                placeholder="Enter your role"
                className="rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                style={{ padding: "12px 16px" }} // Increased padding for comfort
              />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleSubmit}
                className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-300 focus:ring focus:ring-blue-300 focus:outline-none shadow-md"
                style={{
                  padding: "12px",
                  fontSize: "16px", // Larger font for better readability
                }}
              >
                Create
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Drawer>

      <ModalDelete
        subject={"User"}
        modal={modal}
        handleDelete={handleDelete}
        handleModal={handleModal}
      />

      <div className="mb-2">
        <Text className="text-slate-800 text-2xl font-semibold font-poppins">
          User Management - User Data
        </Text>
      </div>

      <div className="mb-4">
        <Text className="text-slate-800 font-poppins">
          Manage your team members and their account permissions here
        </Text>
      </div>

      <Card>
        <div className="flex justify-between items-center">
          <div className="">
            <Text className="text-lg font-poppins font-semibold text-slate-800">
              All users <span className="text-gray-500">{users.length}</span>
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
              Add User
            </Button>
          </div>
        </div>

        {users.length > 0 && !isLoading ? (
          <div className="mt-6">
            <Table
              rowKey="ID"
              dataSource={filteredUsers}
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
