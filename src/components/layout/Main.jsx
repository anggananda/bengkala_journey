import React, { useState, useEffect } from "react";
import { Layout, Typography, Button, Drawer, Affix } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import FooterComponent from "../../components/layout/Footer";
import Sidenav from "../../components/layout/SideNav";
import HeaderComponent from "./Header";
import useAuth from "../../store/useAuth";

const { Content, Sider, Header } = Layout;
const { Text } = Typography;

const MainLayout = ({ children }) => {
  const login = useAuth((state) => state.auth.login);
  const [collapsed, setCollapsed] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [marginLeft, setMarginLeft] = useState(250); // Default margin for desktop

  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);
  const toggleCollapse = () => setCollapsed(!collapsed);

  const updateMarginLeft = () => {
    const isMobile = window.innerWidth <= 768;
    setMarginLeft(login ? (isMobile || collapsed ? 0 : 250) : 0);
  };

  useEffect(() => {
    updateMarginLeft(); // Initial calculation
    window.addEventListener("resize", updateMarginLeft); // Update on resize
    return () => window.removeEventListener("resize", updateMarginLeft); // Cleanup
  }, [login, collapsed]);

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
              className="lg:hidden"
              onClick={toggleDrawer}
            />
          )}
        </HeaderComponent>
        {/* Content */}
        <Content className="p-2 bg-gray-100 overflow-auto">{children}</Content>
        <FooterComponent />
      </Layout>
    </Layout>

    // <Layout className="min-h-screen">
    //   {/* Sidebar Navigation */}
    //   {login && (
    //     <>
    //       {/* Sidebar for Desktop */}
    //       <Sider
    //         width={260}
    //         collapsedWidth={80}
    //         className="hidden lg:flex bg-white shadow-md flex-col h-full transition-all"
    //         collapsed={collapsed}
    //       >
    //         <div className="flex-1 overflow-y-auto">
    //           <Sidenav collapsed={collapsed} setCollapsed={setCollapsed} />
    //         </div>
    //       </Sider>

    //       {/* Mobile Drawer */}
    //       <Drawer
    //         title="Bengkala Journey"
    //         placement="left"
    //         onClose={toggleDrawer}
    //         open={isDrawerOpen}
    //         bodyStyle={{ padding: 0 }}
    //         className="lg:hidden"
    //       >
    //         <Sidenav collapsed={false} />
    //       </Drawer>
    //     </>
    //   )}

    //   {/* Main Layout */}
    //   <Layout
    //     className="flex flex-col transition-all"
    //     // style={{
    //     //   marginLeft: login && !collapsed && window.innerWidth > 768 ? 250 : 0,
    //     // }}
    //   >
    //     {/* Header */}
    //     <HeaderComponent>
    //       {login && (
    //         <Button
    //           type="text"
    //           icon={<MenuOutlined />}
    //           className="lg:hidden"
    //           onClick={toggleDrawer}
    //         />
    //       )}
    //     </HeaderComponent>

    //     {/* Content */}
    //     <Content className="flex-1 overflow-auto bg-gray-50 p-4">
    //       {children}
    //     </Content>

    //     {/* Footer */}

    //   </Layout>
    // </Layout>
  );
};

export default MainLayout;
