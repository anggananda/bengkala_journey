import React, { useState } from "react";
import { Layout, Affix, Button, Modal, Avatar, Dropdown, Space } from "antd";
import { Link, useLocation } from "react-router-dom";
import { LoginOutlined } from "@ant-design/icons";
import useAuth from "../../store/useAuth";
import { CiUser } from "react-icons/ci";
import { FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";

const { Header } = Layout;

const HeaderComponent = ({ children }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const isLogin = useAuth((state) => state.auth.login);
  const logout = useAuth((state) => state.logout); // Assuming your logout function is here
  const username = useAuth((state) => state.auth.username);

  const showConfirmLogout = () => {
    setIsModalVisible(true); // Show the confirmation modal
  };

  const handleOk = () => {
    logout(); // Call the logout function
    setIsModalVisible(false); // Close the modal
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Close the modal if canceled
  };

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
        <span
          onClick={(e) => {
            e.preventDefault();
            // Trigger the confirmation modal
            showConfirmLogout();
          }}
          className="flex items-center gap-3 px-4 py-2 text-red-500 hover:text-red-600 transition-colors duration-200 cursor-pointer"
        >
          <FaSignOutAlt className="text-red-500" size={20} />
          <span className="font-medium">Logout</span>
        </span>
      ),
    },
  ];

  return (
    <Affix className="relative z-[99]">
      <Header className="bg-[#ffffff] h-[80px] flex justify-between items-center border-b-2 border-[rgba(0,0,0,0.1)]">
        {/* Logo */}
        {isLogin === false ? (
          <Link
            to="/"
            className="text-slate-800 text-lg md:text-2xl font-bold cursor-pointer hover:text-blue-400 transition-all duration-300"
          >
            Bengkala<span className="text-blue-400">Journey</span>
          </Link>
        ) : (
          ""
        )}
        <h1
          to="/"
          className="text-slate-800 text-lg md:text-2xl font-bold hover:text-blue-400 transition-all duration-300"
        >
          {lastSegment}
        </h1>

        {/* Right Section: Login Button + Avatar Dropdown */}
        <div className="w-full flex justify-end">
          {/* Login Button */}
          {!isLogin ? (
            <div className="">
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
              menu={{ items }} // Pass items directly
              placement="bottom"
              trigger={["click"]}
            >
              <div onClick={(e) => e.preventDefault()} className="flex gap-2">
                <h1 className="font-poppins text-gray-400 font-semibold">
                  {username}
                </h1>
                <Space>
                  <Avatar
                    className="bg-white cursor-pointer border border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-300"
                    // icon={<CiUser size={20} className="text-black" />}
                    size={40}
                    src={
                      <img src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                    }
                  />
                </Space>
              </div>
            </Dropdown>
          )}
        </div>

        {/* Confirmation Modal */}
        <Modal
          title="Log Out"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Yes"
          cancelText="No"
          centered
          bodyStyle={{
            fontSize: "16px",
            padding: "20px",
            textAlign: "center",
            color: "#333",
            lineHeight: "1.6",
          }}
          footer={[
            <Button
              key="cancel"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 hover:bg-gray-200 rounded-md py-2 px-6 text-sm transition duration-200"
            >
              No
            </Button>,
            <Button
              key="ok"
              type="primary"
              onClick={handleOk}
              className="bg-blue-500 text-white hover:bg-blue-600 rounded-md py-2 px-6 text-sm transition duration-200"
            >
              Yes
            </Button>,
          ]}
          className="rounded-lg shadow-md transform transition-transform duration-300 w-[90%] max-w-lg"
        >
          <p className="text-gray-600 text-base">
            Are you sure you want to log out?
          </p>
        </Modal>

        {children}
      </Header>
    </Affix>
  );
};

export default HeaderComponent;
