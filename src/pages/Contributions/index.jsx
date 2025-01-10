import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  List,
  Carousel,
  Typography,
  FloatButton,
  notification,
  Form,
  Drawer,
  Input,
  Button,
  Select,
  Tooltip,
  Upload,
  Divider,
  Avatar,
  Popconfirm,
  Modal,
  Skeleton,
} from "antd";

import {
  CalendarOutlined,
  ArrowRightOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  InfoCircleOutlined,
  UploadOutlined,
  MoreOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  deleteContent,
  downloadContent,
  getContent,
  postContent,
  updateContent,
} from "../../services/apiService";
import useAuth from "../../store/useAuth";
import { formatDate } from "../../utils/dateUtils";
const url = import.meta.env.VITE_BASE_URL;

const { Text, Title } = Typography;

const imgs = [
  "https://plus.unsplash.com/premium_photo-1678303396234-4180231353df?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1710611228734-5273e3f1ee72?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1678303396234-4180231353df?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1710611228734-5273e3f1ee72?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const Contributions = () => {
  const userID = useAuth((state) => state.auth.id);
  const role = useAuth((state) => state.auth.role);
  const [fileList, setFileList] = useState([]);
  const [filePreview, setFilePreview] = useState(null);
  const [form] = Form.useForm();
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [contentRecord, setContentRecord] = useState(null);
  const [isDrawer, setIsDrawer] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [idSelected, setIdSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [previewEdit, setPreviewEdit] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal
  const [selectedContent, setSelectedContent] = useState(null); // State to hold selected playlist for modal

  const fetchContent = async () => {
    setIsLoading(true);
    try {
      setIsLoading(false);
      const result = await getContent();
      console.log(result);
      setContent(result.datas.filter((item) => !item.deleted_at));
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("user_id", userID);
    formData.append("name", form.getFieldValue("name"));
    formData.append("description", form.getFieldValue("description"));
    if (fileList.length > 0) {
      formData.append("image", fileList[0].originFileObj);
    }
    console.log(formData);
    try {
      if (isEdit) {
        await updateContent(formData, idSelected);
        notification.success({
          message: "Edit Successfully",
          description: "Success edit data users",
        });
      } else {
        await postContent(formData);
        notification.success({
          message: "Create Successfully",
          description: "Success create data users",
        });
      }
      form.resetFields();
      setFilePreview(null);
      fetchContent();
      onClose();
    } catch (error) {
      notification.error({
        message: "Failed",
        description: `Failed to modify users ${error}`,
      });
      throw error;
    }
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

  const showDrawer = () => {
    setIsDrawer((prev) => !prev);
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

  const handleEdit = async (record) => {
    setIsEdit(true);
    setIdSelected(record.id);
    form.setFieldValue("name", record.name);
    form.setFieldValue("description", record.description);
    setPreviewEdit(record.image);
    showDrawer();
    setDropdownVisible(null);
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteContent(id);
      fetchContent();
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

  const handleMoreOptionsClick = (id) => {
    setDropdownVisible((prev) => (prev === id ? null : id));
  };

  const filteredContent = content.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const showModal = (record) => {
    setSelectedContent(record);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedContent(null);
    setIsModalVisible(false);
  };

  const fetchDownloadContent = async (image) => {
    const filename = image.split("/").pop(); // "gambar.jpg"
    await downloadContent(filename);
  };

  return (
    <div className="">
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
                name="name"
                label="Name"
                rules={[{ required: true, message: "name is required!" }]}
              >
                <Input
                  placeholder="Enter file name"
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

              {/* File Upload */}
              <Form.Item
                name="image"
                label={
                  <span className="flex items-center">
                    Upload File&nbsp;
                    <Tooltip title="Only one file is allowed. Max size: 10MB and the extention ">
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

      <div className="relative bg-gradient-to-b from-blue-500 to-blue-300 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Carousel autoplay infinite>
            {imgs.map((img, index) => (
              <div
                className="h-[200px] md:h-[500px] overflow-hidden"
                key={index}
              >
                <img
                  src={img}
                  className="object-cover opacity-70 hover:scale-110 transition-all ease-in-out duration-500 h-full w-full brightness-50" // Darker filter
                  alt=""
                />
              </div>
            ))}
          </Carousel>
        </div>

        {/* Overlay Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center py-16 px-6">
          <h1 className="text-2xl md:text-5xl font-bold font-poppins mb-4">
            Capture Your Moments in Bengkala
          </h1>
          <p className="text-sm mt-20 md:mt-0 md:text-xl font-light max-w-2xl">
            Share the unforgettable experiences and stunning views you
            encountered during your visit. From vibrant landscapes to cultural
            highlights, immerse yourself in the essence of Bengkala through the
            lens of our community.
          </p>

          <div className="mt-16"></div>
        </div>

        {/* Decorative Element */}
        <div className="absolute bottom-0 w-full">
          <svg
            className="fill-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path d="M0,224L80,213.3C160,203,320,181,480,186.7C640,192,800,224,960,234.7C1120,245,1280,235,1360,229.3L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </div>
      <div className="mt-6 mb-4 pl-8">
        <Input
          onChange={(e) => setSearch(e.target.value)}
          className="w-[300px] p-3 text-gray-500 font-poppins"
          placeholder="search..."
          allowClear
          prefix={<SearchOutlined />}
        />
      </div>

      <div className="px-8 mb-10">
        {content.length > 0 && !isLoading ? (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-2 space-y-4">
            {filteredContent.map((item) => (
              <div
                key={item.id}
                className="relative group cursor-pointer overflow-hidden"
                onClick={() => showModal(item)}
              >
                <img
                  src={`${url}/${item.image}`}
                  alt={item.name}
                  className="w-full object-cover transition duration-300 group-hover:brightness-75"
                />

                <div className="absolute right-0 top-0 w-full p-2 bg-gradient-to-b from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.user_id === userID ||
                  role === "admin" ||
                  role === "super admin" ? (
                    <div className="flex justify-end">
                      <MoreOutlined
                        className="text-xl cursor-pointer font-bold text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMoreOptionsClick(item.id);
                        }}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {dropdownVisible === item.id && (
                    <div className="absolute right-0 bg-white border rounded shadow-lg z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(item);
                        }}
                        className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        <EditOutlined className="mr-2" />
                        Edit
                      </button>
                      <Popconfirm
                        title="Delete the Forum"
                        description="Are you sure to delete this forum?"
                        onConfirm={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                        okText="Delete"
                        cancelText="Cancle"
                      >
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <DeleteOutlined className="mr-2" />
                          Delete
                        </button>
                      </Popconfirm>
                    </div>
                  )}
                </div>

                {/* Overlay info muncul saat hover */}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex justify-between items-center w-full gap-1">
                    {/* Kiri: Avatar dan info */}
                    <div className="flex items-center">
                      <Avatar
                        className="shadow-lg w-10 h-10"
                        src={`${url}/${item.avatar_url}`}
                      />
                      <div className="text-white text-xs font-poppins">
                        <p className="font-semibold">
                          {item.first_name} {item.last_name}
                        </p>
                        <p className="text-gray-300">{item.email}</p>
                      </div>
                    </div>

                    {/* Kanan: Button */}
                    <Tooltip title="download" placement="bottom">
                      <Button
                        type="primary"
                        className="bg-slate-300 hover:!bg-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          fetchDownloadContent(item.image);
                        }}
                      >
                        <DownloadOutlined className="text-slate-600 hover:text-black hover:font-bold" />
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : isLoading ? (
          <Skeleton active={true} />
        ) : (
          ""
        )}
      </div>
      <Modal
        title={
          <div className="text-base md:text-xl font-bold font-poppins text-gray-800">
            {selectedContent?.name}
          </div>
        }
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        width={800}
        className="rounded-lg shadow-2xl"
        centered
      >
        {selectedContent && (
          <div className="p-4">
            {/* Gambar Utama */}
            <div className="h-[250px] md:h-[350px] rounded-md overflow-hidden shadow-md">
              <img
                src={`${url}/${selectedContent.image}`}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Deskripsi Konten */}
            <div className="mt-6">
              <Text className="text-gray-600 font-light font-poppins text-xs md:text-base leading-relaxed">
                {selectedContent.description}
              </Text>
            </div>
            <Divider />

            {/* Informasi Tambahan */}
            <div className="mt-4">
              <Text className="text-gray-500 font-poppins text-xs md:text-sm flex items-center">
                <CalendarOutlined className="mr-2" />{" "}
                {formatDate(selectedContent.created_at)}
              </Text>

              {/* Informasi Pengunggah */}
              <div className="flex items-center gap-4 mt-4">
                <Avatar
                  className="shadow-lg"
                  src={`${url}/${selectedContent.avatar_url}`}
                  size={50}
                />
                <div>
                  <Text className="font-semibold text-gray-800 text-xs md:text-sm font-poppins">
                    {selectedContent.first_name} {selectedContent.last_name}
                  </Text>
                  <br />
                  <Text className="text-xs text-gray-500 font-poppins">
                    {selectedContent.email}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => showDrawer()}
      />
    </div>
  );
};

export default Contributions;
