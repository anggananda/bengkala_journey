import React from "react";
import { Menu, Button, Tooltip } from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { GiTempleGate } from "react-icons/gi";
import {
  FaHome,
  FaChartBar,
  FaNewspaper,
  FaInfoCircle,
  FaUsers,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../store/useAuth";

const menuItems = [
  {
    category: "Main",
    items: [
      { key: "/dashboard", label: "Dashboard", icon: <FaHome size={18} /> },
      {
        key: "/contributions",
        label: "Contributions",
        icon: <FaUsers size={18} />,
      },
      {
        key: "/forums",
        label: "Forum Discussion",
        icon: <FaUsers size={18} />,
      },
      {
        key: "/like",
        label: "Likes",
        icon: <HeartOutlined size={18} />,
      },
    ],
  },
  {
    category: "Explore",
    items: [
      { key: "/news", label: "News", icon: <FaNewspaper size={18} /> },
      {
        key: "/heritage",
        label: "Culture Heritage",
        icon: <GiTempleGate size={18} />,
      },
      {
        key: "/playlist",
        label: "Bengkala Playlist",
        icon: <GiTempleGate size={18} />,
      },
    ],
  },
  {
    category: "More",
    items: [
      { key: "/about", label: "About Us", icon: <FaInfoCircle size={18} /> },
      // { key: "/report", label: "Report", icon: <FaChartBar size={18} /> },
    ],
  },
  {
    category: "Admin",
    items: [
      {
        key: "/management",
        label: "Dashboard Admin",
        icon: <FaInfoCircle size={18} />,
      },
    ],
  },
];

const Sidenav = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = useAuth((state) => state.auth.role);
  const selectedKey = location.pathname;

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const renderMenuItems = () => {
    return menuItems.map(({ category, items }) => {
      if (category === "Admin" && role === "general") return null;

      return (
        <Menu.ItemGroup
          key={category}
          title={
            !collapsed && (
              <h3 className="text-gray-600 text-xs uppercase font-bold tracking-wide mb-2">
                {category}
              </h3>
            )
          }
        >
          {items.map(({ key, label, icon }) => (
            <Menu.Item
              key={key}
              onClick={() => navigate(key)}
              style={{
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className={`transition-colors my-2 ease-out duration-500 rounded-md${
                selectedKey === key
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center">
                <span
                  className={`flex items-center justify-center w-8 h-8 rounded-full 
              ${
                selectedKey === key
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-500 hover:bg-blue-500 hover:text-white"
              } transition-colors duration-300`}
                >
                  {icon}
                </span>
                {!collapsed && <span className="ml-3">{label}</span>}
              </div>
            </Menu.Item>
          ))}
        </Menu.ItemGroup>
      );
    });
  };

  return (
    <div
      className={`h-full flex flex-col shadow-md rounded-lg transition-all duration-700 ${
        collapsed ? "w-24" : "w-64"
      } bg-white`}
    >
      <div
        className={`md:flex items-center ${
          collapsed ? "justify-center" : "justify-between"
        } h-[80px] px-2 hidden`}
      >
        <Button
          type="normal"
          onClick={toggleCollapsed}
          className="text-slate-800 "
          icon={
            collapsed ? (
              <MenuUnfoldOutlined className="text-slate-800" />
            ) : (
              <MenuFoldOutlined className="text-slate-800" />
            )
          }
        />
        {!collapsed && (
          <Link className="text-xl font-bold text-slate-800">
            BengkalaJourney
          </Link>
        )}
      </div>

      {/* Navigation Menu */}
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        inlineCollapsed={collapsed}
        className="bg-white border-none"
      >
        {renderMenuItems()}
      </Menu>
    </div>
  );
};

export default Sidenav;
