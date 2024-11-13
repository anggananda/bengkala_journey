import React from "react";
import { Layout, Affix, Button, Avatar, Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import { MenuOutlined, LoginOutlined } from "@ant-design/icons";
import useAuth from "../../store/useAuth";
import { CiUser } from "react-icons/ci";
import { FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";

const { Header } = Layout;

const items = [
  {
    key: "1",
    label: (
      <Link to="/profile">
        <span className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
          <FaUserCircle className="text-blue-500" size={20} />
          <span className="font-medium">Profile</span>
        </span>
      </Link>
    ),
  },
  {
    key: "2",
    label: (
      <Link to="/setting">
        <span className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
          <FaCog className="text-blue-500" size={20} />
          <span className="font-medium">Settings</span>
        </span>
      </Link>
    ),
  },
  {
    key: "3",
    label: (
      <Link to="/login">
        <span className="flex items-center gap-3 px-4 py-2 text-red-500 hover:text-red-600 transition-colors duration-200">
          <FaSignOutAlt className="text-red-500" size={20} />
          <span className="font-medium">Logout</span>
        </span>
      </Link>
    ),
  },
];

const HeaderComponent = ({ toggleDrawer }) => {
  const isLogin = useAuth((state) => state.auth.login);
  const logout = useAuth((state) => state.logout);

  return (
    <Affix className="relative z-[99]">
      <Header className="bg-[#ffffff] px-5 md:px-20 h-[80px] flex justify-between items-center  shadow-lg">
        {/* Logo */}
        <Link
          to="/"
          className="text-slate-800 text-lg md:text-2xl font-bold cursor-pointer hover:text-blue-400 transition-all duration-300"
        >
          Bengkala<span className="text-blue-400">Journey</span>
        </Link>

        {/* Right Section: Login Button + Hamburger */}
        <div className="flex items-center gap-4">
          {/* Login Button */}
          {!isLogin ? (
            <div className="invisible md:visible">
              <Link
                to="/login"
                className="rounded-md px-3 py-2 bg-[#eaeaea] text-white"
              >
                <LoginOutlined className="text-slate-800" />{" "}
                <span className="ml-2 text-gray-600 font-semibold">Login</span>
              </Link>
            </div>
          ) : (
            <Dropdown
              overlayClassName="custom-dropdown"
              menu={{ items }}
              placement="bottom"
              trigger={["click"]}
            >
              <div onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar
                    className="bg-white cursor-pointer border border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-300"
                    icon={<CiUser size={20} className="text-black" />}
                  />
                </Space>
              </div>
            </Dropdown>
          )}

          {/* Hamburger Menu Button */}
          <Button
            icon={<MenuOutlined />}
            type="normal"
            onClick={toggleDrawer}
            className="text-white bg-slate-800 border-none outline-none hover:bg-slate-700 hover:text-white"
          />
        </div>
      </Header>
    </Affix>
  );
};

export default HeaderComponent;
