import { useEffect } from "react";
import { Form, Input, Button, Typography, Checkbox, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import useAuth from "../../store/useAuth";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const login = useAuth((state) => state.login);
  const isLogin = useAuth((state) => state.auth.login);

  useEffect(() => {
    if (isLogin) {
      navigate("/dashboard");
    }
  }, [isLogin, navigate]);

  const onFinish = async (values) => {
    try {
      const result = await login(values);
      notification.success({
        message: "Login Successful",
        description: `Welcome, your token is: ${values.username}`,
      });
      form.resetFields();
      navigate("/dashboard");
    } catch (error) {
      notification.error({
        message: "Failed Loggin",
        description: "Check Your Username and Password",
      });
      throw error;
    }
  };

  return (
    <div className="px-8 flex items-center justify-center min-h-screen bg-[url('https://images.unsplash.com/photo-1557093793-d149a38a1be8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJhbGl8ZW58MHx8MHx8fDA%3D')] bg-center bg-cover">
      <div className="flex flex-col md:h-[700px] md:flex-row max-w-7xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Side - Hero Section */}
        <div className="hidden md:flex md:w-[60%] bg-[url('https://images.unsplash.com/photo-1531778272849-d1dd22444c06?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJhbGl8ZW58MHx8MHx8fDA%3D')] bg-center bg-cover items-center justify-center p-8 text-white relative">
          <div className="space-y-6 text-center max-w-sm">
            <Title
              level={2}
              className="text-4xl font-bold"
              style={{
                color: "white",
              }}
            >
              Welcome back!
            </Title>
            <Text className="text-lg text-white">
              You can sign in to access with your existing account.
            </Text>
            <div className="absolute bottom-5 text-sm opacity-50">
              © 2024 Your Company Name
            </div>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="flex items-center justify-center p-8 w-full md:w-[40%]">
          <div className="w-full max-w-md space-y-6">
            <Title
              level={1}
              className="text-gray-800 text-center font-semibold text-2xl"
            >
              Sign In
            </Title>
            <Form
              form={form}
              name="login"
              onFinish={onFinish}
              layout="vertical"
              className="space-y-4"
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please enter your username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="mr-2 text-gray-400" />}
                  placeholder="Username or email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="mr-2 text-gray-400" />}
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </Form.Item>
              <div className="flex items-center justify-between">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox className="text-gray-600">Remember me</Checkbox>
                </Form.Item>
                <a href="/forgot-password" className=" text-sm">
                  Forgot password?
                </a>
              </div>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full text-white font-semibold py-3 rounded-lg transition duration-200 ease-in-out"
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
            <p className="text-center text-gray-500">
              New here?{" "}
              <a href="/register" className="font-medium hover:underline">
                Create an account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
