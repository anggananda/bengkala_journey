import React, { useState, useEffect } from "react";
import { Layout, Typography, Button, Drawer, Affix } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import FooterComponent from "../../components/layout/Footer";
import Sidenav from "../../components/layout/SideNav";
import HeaderComponent from "./Header";
import useAuth from "../../store/useAuth";
import { useLocation } from "react-router-dom"; // Import useLocation

const { Content, Sider } = Layout;
const { Text } = Typography;

const MainLayout = ({ children }) => {
  const login = useAuth((state) => state.auth.login);
  const [collapsed, setCollapsed] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation(); // Get current location

  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);
  const toggleCollapse = () => setCollapsed(!collapsed);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]); // Dependency on location to trigger on route change

  return (
    <Layout className="">
      {/* Sidebar */}
      {login && (
        <>
          {/* Sidebar for Desktop */}
          <Affix>
            <Sider
              width={256}
              collapsedWidth={96}
              collapsed={collapsed}
              className="transition-all duration-700 bg-white text-white shadow-lg hidden md:block h-svh"
            >
              <div className="flex-1 overflow-y-auto">
                <Sidenav collapsed={collapsed} setCollapsed={setCollapsed} />
              </div>
            </Sider>
          </Affix>

          {/* Mobile Drawer */}
          <Drawer
            placement="left"
            styles={{
              body: { padding: 0 },
            }}
            width={260}
            title={<h1 className="text-xl font-bold">BengkalaJourney</h1>}
            onClose={toggleDrawer}
            open={isDrawerOpen}
            className="lg:hidden"
          >
            <Sidenav collapsed={false} setCollapsed={setCollapsed} />
          </Drawer>
        </>
      )}

      {/* Main content area */}
      <Layout className="transition-all duration-300">
        <HeaderComponent collapsed={collapsed}>
          {login && (
            <Button
              type="text"
              icon={<MenuOutlined />}
              className="lg:hidden "
              onClick={toggleDrawer}
            />
          )}
        </HeaderComponent>
        {/* Content */}
        <Content className=" bg-gray-100 overflow-auto">{children}</Content>
        <FooterComponent />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
