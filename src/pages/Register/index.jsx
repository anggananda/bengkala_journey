import { useEffect } from "react";
import { Form, Input, Button, Typography, notification, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import useAuth from "../../store/useAuth";
import { authStorage } from "../../utils/encryptStorage";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/apiService";

const { Title, Text } = Typography;

const RegisterPage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Your password must be the same",
    });
  };

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    if (values.password === values.confirm_password) {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("password", values.password);
      try {
        const result = await register(formData);
        notification.success({
          message: "Register Successfully",
          description: `Success to register`,
        });
        form.resetFields();
        navigate("/login");
      } catch (error) {
        notification.error({
          message: "Failed Loggin",
          description: "Check Your Username and Password",
        });
        throw error;
      }
    } else {
      error();
    }
  };

  return (
    <div className=" px-2 md:px-8 flex items-center justify-center min-h-screen">
      {contextHolder}
      <div className="flex flex-col md:h-[700px] md:flex-row max-w-7xl w-full bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Left Side - Hero Section */}
        <div className="hidden md:flex md:w-[60%] bg-[url('https://images.unsplash.com/photo-1531778272849-d1dd22444c06?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJhbGl8ZW58MHx8MHx8fDA%3D')] bg-center bg-cover items-center justify-center p-8 text-white relative">
          {/* Overlay for better text visibility */}
          <div className="absolute inset-0 bg-black opacity-40"></div>

          {/* Content Section */}
          <div className="relative z-10 text-center space-y-6 max-w-md ">
            {/* Title */}
            <Title
              level={2}
              className="text-4xl font-bold text-white leading-tight"
              style={{
                color: "white",
              }}
            >
              Welcome back!
            </Title>

            {/* Description Text */}
            <Text className="text-lg text-white opacity-80">
              Sign in to access your existing account and continue your journey.
            </Text>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="flex items-center justify-center p-8 w-full md:w-[40%] relative">
          <div className="w-full max-w-md space-y-6">
            {/* Title */}
            <Title
              level={1}
              className="text-gray-900 text-center font-semibold text-3xl"
            >
              Sign Up
            </Title>

            {/* Login Form */}
            <Form
              form={form}
              name="login"
              onFinish={onFinish}
              layout="vertical"
              className="space-y-4"
            >
              {/* Username Field */}
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please enter your username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="mr-3 text-gray-400" />}
                  placeholder="Username or Email"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </Form.Item>

              {/* Password Field */}
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="mr-3 text-gray-400" />}
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </Form.Item>

              <Form.Item
                name="confirm_password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your confirm password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="mr-3 text-gray-400" />}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </Form.Item>

              {/* Login Button */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full py-3 rounded-md bg-blue-600 text-white font-medium transition-all duration-200 hover:bg-blue-700 focus:outline-none"
                >
                  Register
                </Button>
              </Form.Item>
            </Form>

            {/* <div className="flex flex-col space-y-4">
              <Button
                icon={<GoogleOutlined />}
                className="w-full py-4 rounded-md border border-gray-300 text-gray-800 font-medium transition duration-200"
              >
                Continue with Google
              </Button>

              <Button
                icon={<FacebookOutlined />}
                className="w-full py-4 rounded-md border border-gray-300 text-gray-800 font-medium transition duration-200"
              >
                Continue with Facebook
              </Button>
            </div> */}

            {/* Create Account */}
            <p className="text-center text-gray-500">
              Have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:underline"
              >
                Login
              </Link>
            </p>
            {/* Footer Text */}
            <div className="mt-[100px] text-sm opacity-60 absolute bottom-[10px]">
              © 2024 Bengkala Journey
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
