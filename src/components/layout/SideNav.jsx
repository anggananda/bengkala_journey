import { NavLink, useLocation } from "react-router-dom";
import { Tooltip } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  GlobalOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { GiTempleGate } from "react-icons/gi";
import {
  FaHome,
  FaChartBar,
  FaNewspaper,
  FaInfoCircle,
  FaUsers,
} from "react-icons/fa";

// Define the menu items grouped by categories
const menuItems = [
  {
    category: "Main", // Category for main navigation
    items: [
      { key: "/dashboard", label: "Dashboard", icon: <FaHome size={18} /> },
      {
        key: "/contributions",
        label: "Contributions",
        icon: <FaUsers size={18} />,
      },
    ],
  },
  {
    category: "Explore", // Category for explore section (News, Heritage, etc.)
    items: [
      {
        key: "/news",
        label: "News",
        icon: <FaNewspaper size={18} />,
      },
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
    category: "More", // Category for explore section (News, Heritage, etc.)
    items: [
      { key: "/about", label: "About Us", icon: <FaInfoCircle size={18} /> },
      { key: "/report", label: "Report", icon: <FaChartBar size={18} /> },
    ],
  },
];

const socialMedia = [
  {
    id: 1,
    icon: <FacebookOutlined />,
    link: "https://facebook.com",
    label: "Facebook",
  },
  {
    id: 2,
    icon: <InstagramOutlined />,
    link: "https://instagram.com",
    label: "Instagram",
  },
  {
    id: 3,
    icon: <VideoCameraOutlined />,
    link: "https://tiktok.com",
    label: "TikTok",
  },
  {
    id: 4,
    icon: <GlobalOutlined />,
    link: "https://yourwebsite.com",
    label: "Website",
  },
];

const Sidenav = () => {
  const location = useLocation();
  const selectedKey = location.pathname;

  const renderMenuItems = (category, items) => {
    return (
      <div key={category} className="space-y-4">
        <h3 className="text-gray-600 text-xs uppercase font-bold tracking-wide mb-2">
          {category}
        </h3>
        {items.map(({ key, label, icon, id, link }) => (
          <NavLink
            to={key}
            key={key || id}
            className={`relative flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-300 
              ${
                selectedKey === key
                  ? "bg-white shadow-md text-blue-500 border-l-4 border-blue-500"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            target={link ? "_blank" : "_self"}
            href={link}
            rel="noopener noreferrer"
          >
            <span
              className={`flex items-center justify-center w-8 h-8 rounded-full 
              ${
                selectedKey === key
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-500 hover:bg-blue-500 hover:text-white"
              }`}
            >
              {icon}
            </span>
            <span className="text-sm font-medium">{label}</span>
            {selectedKey === key && (
              <div className="absolute -left-2 top-0 bottom-0 bg-blue-500 w-2 rounded-r-lg" />
            )}
          </NavLink>
        ))}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col md:justify-between shadow-md rounded-lg p-4">
      {/* Navigation Menu */}
      <nav className="flex flex-col space-y-6 ">
        {menuItems.map(({ category, items }) =>
          renderMenuItems(category, items)
        )}
      </nav>

      <h3 className=" text-gray-600 mt-8 text-xs uppercase font-bold tracking-wide md:mb-2">
        social media
      </h3>

      {/* Social Media Links */}
      <div className="mt-4 md:mt-2 flex justify-center gap-4">
        {socialMedia.map((item) => (
          <Tooltip title={item.label} key={item.id}>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`
          h-10 w-10 flex items-center justify-center rounded-full transition duration-300 
          ${
            item.id === 1
              ? "bg-gradient-to-r from-[#3b5998] to-[#8b9dc3] text-white"
              : ""
          }
          ${
            item.id === 2
              ? "bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 text-white"
              : ""
          }
          ${
            item.id === 3
              ? "bg-gradient-to-r from-[#010101] to-[#69c9d0] text-white"
              : ""
          }
          ${
            item.id === 4
              ? "bg-gradient-to-r from-[#0066cc] to-[#00c6ff] text-white"
              : ""
          }
          hover:text-white
        `}
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
