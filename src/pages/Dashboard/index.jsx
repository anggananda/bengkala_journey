import React, { useState } from "react";
import { FloatButton, Row, Col, List, Card } from "antd";
import { RobotFilled } from "@ant-design/icons";
import ChatbotWidget from "../../components/Chatbot";
import useAuth from "../../store/useAuth";

const Dashboard = () => {
  const role = useAuth((state) => state.auth.role);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  2;
  return (
    <div className="p-4 relative">
      {!isChatOpen && (
        <FloatButton
          icon={<RobotFilled className="text-white text-lg" />}
          onClick={toggleChat}
          tooltip={
            <h1 className="text-sm font-semibold text-white">Chat Bot</h1>
          }
          className="bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out"
          type=""
        />
      )}
      <ChatbotWidget isChatOpen={isChatOpen} toggleChat={toggleChat} />
    </div>
  );
};

export default Dashboard;
