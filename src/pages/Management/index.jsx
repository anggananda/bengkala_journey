import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  ReadOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import {
  fetchPlaylists,
  getAllUsers,
  getNews,
} from "../../services/apiService";
import useAuth from "../../store/useAuth";

const { Title, Text } = Typography;

const managements = [
  {
    id: 1,
    path: "/users-management",
    title: "Management Users",
    description: "Manage and organize user accounts effectively.",
    icon: <UserOutlined style={{ fontSize: "36px", color: "#fff" }} />,
    gradient: "linear-gradient(135deg, #FF6B6B, #FFD93D)",
  },
  {
    id: 2,
    path: "/news-management",
    title: "Management News",
    description: "Create and update news content seamlessly.",
    icon: <ReadOutlined style={{ fontSize: "36px", color: "#fff" }} />,
    gradient: "linear-gradient(135deg, #1D976C, #93F9B9)",
  },
  {
    id: 3,
    path: "/playlist-management",
    title: "Management Playlist",
    description: "Curate and maintain media playlists efficiently.",
    icon: <PlayCircleOutlined style={{ fontSize: "36px", color: "#fff" }} />,
    gradient: "linear-gradient(135deg, #4D9FEC, #928DAB)",
  },
  {
    id: 4,
    path: "/tenun-management",
    title: "Management Tenun",
    description: "Curate and maintain tenun efficiently.",
    icon: <PlayCircleOutlined style={{ fontSize: "36px", color: "#fff" }} />,
    gradient: "linear-gradient(135deg, #4D9FEC, #928DAB)",
  },
];

const Management = () => {
  const [news, setNews] = useState([]);
  const [users, setUsers] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();
  const role = useAuth((state) => state.auth.role);

  const fetchUsers = async () => {
    try {
      const result = await getAllUsers();
      setUsers(result.datas);
    } catch (error) {
      throw error;
    }
  };
  const fecthNews = async () => {
    try {
      const result = await getNews();
      setNews(result.datas);
    } catch (error) {
      throw error;
    }
  };
  const fecthPlaylist = async () => {
    try {
      const result = await fetchPlaylists();
      setPlaylists(result.datas);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (role === "general") {
      navigate("/dashboard");
      return;
    }
    fetchUsers();
    fecthNews();
    fecthPlaylist();
  }, [role]);

  return (
    <div className="overflow-hidden p-4">
      {/* Header */}
      <div className="mb-6 text-center">
        <Title level={2} style={{ fontWeight: "bold", color: "#444" }}>
          Dashboard Management - Admin
        </Title>
        <Text style={{ color: "#666" }}>
          Explore and manage different aspects of your platform.
        </Text>
      </div>

      {/* Statistics */}
      <div className="mb-8">
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={8}>
            <Card
              style={{
                textAlign: "center",
                background: "#f9f9f9",
                boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Title level={4}>Total Users</Title>
              <Text
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#1890ff",
                }}
              >
                {users.length}
              </Text>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card
              style={{
                textAlign: "center",
                background: "#f9f9f9",
                boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Title level={4}>News Articles</Title>
              <Text
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#52c41a",
                }}
              >
                {news.length}
              </Text>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card
              style={{
                textAlign: "center",
                background: "#f9f9f9",
                boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Title level={4}>Playlists</Title>
              <Text
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#faad14",
                }}
              >
                {playlists.length}
              </Text>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Quick Links */}
      <div className="mb-8">
        <Title level={3} style={{ marginBottom: "16px", color: "#444" }}>
          Quick Links
        </Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card
              hoverable
              onClick={() => navigate("/users-management")}
              style={{
                textAlign: "center",
                borderRadius: "16px",
                background: "#f9f9f9",
                boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <UserOutlined style={{ fontSize: "36px", color: "#1890ff" }} />
              <Title level={4} style={{ margin: "12px 0" }}>
                Add New User
              </Title>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card
              hoverable
              onClick={() => navigate("/news-management")}
              style={{
                textAlign: "center",
                borderRadius: "16px",
                background: "#f9f9f9",
                boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <ReadOutlined style={{ fontSize: "36px", color: "#52c41a" }} />
              <Title level={4} style={{ margin: "12px 0" }}>
                Publish News
              </Title>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card
              hoverable
              onClick={() => navigate("/playlist-management")}
              style={{
                textAlign: "center",
                borderRadius: "16px",
                background: "#f9f9f9",
                boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <PlayCircleOutlined
                style={{ fontSize: "36px", color: "#faad14" }}
              />
              <Title level={4} style={{ margin: "12px 0" }}>
                Create Playlist
              </Title>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Management Sections */}
      <Row gutter={[24, 24]}>
        {managements.map((item) => (
          <Col xs={24} sm={12} lg={8} key={item.id}>
            <Tooltip title={item.description} placement="bottom">
              <Card
                style={{
                  background: item.gradient,
                  borderRadius: "16px",
                  color: "#fff",
                  textAlign: "center",
                  cursor: "pointer",
                  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
                }}
                hoverable
                onClick={() => navigate(item.path)}
                bodyStyle={{
                  padding: "30px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="hover:scale-105 transition-transform"
              >
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "50%",
                    padding: "15px",
                    marginBottom: "16px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </div>
                <Title level={3} style={{ margin: "10px 0", color: "#fff" }}>
                  {item.title}
                </Title>
                <Text
                  style={{ color: "rgba(255, 255, 255, 0.8)" }}
                  className="text-base"
                >
                  {item.description}
                </Text>
              </Card>
            </Tooltip>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Management;
