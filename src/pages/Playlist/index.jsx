import React, { useState, useEffect, useRef } from "react";
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
  Modal,
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
  SearchOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

const { Option } = Select;

const Playlist = () => {
  const playlistRef = useRef(null);
  const scrollToPlaylist = () => {
    playlistRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [form] = Form.useForm();
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawer, setIsDrawer] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [idSelected, setIdSelected] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal
  const [selectedPlaylist, setSelectedPlaylist] = useState(null); // State to hold selected playlist for modal
  const [searchItem, setSearchItem] = useState("");

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

  const showModal = (item) => {
    setSelectedPlaylist(item);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedPlaylist(null);
  };

  const extractYouTubeID = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  let filteredPlaylist = playlists.filter((item) => {
    return (
      item.play_name.toLowerCase().includes(searchItem.toLowerCase()) ||
      item.play_description.toLowerCase().includes(searchItem.toLowerCase())
    );
  });

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

      {/* Modal for playlist details */}
      <Modal
        title={selectedPlaylist ? selectedPlaylist.play_name : ""}
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
        className="rounded-lg shadow-lg"
      >
        {selectedPlaylist && (
          <div className="space-y-6">
            {/* Video Section */}
            <div className="video-container mb-4 rounded-md overflow-hidden shadow-md">
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${extractYouTubeID(
                  selectedPlaylist.play_url
                )}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-md"
              ></iframe>
            </div>

            {/* Playlist Details */}
            <div className="space-y-4">
              <p className="text-lg font-semibold text-gray-700">
                <strong>Description:</strong>
              </p>
              <p className="text-gray-600">
                {selectedPlaylist.play_description}
              </p>

              <p className="text-lg font-semibold text-gray-700">
                <strong>Genre:</strong>
              </p>
              <p className="text-gray-600">{selectedPlaylist.play_genre}</p>

              <p className="text-lg font-semibold text-gray-700">
                <strong>URL:</strong>
              </p>
              <p className="text-blue-500 hover:text-blue-700">
                <a
                  href={selectedPlaylist.play_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {selectedPlaylist.play_url}
                </a>
              </p>

              <p className="text-lg font-semibold text-gray-700">
                <strong>Thumbnail:</strong>
              </p>
              <div className="flex items-center">
                <img
                  src={selectedPlaylist.play_thumbnail}
                  alt={selectedPlaylist.play_name}
                  className="w-32 h-32 object-cover rounded-lg shadow-sm"
                />
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Hero Section Playlist */}
      <div className="mb-10">
        <div className="w-full h-[350px] rounded-lg shadow-lg grid grid-cols-2 bg-white">
          {/* Image Section */}
          <div className="bg-[url('https://img.freepik.com/free-vector/cultural-festival-concept-illustration_114360-1142.jpg?w=740&t=st=1731929204~exp=1731929804~hmac=2f3a28236551f4db435d095bb1a89ae4db963e3a4c45efb61247f316cda4fd46')] bg-cover bg-center h-full rounded-lg"></div>

          {/* Content Section */}
          <div className="flex flex-col justify-center items-center p-6 bg-white text-center rounded-lg">
            <h1 className="text-4xl font-bold text-gray-800 font-poppins">
              Explore the Rich Heritage of Bengkala
            </h1>
            <p className="mt-4 text-base text-gray-600 font-poppins">
              Immerse yourself in the traditions, culture, and stories of Desa
              Bengkala. Discover a collection of videos that bring its vibrant
              community to life.
            </p>
            {/* click watch now */}
            <Button
              type="primary"
              className="mt-6 font-poppins"
              onClick={scrollToPlaylist}
            >
              Watch Now
            </Button>
          </div>
        </div>
      </div>

      {/* Bagian playlist */}
      <div className="mb-6" ref={playlistRef} id="playlist">
        <Input
          placeholder="search playlist..."
          allowClear
          prefix={<SearchOutlined />}
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          className="p-4 border-none outline-none shadow-xl text-gray-400 "
        />
      </div>

      <div className="mb-4">
        <h2 className="text-base text-gray-500 font-poppins font-semibold">
          Playlist for you
        </h2>
      </div>

      <Row gutter={[24, 0]}>
        <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
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
              dataSource={filteredPlaylist}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    className="hover:scale-105 duration-500 ease-in-out transition-all"
                    cover={
                      <div className="h-[280px]">
                        <img
                          src={item.play_thumbnail}
                          onClick={() => showModal(item)}
                          className="cursor-pointer h-full w-full object-cover rounded-md"
                        />
                      </div>
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
                        <DeleteOutlined key="delete" />
                      </Popconfirm>,
                    ]}
                  >
                    <Meta
                      title={item.play_name}
                      description={`${item.play_description.slice(0, 100)}...`}
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
        </Col>
      </Row>
    </div>
  );
};

export default Playlist;
