import React, { useState } from "react";
import { Layout, Typography, Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import FooterComponent from "../../components/layout/Footer";
import Sidenav from "../../components/layout/SideNav";
import HeaderComponent from "./Header";
import useAuth from "../../store/useAuth";

const { Content, Sider } = Layout;
const { Text } = Typography;

const MainLayout = ({ children }) => {
  const login = useAuth((state) => state.auth.login);
  const [collapsed, setCollapsed] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

  return (
    <Layout className="min-h-screen">
      {/* Sidebar Navigation */}
      {login && (
        <>
          {/* Desktop Fixed Sider */}
          <Sider
            width={250}
            className="hidden lg:flex bg-white shadow-md flex-col fixed top-0 left-0 h-screen z-10"
            collapsible
            collapsed={collapsed}
            breakpoint="lg"
            collapsedWidth="0"
          >
            {/* Header */}
            <div className="flex items-center justify-center p-4 h-[80px] border-b-2 border-[rgba(0,0,0,0.1)]">
              <Text className="text-lg font-bold text-gray-800">
                Bengkala<span className="text-blue-400">Journey</span>
              </Text>
            </div>

            {/* Sidenav */}
            <div className="flex-1 overflow-y-auto">
              <Sidenav />
            </div>
          </Sider>

          {/* Mobile Drawer */}
          <Drawer
            title="Bengkala Journey"
            placement="left"
            onClose={toggleDrawer}
            open={isDrawerOpen}
            bodyStyle={{ padding: 0 }}
          >
            <Sidenav />
          </Drawer>
        </>
      )}

      {/* Main Layout */}
      <Layout style={{ marginLeft: login ? (collapsed ? 80 : 250) : 0 }}>
        {/* Header */}
        <HeaderComponent>
          {login && (
            <Button
              type="text"
              icon={<MenuOutlined />}
              className="lg:hidden"
              onClick={toggleDrawer}
            />
          )}
        </HeaderComponent>

        {/* Content */}
        <Content className="flex-1 overflow-auto bg-gray-50">
          {children}
        </Content>

        {/* Footer */}
        <FooterComponent />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
