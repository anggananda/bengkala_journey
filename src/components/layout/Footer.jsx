import React from "react";
import { Layout, Row, Col } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer className="bg-gray-900 text-white py-10 px-5 md:px-20">
      <Row
        justify="space-between"
        align="middle"
        gutter={[16, 16]}
        className="border-b border-gray-800 pb-8"
      >
        {/* Brand Section */}
        <Col xs={24} md={12}>
          <h2 className="text-2xl font-bold mb-4">
            Bengkala<span className="text-blue-500">Journey</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Discover the beauty of Bengkala's Kolok culture. Dive into its rich
            heritage and connect with a vibrant community. Together, let’s
            celebrate and preserve this unique tradition.
          </p>
        </Col>

        {/* Social Media Links */}
        <Col xs={24} md={12} className="flex justify-end space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 transition duration-200"
            aria-label="Facebook"
          >
            <FacebookOutlined className="text-2xl" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition duration-200"
            aria-label="Twitter"
          >
            <TwitterOutlined className="text-2xl" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-500 transition duration-200"
            aria-label="Instagram"
          >
            <InstagramOutlined className="text-2xl" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-200"
            aria-label="GitHub"
          >
            <GithubOutlined className="text-2xl" />
          </a>
        </Col>
      </Row>

      {/* Footer Bottom */}
      <div className="text-center text-gray-500 mt-6 text-sm">
        © 2024 Bengkala Journey. Crafted with ❤️ by Syncro Team.
      </div>
    </Footer>
  );
};

export default FooterComponent;
