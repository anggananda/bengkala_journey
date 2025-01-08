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
  Image,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  deletePlaylist,
  fetchPlaylists,
  postPlaylist,
  updatePlaylist,
} from "../../services/apiService";
import { formatDate } from "../../utils/dateUtils";
import useAuth from "../../store/useAuth";
import ModalDelete from "../../components/ModalDelete";

const { Text } = Typography;

const PlaylistManagement = () => {
  const [form] = Form.useForm();
  const [playlist, setPlaylist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [playlistRecord, setPlaylistRecord] = useState(null);
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
    formData.append("name", form.getFieldValue("name"));
    formData.append("description", form.getFieldValue("description"));
    formData.append("genre", form.getFieldValue("genre"));
    formData.append("url", form.getFieldValue("url"));
    formData.append("thumbnail", form.getFieldValue("thumbnail"));
    console.log(formData);
    try {
      if (isEdit) {
        await updatePlaylist(formData, idSelected);
        notification.success({
          message: "Edit Successfully",
          description: "Success edit data users",
        });
      } else {
        await postPlaylist(formData);
        notification.success({
          message: "Create Successfully",
          description: "Success create data users",
        });
      }
      form.resetFields();
      fetchPlaylist();
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
    form.setFieldValue("name", record.name);
    form.setFieldValue("description", record.description);
    form.setFieldValue("genre", record.genre);
    form.setFieldValue("url", record.url);
    form.setFieldValue("thumbnail", record.thumbnail);
  };

  const onClose = () => {
    if (isEdit) {
      form.resetFields();
      setIsEdit(false);
      setIdSelected(null);
    }
    setIsDrawer((prev) => !prev);
  };

  const fetchPlaylist = async () => {
    setIsLoading(true);
    try {
      const result = await fetchPlaylists();
      console.log(result);
      setPlaylist(result.datas);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    if (id) {
      fetchPlaylist();
    }
  }, [id]);

  const filteredPlaylist = playlist.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    try {
      const result = await deletePlaylist(playlistRecord.ID);
      if (result !== 200) {
        throw new Error("Failed to delete user");
      }
      fetchPlaylist();
      setPlaylistRecord(null);
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
              setPlaylistRecord(record);
              handleModal();
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
      render: (text) => text || "N/A",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => text.slice(0, 100) || "N/A",
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      render: (text) => text || "N/A",
    },
    {
      title: "Url",
      dataIndex: "url",
      key: "url",
      render: (text) => text || "N/A",
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (text) =>
        (
          <div>
            <Image src={text} />
          </div>
        ) || "N/A",
    },
    // {
    //   title: "Last Modified",
    //   render: (_, record) => formatDate(record.UpdatedAt),
    // },
  ];

  return (
    <div className="p-4">
      <Drawer
        height={500}
        open={isDrawer}
        onClose={onClose}
        placement="bottom"
        className="bg-white rounded-t-lg"
      >
        <div className="space-y-5 px-5 pb-6">
          <div className="flex justify-center">
            <div className="h-1 w-12 bg-gray-300 rounded"></div>
          </div>
          <h2 className="text-center text-lg font-medium text-gray-800">
            Add Item
          </h2>
          <Form form={form} layout="vertical" className="space-y-4">
            {/* Name Input */}
            <Form.Item
              name="name"
              label={
                <span className="text-gray-700 text-sm font-medium">Name</span>
              }
              rules={[{ required: true, message: "Please enter the name" }]}
            >
              <Input
                placeholder="e.g., Cool Item"
                className="rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-all"
                style={{ padding: "10px" }}
              />
            </Form.Item>

            {/* Description Input */}
            <Form.Item
              name="description"
              label={
                <span className="text-gray-700 text-sm font-medium">
                  Description
                </span>
              }
              rules={[{ required: true, message: "Please add a description" }]}
            >
              <Input.TextArea
                placeholder="Write something here..."
                rows={3}
                className="rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-all"
                style={{ padding: "10px" }}
              />
            </Form.Item>

            {/* Genre Input */}
            <Form.Item
              name="genre"
              label={
                <span className="text-gray-700 text-sm font-medium">Genre</span>
              }
              rules={[{ required: true, message: "Please enter a genre" }]}
            >
              <Input
                placeholder="e.g., Adventure"
                className="rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-all"
                style={{ padding: "10px" }}
              />
            </Form.Item>

            {/* URL Input */}
            <Form.Item
              name="url"
              label={
                <span className="text-gray-700 text-sm font-medium">URL</span>
              }
              rules={[
                {
                  required: true,
                  message: "Please enter a valid URL",
                  type: "url",
                },
              ]}
            >
              <Input
                placeholder="https://example.com"
                className="rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-all"
                style={{ padding: "10px" }}
              />
            </Form.Item>

            {/* Thumbnail Input */}
            <Form.Item
              name="thumbnail"
              label={
                <span className="text-gray-700 text-sm font-medium">
                  Thumbnail
                </span>
              }
              rules={[{ required: true, message: "Thumbnail is required" }]}
            >
              <Input
                placeholder="Paste thumbnail link"
                className="rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-all"
                style={{ padding: "10px" }}
              />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                type="primary"
                onClick={handleSubmit}
                className="w-full rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all"
                style={{ padding: "12px" }}
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Drawer>

      <ModalDelete
        subject={"Playlist"}
        modal={modal}
        handleDelete={handleDelete}
        handleModal={handleModal}
      />

      <div className="mb-2">
        <Text className="text-slate-800 text-2xl font-semibold font-poppins">
          Playlist Management - Playlist Data
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
              All Playlist{" "}
              <span className="text-gray-500">{playlist.length}</span>
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
              Add Playlist
            </Button>
          </div>
        </div>

        {playlist.length > 0 && !isLoading ? (
          <div className="mt-6">
            <Table
              rowKey="ID"
              dataSource={filteredPlaylist}
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

export default PlaylistManagement;
