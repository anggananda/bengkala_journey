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
  Dropdown,
} from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { fetchPlaylists } from "../../services/apiService";
import ReactPlayer from "react-player";

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
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal
  const [selectedPlaylist, setSelectedPlaylist] = useState(null); // State to hold selected playlist for modal
  const [searchItem, setSearchItem] = useState("");

  const fetchPlaylist = async () => {
    setIsLoading(true);
    try {
      const result = await fetchPlaylists();
      console.log(result);
      setPlaylists(result.datas);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, []);

  const showModal = (playlist) => {
    setSelectedPlaylist(playlist);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedPlaylist(null);
    setIsModalVisible(false);
  };

  // const filteredPlaylist = playlists.filter((item) =>
  //   item.name.toLowerCase().includes(searchItem.toLowerCase()) || selectedTags !== "all" && item.genre.toLowerCase().includes(selectedTags.toLowerCase())
  // );

  const filteredPlaylist = playlists.filter((item) => {
    const matchesName = item.name
      .toLowerCase()
      .includes(searchItem.toLowerCase());
    const matchesGenre =
      selectedTags === "all" ||
      selectedTags === "" ||
      item.genre.toLowerCase().includes(selectedTags.toLowerCase());
    return matchesName && matchesGenre;
  });

  const [selectedTags, setSelectedTags] = useState("all");

  return (
    <div className="p-4">
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
      <Select
        style={{
          width: "100%",
          borderRadius: "8px",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        }}
        placeholder="Select a tag"
        onChange={(value) => setSelectedTags(value)} // Mengatur value yang dipilih
        value={selectedTags} // Value yang dipilih
        allowClear
        options={[
          { value: "All", label: "All" },
          { value: "Traditional", label: "Traditional" },
          { value: "Education", label: "Education" },
          { value: "Ceremonial", label: "Ceremonial" },
          { value: "Others", label: "Others" },
        ]}
      />

      {playlists.length > 0 && !isLoading ? (
        <List
          grid={{
            gutter: 25,
            sm: 1,
            md: 3,
            lg: 3,
            xl: 3,
          }}
          pagination={{ pageSize: 6 }}
          dataSource={filteredPlaylist}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                className="rounded-lg shadow-lg border border-gray-200"
                cover={
                  <div className="rounded-md overflow-hidden">
                    <ReactPlayer
                      url={item.url}
                      width="100%"
                      height="200px"
                      light={item.thumbnail} // Menampilkan thumbnail sebagai placeholder
                      controls
                    />
                  </div>
                }
                onClick={() => showModal(item)}
              >
                <div className="p-2">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1 truncate">
                    <strong>Genre:</strong> {item.genre}
                  </p>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </Card>
            </List.Item>
          )}
        />
      ) : isLoading ? (
        <Skeleton active={true} />
      ) : (
        "no data"
      )}

      {/* Modal */}
      <Modal
        title={selectedPlaylist?.name}
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
        width={800}
        className="rounded-lg shadow-lg"
        centered
      >
        {selectedPlaylist && (
          <div>
            <ReactPlayer
              url={selectedPlaylist.url}
              width="100%"
              height="300px"
              controls
            />
            <p className="mt-4 text-gray-700">
              <strong>Genre:</strong> {selectedPlaylist.genre}
            </p>
            <p className="text-gray-600 mt-2">{selectedPlaylist.description}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Playlist;
