import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import UrgentFloatButton from "../../components/UrgentFloatButton";
import InfoModal from "../../components/InfoModal";
import { Input, Row, Col, Card, List } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const discovers = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFsaXxlbnwwfHwwfHx8MA%3D%3D",
    name: "bangkala 1",
    location: "Buleleng, Bali",
  },
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFsaXxlbnwwfHwwfHx8MA%3D%3D",
    name: "bangkala 1",
    location: "Buleleng, Bali",
  },
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFsaXxlbnwwfHwwfHx8MA%3D%3D",
    name: "bangkala 1",
    location: "Buleleng, Bali",
  },
];

const Dashboard = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <div className="">
        <Input
          className="p-4 shadow-lg border-none outline-none text-gray-400 font-light"
          placeholder="search..."
          allowClear
          prefix={<SearchOutlined size={60} />}
        />
      </div>
      <div className="mt-10">
        <h1 className="text-2xl font-semibold font-poppins text-slate-500">
          Discover New World
        </h1>

        <Row gutter={[24, 0]} className="mt-4">
          <Col sm={24}>
            <List
              grid={{
                gutter: 40,
                sm: 1,
                md: 3,
                lg: 3,
                xl: 3,
                xxl: 3,
              }}
              dataSource={discovers}
              renderItem={(item) => (
                <List.Item>
                  <Card className={`bg-[url(${item.img})] h-[350px]`}>
                    {item.name}
                  </Card>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </div>
      <UrgentFloatButton showModal={showModal} />
      <InfoModal closeModal={closeModal} isModalOpen={isModalOpen} />
    </div>
  );
};

export default Dashboard;
