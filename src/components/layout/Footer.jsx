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
    <Footer className="bg-gray-700 text-white py-10 px-5 md:px-20">
      <Row gutter={[16, 16]} justify="space-between">
        {/* Brand Section */}
        <Col xs={24} md={8}>
          <h2 className="text-2xl font-bold mb-2">
            Bengkala<span className="text-blue-500">Journey</span>
          </h2>
          <p className="text-gray-400 text-justify">
            Bengkala Journey is a platform designed to connect the world with
            the unique Kolok culture of Bengkala village. Our website offers
            insights into local traditions, stunning destinations, and vibrant
            community discussions. Explore the rich Kolok heritage, stay updated
            with the latest news, and engage in forums to share thoughts and
            experiences. Capture and commemorate your memories related to
            Bengkala’s culture with us. Join us on this journey to celebrate and
            preserve the beauty of Bengkala!
          </p>
        </Col>

        {/* Quick Links */}
        <Col xs={24} md={8}>
          <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="text-gray-400 hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-gray-400 hover:text-white transition"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/services"
                className="text-gray-400 hover:text-white transition"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-gray-400 hover:text-white transition"
              >
                Contact
              </a>
            </li>
          </ul>
        </Col>

        {/* Social Media Links */}
        <Col xs={24} md={8}>
          <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookOutlined className="text-gray-400 text-2xl hover:text-white transition" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterOutlined className="text-gray-400 text-2xl hover:text-white transition" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramOutlined className="text-gray-400 text-2xl hover:text-white transition" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubOutlined className="text-gray-400 text-2xl hover:text-white transition" />
            </a>
          </div>
        </Col>
      </Row>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500">
        © 2024 Syncro Team. All Rights Reserved.
      </div>
    </Footer>
  );
};

export default FooterComponent;
