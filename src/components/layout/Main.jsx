import React, { useState } from "react";
import { Layout, Drawer, Typography } from "antd";
import FooterComponent from "../../components/layout/Footer";
import Sidenav from "../../components/layout/SideNav";
import HeaderComponent from "./Header";

const { Content } = Layout;
const { Text } = Typography;

const MainLayout = ({ children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

  return (
    <Layout className="min-h-screen flex flex-col">
      {/* Header */}
      <HeaderComponent toggleDrawer={toggleDrawer} />
      {/* Drawer for Mobile Navigation */}
      <Drawer
        title={
          <Text className="text-lg font-bold text-gray-800">
            Bengkala<span className="text-blue-400">Journey</span>
          </Text>
        }
        placement="right"
        width={500}
        onClose={toggleDrawer}
        open={isDrawerOpen}
        bodyStyle={{ padding: 0 }}
        className="p-0 relative z-[9999]"
      >
        {/* SideNav */}
        <Sidenav />
      </Drawer>

      {/* Content */}
      <Content className="flex-1 overflow-auto bg-gray-50">{children}</Content>

      {/* Footer */}
      <FooterComponent />
    </Layout>
  );
};

export default MainLayout;
