import React, { useState, useEffect } from "react";
import {
  Row,
  List,
  Card,
  Col,
  Skeleton,
  FloatButton,
  Drawer,
  Form,
  Input,
  Button,
  Select,
  notification,
  Popconfirm,
} from "antd";
import {
  deletePlaylist,
  getPlaylist,
  postPlaylist,
  updatePlaylist,
} from "../../services/utsService";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

const { Option } = Select;

const Playlist = () => {
  const [form] = Form.useForm();
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawer, setIsDrawer] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [idSelected, setIdSelected] = useState(null);

  const showDrawer = () => {
    setIsDrawer(true);
  };

  const onClose = () => {
    if (isEdit) {
      form.resetFields();
      setIsEdit(false);
      setIdSelected(null);
    }
    setIsDrawer(false);
  };

  const getPlaylists = async () => {
    setIsLoading(true);
    try {
      const result = await getPlaylist();
      console.log(result);
      setIsLoading(false);
      setPlaylists(result.datas);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("play_name", form.getFieldValue("play_name"));
    formData.append("play_genre", form.getFieldValue("play_genre"));
    formData.append("play_url", form.getFieldValue("play_url"));
    formData.append("play_description", form.getFieldValue("play_description"));
    formData.append("play_thumbnail", form.getFieldValue("play_thumbnail"));

    try {
      if (isEdit) {
        // Edit request
        await updatePlaylist(idSelected, formData);
        notification.success({
          message: "Successfully edited the playlist",
        });
      } else {
        // New post request
        await postPlaylist(formData);
        notification.success({
          message: "Successfully added new playlist",
        });
      }
      form.resetFields();
      getPlaylists();
      onClose();
    } catch (error) {
      notification.error({
        message: "Error",
        description: "There was an error processing the request",
      });
    }
  };

  const handleDrawerEdit = (record) => {
    setIsDrawer(true);
    setIsEdit(true);
    setIdSelected(record.id_play);
    form.setFieldValue("play_name", record.play_name);
    form.setFieldValue("play_description", record.play_description);
    form.setFieldValue("play_genre", record.play_genre);
    form.setFieldValue("play_url", record.play_url);
    form.setFieldValue("play_thumbnail", record.play_thumbnail);
  };

  const confirmDelete = async (item) => {
    try {
      await deletePlaylist(item.id_play);
      notification.success({
        message: "Successfully deleted playlist",
      });
      getPlaylists();
    } catch (error) {
      notification.error({
        message: "Error",
        description: "There was an error deleting the playlist",
      });
      throw error;
    }
  };

  useEffect(() => {
    getPlaylists();
  }, []);

  return (
    <div className="p-4">
      <Drawer
        extra={
          <Button
            type="primary"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition duration-300"
          >
            Post
          </Button>
        }
        title={
          <h2 className="text-xl font-semibold text-gray-700">Add New Play</h2>
        }
        width={400}
        onClose={onClose}
        open={isDrawer}
        bodyStyle={{ paddingBottom: 80, backgroundColor: "#f9fafb" }}
        className="rounded-lg shadow-lg"
      >
        <Form form={form} layout="vertical" className="space-y-4">
          {/* Play Name */}
          <Form.Item
            label={<span className="text-gray-600 font-medium">Play Name</span>}
            name="play_name"
            rules={[{ required: true, message: "Please enter the play name!" }]}
            className="mb-4"
          >
            <Input
              placeholder="e.g., Hamlet"
              className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-md transition duration-200"
            />
          </Form.Item>

          {/* Play Description */}
          <Form.Item
            label={
              <span className="text-gray-600 font-medium">
                Play Description
              </span>
            }
            name="play_description"
            rules={[
              { required: true, message: "Please enter the play description!" },
            ]}
            className="mb-4"
          >
            <Input.TextArea
              rows={4}
              placeholder="Brief description of the play"
              className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-md transition duration-200"
            />
          </Form.Item>

          {/* Play Genre */}
          <Form.Item
            label={
              <span className="text-gray-600 font-medium">Play Genre</span>
            }
            name="play_genre"
            rules={[
              { required: true, message: "Please select the play genre!" },
            ]}
            className="mb-4"
          >
            <Select
              placeholder="Select a genre"
              className="w-full border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-md transition duration-200"
            >
              <Option value="music">Music</Option>
              <Option value="song">Song</Option>
              <Option value="movie">Movie</Option>
              <Option value="education">Education</Option>
              <Option value="others">Others</Option>
            </Select>
          </Form.Item>

          {/* Play URL */}
          <Form.Item
            label={<span className="text-gray-600 font-medium">Play URL</span>}
            name="play_url"
            rules={[{ required: true, message: "Please enter the play URL!" }]}
            className="mb-4"
          >
            <Input
              placeholder="https://example.com/play"
              className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-md transition duration-200"
            />
          </Form.Item>

          {/* Play Thumbnail */}
          <Form.Item
            label={
              <span className="text-gray-600 font-medium">Play Thumbnail</span>
            }
            name="play_thumbnail"
            rules={[
              { required: true, message: "Please enter the thumbnail URL!" },
            ]}
            className="mb-4"
          >
            <Input
              placeholder="https://example.com/thumbnail.jpg"
              className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-md transition duration-200"
            />
          </Form.Item>
        </Form>
      </Drawer>
      <FloatButton
        type="primary"
        icon={<PlusCircleOutlined />}
        onClick={showDrawer}
        tooltip={<h1>Upload playlist</h1>}
      />
      <Row gutter={[24, 0]}>
        <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Card>
            {playlists.length > 0 && !isLoading ? (
              <List
                grid={{
                  gutter: 16,
                  sm: 1,
                  xs: 1,
                  md: 3,
                  lg: 3,
                  xl: 3,
                  xxl: 3,
                }}
                dataSource={playlists}
                renderItem={(item) => (
                  <List.Item>
                    <Card
                      cover={
                        <a href={item.play_url} target="_blank">
                          <div className="overflow-hidden">
                            <img
                              src={item.play_thumbnail}
                              className="hover:scale-110 transition-all ease-in-out duration-500 "
                            />
                          </div>
                        </a>
                      }
                      actions={[
                        <EditOutlined
                          key="edit"
                          onClick={() => handleDrawerEdit(item)}
                        />,
                        <Popconfirm
                          key={item.id}
                          title="Delete the task"
                          description={`Are you sure want to `}
                          onConfirm={() => confirmDelete(item)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <DeleteOutlined
                            key="delete"
                          />
                        </Popconfirm>,
                      ]}
                    >
                      <Meta
                        title={item.play_name}
                        description={item.play_description}
                      />
                    </Card>
                  </List.Item>
                )}
              />
            ) : isLoading ? (
              <Skeleton active={true} />
            ) : (
              <h1>No data</h1>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Playlist;
