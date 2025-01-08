import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Skeleton,
  Typography,
  Input,
  Button,
  Tag,
  Image,
  FloatButton,
  Tooltip,
  List,
  Avatar,
  Drawer,
  Form,
  notification,
  Popconfirm,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  LikeOutlined,
  MoreOutlined,
  ShoppingCartOutlined,
  SendOutlined,
} from "@ant-design/icons";
import {
  deleteReply,
  getForumByID,
  getReply,
  postReply,
  updateReply,
} from "../../services/apiService";
import { useParams } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { formatDate } from "../../utils/dateUtils";
import useAuth from "../../store/useAuth";
const url = import.meta.env.VITE_BASE_URL

const { Text, Title } = Typography;

const DetailDiscussion = () => {
  const [form] = Form.useForm();
  const [forum, setForum] = useState([]);
  const [replies, setReplies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawer, setIsDrawer] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [idSelected, setIdSelected] = useState(null);
  const id = useParams().id;
  const userID = useAuth((state) => state.auth.id);
  const role = useAuth((state) => state.auth.role);

  const fetchForum = async () => {
    setIsLoading(true);
    try {
      const result = await getForumByID(id);
      console.log({forumsss: result});
      console.log({testinsssssg: result.datas.avatar_url});
      setForum(result.datas);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (id) {
      fetchForum();
    }
  }, [id]);

  const fetchReply = async () => {
    try {
      const result = await getReply(id);
      console.log({ replies: result.datas.filter((item) => !item.deleted_at) });
      setReplies(result.datas.filter((item) => !item.deleted_at));
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (id) {
      fetchReply();
    }
  }, [id]);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("forum_id", forum.forum_id);
    formData.append("user_id", userID);
    formData.append("content", values.content);
    console.log(formData);
    try {
      if (isEdit) {
        const result = await updateReply(formData, idSelected);
      } else {
        const result = await postReply(formData);
      }
      fetchReply();
      handleDrawer();
      notification.success({
        message: "Create Successfully",
        description: "Success create reply",
      });
      form.resetFields();
    } catch (error) {
      notification.error({
        message: "Failed",
        description: "Failed to create reply",
      });
      throw error;
    }
  };

  const handleDrawer = () => {
    setIsDrawer((prev) => !prev);
  };

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
    setIdSelected(record.id);
    form.setFieldValue("content", record.content);
    handleDrawer();
    setDropdownVisible(null);
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteReply(id);
      fetchReply();
      notification.success({
        message: "Successfully",
        description: "Success delete reply",
      });
    } catch (error) {
      notification.error({
        message: "Failed",
        description: "Failed to delete reply",
      });
      throw error;
    }
  };

  return (
    <div className="px-8 py-4">
      <Drawer onClose={() => onClose()} open={isDrawer} placement="bottom">
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name="content" label="Content">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Post Reply</Button>
          </Form.Item>
        </Form>
      </Drawer>
      <Card>
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-2">
            <Text className="text-2xl font-poppins font-semibold">
              {forum.subject}
            </Text>
            <div className="">
              <Tag color="magenta">{forum.tag}</Tag>
            </div>
          </div>
          <div className="flex justify-center items-center gap-2">
            <div className="flex flex-col justify-center items-end">
              <Text className="font-poppins">
                {forum.first_name} {forum.last_name}
              </Text>
              <Text className="text-xs font-poppins font-light text-gray-400 ">
                {forum.email}
              </Text>
            </div>
            <Avatar
              size={50}
              className="shadow-md"
              src={`${url}/${forum?.avatar_url}`}
            />
          </div>
        </div>
        <div className="my-4">
          <Text className="font-light text-gray-600 font-poppins">
            {forum.detail}
          </Text>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <Text className="text-gray-400 font-poppins font-light">
            {formatDate(forum.created_at)}
          </Text>
          <button
            onClick={() => handleDrawer()}
            className="font-poppins text-gray-400 font-light"
          >
            Reply
          </button>
        </div>
      </Card>
      <List
        className="mt-4"
        grid={{
          gutter: 16,
          md: 1,
          xs: 1,
          lg: 1,
          xl: 1,
        }}
        pagination={{ pageSize: 10 }}
        dataSource={replies}
        renderItem={(item) => (
          <List.Item>
            <Card className="ml-16">
              <div className="flex justify-between items-center">
                <div className="flex justify-center items-center gap-3">
                  <Avatar size={40} src={`${url}/${item.avatar_url}`} className="shadow-md" />
                  <div className="flex flex-col justify-center">
                    <Text className="font-poppins">
                      {item.first_name} {item.last_name}
                    </Text>
                    <Text className="text-xs font-poppins font-light text-gray-400">
                      {item.email}
                    </Text>
                  </div>
                </div>
                <div className="">
                  <Text className="font-poppins font-light text-gray-400">
                    {formatDate(item.created_at)}
                  </Text>
                </div>
              </div>
              <div className="mt-4 mx-[52px]">
                <Text className="font-light text-gray-600 font-poppins">
                  {item.content}
                </Text>
              </div>
              {item.user_id === userID ||
                      role === "admin" ||
                      role === "super admin" ? (
                        <div className="flex justify-end">
                          <MoreOutlined
                            className="text-xl cursor-pointer"
                            onClick={() =>
                              handleMoreOptionsClick(item.id)
                            }
                          />
                        </div>
                      ) : (
                        ""
                      )}
              {dropdownVisible === item.id && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-10">
                  <button
                    onClick={() => handleEdit(item)}
                    className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <EditOutlined className="mr-2" />
                    Edit
                  </button>
                  <Popconfirm
                    title="Delete the reply"
                    description="Are you sure to delete this reply?"
                    onConfirm={() => handleDelete(item.id)}
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
            </Card>
          </List.Item>
        )}
      />
      {/* <Tooltip title={"Post Response"} placement="left">
        <FloatButton icon={<PlusOutlined />} />
      </Tooltip> */}
    </div>
  );
};

export default DetailDiscussion;
