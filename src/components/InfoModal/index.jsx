import React from "react";
import { Modal, Typography, List, Button } from "antd";
import { MessageOutlined, InfoCircleOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const urgentLinks = [
  { title: "Forum Diskusi", icon: <MessageOutlined />, link: "#" },
  { title: "Bantuan", icon: <InfoCircleOutlined />, link: "#" },
];

const InfoModal = ({ isModalOpen, closeModal }) => {
  return (
    <Modal
      open={isModalOpen}
      onCancel={closeModal}
      footer={null}
      centered
      className="!p-0 !rounded-2xl !backdrop-blur-lg !shadow-xl"
    >
      <div className="text-center px-6 py-10">
        <Title level={4} className="mb-2 text-gray-800">
          🚀 Akses Cepat
        </Title>
        <Text type="secondary" className="mb-6 block text-sm text-gray-500">
          Pilih menu untuk langsung menuju fitur penting.
        </Text>

        <List
          dataSource={urgentLinks}
          renderItem={(item) => (
            <List.Item className="p-2 rounded-lg transition-all hover:bg-blue-50">
              <Button
                type="link"
                icon={item.icon}
                href={item.link}
                target="_blank"
                className="flex items-center gap-2 text-base font-medium text-blue-600 transition hover:text-blue-800"
              >
                {item.title}
              </Button>
            </List.Item>
          )}
          className="space-y-2"
        />

        <div className="mt-8">
          <Button
            type="primary"
            block
            onClick={closeModal}
            className="rounded-full bg-blue-500 hover:bg-blue-600 text-white py-2 text-base font-semibold shadow-sm transition-all"
          >
            Tutup
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default InfoModal;
