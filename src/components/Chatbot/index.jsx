import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { steps } from "../../utils/chatbotStep";

const ChatbotWidget = ({ isChatOpen, toggleChat }) => {
  return (
    <div>
      {/* ChatBot Component */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[350px] h-[520px] shadow-lg rounded-md overflow-hidden">
          <ChatBot
            steps={steps}
            userAvatar="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
            headerComponent={
              <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-md">
                <h3 className="text-lg font-semibold">Bengkala Bot</h3>
                <Button
                  type="text"
                  icon={<CloseOutlined />}
                  size="small"
                  className="text-white hover:bg-transparent"
                  onClick={toggleChat}
                />
              </div>
            }
            placeholder="Type your message here..."
            className="h-full"
            contentStyle={{
              backgroundColor: "#f9f9f9",
            }}
            bubbleStyle={{
              backgroundColor: "#4c6ef5",
              color: "#fff",
              borderRadius: "20px",
              padding: "10px",
            }}
            bubbleOptionStyle={{
              backgroundColor: "#6c63ff",
              color: "#fff",
              borderRadius: "15px",
              fontWeight: "bold",
              padding: "10px",
            }}
            footerStyle={{
              backgroundColor: "#f0f0f0",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
