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
  Select,
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
import { useNavigate } from "react-router-dom";

const { Text } = Typography;
const { TextArea } = Input;

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
    if (role === "general") {
      navigate("/dashboard");
      return;
    }
    fetchPlaylist();
  }, [role, navigate]);

  // useEffect(() => {
  //   // if (id) {
  //     fetchPlaylist();
  //   // }
  // }, []);

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
        open={isDrawer}
        title="Tambah Forum Diskusi"
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
              <span style={{ fontWeight: "600", color: "#4A4A4A" }}>Name</span>
            }
            name="name"
            rules={[{ required: true, message: "name tidak boleh kosong!" }]}
          >
            <Input
              placeholder="Masukkan name diskusi"
              style={{
                borderRadius: "8px",
                padding: "10px 12px",
                fontSize: "14px",
              }}
            />
          </Form.Item>

          <Form.Item
            label={
              <span style={{ fontWeight: "600", color: "#4A4A4A" }}>
                description
              </span>
            }
            name="description"
            rules={[
              { required: true, message: "description tidak boleh kosong!" },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Masukkan detail diskusi"
              style={{
                resize: "none",
                borderRadius: "8px",
                padding: "10px 12px",
                fontSize: "14px",
              }}
            />
          </Form.Item>

          <Form.Item
            label={
              <span style={{ fontWeight: "600", color: "#4A4A4A" }}>genre</span>
            }
            name="genre"
            rules={[
              { required: true, message: "Pilih setidaknya satu genre!" },
            ]}
          >
            <Select
              placeholder="Pilih genre terkait"
              allowClear
              options={[
                { label: "Education", value: "Education" },
                { label: "Traditional", value: "Traditional" },
                { label: "Ceremonial", value: "Ceremonial" },
                { label: "Education", value: "Education" },
                { label: "Others", value: "Others" },
              ]}
              style={{
                borderRadius: "8px",
                fontSize: "14px",
              }}
            />
          </Form.Item>

          <Form.Item
            label={
              <span style={{ fontWeight: "600", color: "#4A4A4A" }}>url</span>
            }
            name="url"
            rules={[{ required: true, message: "url tidak boleh kosong!" }]}
          >
            <Input
              placeholder="Masukkan name diskusi"
              style={{
                borderRadius: "8px",
                padding: "10px 12px",
                fontSize: "14px",
              }}
            />
          </Form.Item>
          <Form.Item
            label={
              <span style={{ fontWeight: "600", color: "#4A4A4A" }}>
                Thumbnail
              </span>
            }
            name="thumbnail"
            rules={[
              { required: true, message: "thumbnail tidak boleh kosong!" },
            ]}
          >
            <Input
              placeholder="Masukkan name diskusi"
              style={{
                borderRadius: "8px",
                padding: "10px 12px",
                fontSize: "14px",
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
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
              Tambah Forum
            </Button>
          </Form.Item>
        </Form>
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
