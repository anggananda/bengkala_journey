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
  Select,
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
import { useNavigate } from "react-router-dom";

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
  const role = useAuth((state) => state.auth.role);
  const navigate = useNavigate();

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

  // useEffect(() => {
  //   if (id) {
  //     fetchUsers();
  //   }
  // }, [id]);

  useEffect(() => {
    if (role === "general") {
      navigate("/dashboard");
      return;
    }
    fetchUsers();
  }, [role, navigate]);

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
        open={isDrawer}
        title="Add Users"
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
                Username
              </span>
            }
            name="username"
            rules={[{ required: true, message: "username can't empty!" }]}
          >
            <Input
              placeholder="Enter username"
              style={{
                borderRadius: "8px",
                padding: "10px 12px",
                fontSize: "14px",
              }}
            />
          </Form.Item>

          {!isEdit && (
            <Form.Item
              label={
                <span style={{ fontWeight: "600", color: "#4A4A4A" }}>
                  Password
                </span>
              }
              name="password"
              rules={[{ required: true, message: "password can't empty!" }]}
            >
              <Input
                placeholder="Enter password"
                style={{
                  borderRadius: "8px",
                  padding: "10px 12px",
                  fontSize: "14px",
                }}
              />
            </Form.Item>
          )}

          <Form.Item
            label={
              <span style={{ fontWeight: "600", color: "#4A4A4A" }}>role</span>
            }
            name="role"
            rules={[{ required: true, message: "Choose role!" }]}
          >
            <Select
              placeholder="Choose role"
              allowClear
              options={[
                { label: "Admin", value: "admin" },
                { label: "General", value: "general" },
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
              // htmlType="submit"
              onClick={handleSubmit}
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
              Add user
            </Button>
          </Form.Item>
        </Form>
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
