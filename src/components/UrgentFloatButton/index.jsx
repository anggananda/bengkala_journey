import React from "react";
import { FloatButton } from "antd";
import { BellOutlined } from "@ant-design/icons";

const UrgentFloatButton = ({ showModal }) => {
  return (
    <FloatButton
      tooltip={<h1>quick access</h1>}
      icon={<BellOutlined />}
      type=""
      onClick={showModal}
      className="fixed top-[50%] right-[10px] shadow-xl translate-y-[-50%] invisible md:visible bg-slate-800 hover:bg-slate-700 text-white"
    />
  );
};

export default UrgentFloatButton;
