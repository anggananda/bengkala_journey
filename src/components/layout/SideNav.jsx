import { NavLink, useLocation } from "react-router-dom";
import { Tooltip } from "antd";

import {
  FacebookOutlined,
  InstagramOutlined,
  GlobalOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { GiTempleGate } from "react-icons/gi"; // Import the React Icon for "Warisan Budaya"
import { FaHome, FaChartBar, FaNewspaper, FaInfoCircle } from "react-icons/fa"; // Other icons from react-icons

export const menuItems = [
  { key: "/dashboard", label: "Dashboard", icon: <FaHome size={20} /> },
  {
    key: "/heritage",
    label: "Culture Heritage",
    icon: <GiTempleGate size={20} />,
  },
  { key: "/news", label: "News", icon: <FaNewspaper size={20} /> },
  { key: "/about", label: "About Us", icon: <FaInfoCircle size={20} /> },
  { key: "/report", label: "Report", icon: <FaChartBar size={20} /> },
];

const socialMedia = [
  {
    id: 1,
    icon: <FacebookOutlined />,
    link: "https://facebook.com",
    label: "Facebook",
    color: "bg-blue-600", // Facebook blue
  },
  {
    id: 2,
    icon: <InstagramOutlined />,
    link: "https://instagram.com",
    label: "Instagram",
    color: "bg-gradient-to-r from-pink-500 to-purple-600", // Instagram gradient
  },
  {
    id: 3,
    icon: <VideoCameraOutlined />,
    link: "https://tiktok.com",
    label: "TikTok",
    color: "bg-black", // TikTok black
  },
  {
    id: 4,
    icon: <GlobalOutlined />,
    link: "https://yourwebsite.com",
    label: "Website",
    color: "bg-gray-700", // Neutral color for website
  },
];

const Sidenav = () => {
  const location = useLocation();
  const selectedKey = location.pathname;

  return (
    <div className="h-full bg-gray-50 shadow-lg rounded-xl p-4">
      <nav className="flex flex-col space-y-2">
        {menuItems.map(({ key, label, icon }) => (
          <NavLink
            to={key}
            key={key}
            className={`flex items-center gap-4 px-4 py-2 rounded-lg transition-all duration-200 
              ${
                selectedKey === key
                  ? "bg-blue-500 text-white shadow-lg"
                  : "text-gray-600 hover:bg-blue-100 hover:text-blue-500"
              }
            `}
          >
            <span
              className={`flex items-center justify-center w-9 h-9 rounded-full transition-all
              ${
                selectedKey === key
                  ? "bg-white text-blue-500 shadow-md"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {icon}
            </span>
            <span className="text-lg font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="flex justify-center items-center gap-5 mt-10">
        {socialMedia.map((item) => (
          <Tooltip title={item.label} key={item.id}>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`h-[40px] w-[40px] rounded-full flex justify-center items-center ${item.color} text-white text-xl transition transform duration-300 hover:scale-110`}
              aria-label={item.label}
            >
              {item.icon}
            </a>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default Sidenav;
