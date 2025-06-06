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
  Tooltip,
  Upload,
  Select,
  Image,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  InfoCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  deleteUser,
  getAllUsers,
  editUserRegister,
  register,
  getNews,
  postNews,
  deleteNews,
  updateNews,
  getTenun,
  deleteTenun,
  updateTenun,
  postTenun,
} from "../../services/apiService";
import { formatDate } from "../../utils/dateUtils";
import useAuth from "../../store/useAuth";
import ModalDelete from "../../components/ModalDelete";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const url = import.meta.env.VITE_BASE_URL;

const TenunManagement = () => {
  const [fileList, setFileList] = useState([]);
  const [filePreview, setFilePreview] = useState(null);
  const [form] = Form.useForm();
  const [tenun, setTenun] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [tenunRecord, setTenunRecord] = useState(null);
  const [isDrawer, setIsDrawer] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [idSelected, setIdSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [previewEdit, setPreviewEdit] = useState(null);
  const role = useAuth((state) => state.auth.role);
  const navigate = useNavigate();

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
    form.setFieldValue("title", record.title);
    form.setFieldValue("description", record.description);
    form.setFieldValue("price", record.price);
    form.setFieldValue("review", record.review);
    setPreviewEdit(record.image);
  };

  const onClose = () => {
    if (isEdit) {
      form.resetFields();
      setIsEdit(false);
      setIdSelected(null);
      setFilePreview(null);
      setPreviewEdit(null);
    }
    setIsDrawer((prev) => !prev);
  };

  const fetchTenun = async () => {
    setIsLoading(true);
    try {
      const result = await getTenun();
      console.log(result.datas);
      setTenun(result.datas);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    if (role === "general") {
      navigate("/dashboard");
      return;
    }
    fetchTenun();
  }, [role, navigate]);

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj;
      setFilePreview(URL.createObjectURL(file));
    } else {
      setFilePreview(null);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", form.getFieldValue("title"));
    formData.append("description", form.getFieldValue("description"));
    formData.append("price", form.getFieldValue("price"));
    formData.append("review", form.getFieldValue("review"));
    if (fileList.length > 0) {
      formData.append("image", fileList[0].originFileObj);
    }
    console.log(formData);
    try {
      if (isEdit) {
        await updateTenun(formData, idSelected);
        notification.success({
          message: "Edit Successfully",
          description: "Success edit data users",
        });
      } else {
        await postTenun(formData);
        notification.success({
          message: "Create Successfully",
          description: "Success create data users",
        });
      }
      form.resetFields();
      setFilePreview(null)
      fetchTenun();
      onClose();
    } catch (error) {
      notification.error({
        message: "Failed",
        description: `Failed to modify users ${error}`,
      });
      throw error;
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deleteTenun(tenunRecord.ID);
      if (result !== 200) {
        throw new Error("Failed to delete user");
      }
      fetchTenun();
      setTenunRecord(null);
      notification.success({
        message: "Delete Successfully",
        description: "Success delete data users",
      });
    } catch (error) {
      throw error;
    }
  };

  const filteredTenun = tenun.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

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
              setTenunRecord(record);
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
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => text || "N/A",
    },
    {
      title: "Review",
      dataIndex: "review",
      key: "review",
      render: (text) => text || "N/A",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) =>
        (
          <div>
            <Image width={150} src={`${url}/${text}`} />
          </div>
        ) || "N/A",
    },
  ];

  return (
    <div className="p-4">
      <Drawer
        open={isDrawer}
        title="Post Tenun"
        onClose={onClose}
        placement="right"
        className="rounded-t-3xl bg-gray-50 shadow-lg"
        height="auto"
      >
        <div className="mx-auto">
          {/* Form Section */}
          <Card
            bordered={false}
            className="bg-white shadow-md rounded-lg"
            style={{ maxWidth: "500px", margin: "0 auto" }}
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
                label="Title"
                rules={[{ required: true, message: "Title is required!" }]}
              >
                <Input
                  placeholder="Enter file title"
                  className="border border-gray-300 rounded-md focus:ring focus:ring-blue-500 transition duration-200"
                />
              </Form.Item>

              {/* Description Input */}
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: "Description is required!" },
                ]}
              >
                <Input.TextArea
                  rows={3}
                  placeholder="Provide a brief description"
                  className="border border-gray-300 rounded-md focus:ring focus:ring-blue-500 transition duration-200"
                />
              </Form.Item>

              {/* Price Input */}
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: "Price is required!" }]}
              >
                <Input
                  type="number"
                  placeholder="Enter price"
                  className="border border-gray-300 rounded-md focus:ring focus:ring-blue-500 transition duration-200"
                />
              </Form.Item>

              {/* Review Input */}
              <Form.Item
                name="review"
                label="Review"
                rules={[{ required: true, message: "Review is required!" }]}
              >
                <Input.TextArea
                  rows={3}
                  placeholder="Provide a brief review"
                  className="border border-gray-300 rounded-md focus:ring focus:ring-blue-500 transition duration-200"
                />
              </Form.Item>

              {/* File Upload */}
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
              >
                <Upload
                  beforeUpload={() => false}
                  maxCount={1}
                  onChange={handleFileChange}
                  className="border-2 border-dashed border-gray-400 p-6 rounded-md flex flex-col items-center justify-center cursor-pointer transition duration-200 hover:border-blue-500"
                  showUploadList={false}
                >
                  <div className="text-center">
                    <UploadOutlined className="text-4xl text-blue-500" />
                    <p className="mt-2 text-gray-600">
                      Click or drag to upload
                    </p>
                  </div>
                </Upload>
                {filePreview ? (
                  <div className="mt-4">
                    <h4 className="font-semibold">File Preview:</h4>
                    <img
                      src={filePreview}
                      alt="File Preview"
                      className="w-full h-auto mt-2 border rounded-md shadow-sm"
                    />
                  </div>
                ) : !filePreview && isEdit ? (
                  <div className="mt-4">
                    <h4 className="font-semibold">File Preview:</h4>
                    <img
                      src={`${url}/${previewEdit}`}
                      alt="File Preview"
                      className="w-full h-auto mt-2 border rounded-md shadow-sm"
                    />
                  </div>
                ) : (
                  ""
                )}
              </Form.Item>

              {/* Submit Button */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                  <i className="fas fa-check mr-2"></i> Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Drawer>

      <ModalDelete
        subject={"Tenun"}
        modal={modal}
        handleDelete={handleDelete}
        handleModal={handleModal}
      />

      <div className="mb-2">
        <Text className="text-slate-800 text-2xl font-semibold font-poppins">
          Tenun Management - Tenun Data
        </Text>
      </div>

      <div className="mb-4">
        <Text className="text-slate-800 font-poppins">
          Manage the content of Tenun here
        </Text>
      </div>

      <Card>
        <div className="flex justify-between items-center">
          <div className="">
            <Text className="text-lg font-poppins font-semibold text-slate-800">
              All Tenun <span className="text-gray-500">{tenun.length}</span>
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
              Add Tenun
            </Button>
          </div>
        </div>

        {tenun.length > 0 && !isLoading ? (
          <div className="mt-6">
            <Table
              rowKey="ID"
              dataSource={filteredTenun}
              columns={columns}
              pagination={{
                pageSize: 5,
              }}
              bordered={false}
              size="small"
              scroll={{ x: "100%" }} // Responsif untuk data panjang
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

export default TenunManagement;
