import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Avatar,
  Typography,
  Image,
  Button,
  Form,
  Input,
  notification,
  Skeleton,
  // Select
} from "antd";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { editProfile, getUserById } from "../../services/apiService";
import useAuth from "../../store/useAuth";

const { Text } = Typography;

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const userID = useAuth((state) => state.auth.id);

  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddress, setIsAddress] = useState(false);
  const [form] = Form.useForm();

  const getProfile = async () => {
    if (!userID) return; // Pastikan userID sudah tersedia
    setIsLoading(true);
    try {
      const result = await getUserById(userID);
      console.log(result.datas);
      setProfile(result.datas);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userID) {
      getProfile();
    }
  }, [userID]);

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        firstName: profile.first_name || "",
        lastName: profile.last_name || "",
        email: profile.email || "",
        phone: profile.phone_number || "",
        gender: profile.gender || "",
        bio: profile.bio || "",
        addressLine1: profile.address_line_1 || "",
        addressLine2: profile.address_line_2 || "",
        country: profile.country || "",
        province: profile.state_or_province || "",
        city: profile.city || "",
        landmark: profile.landmark || "",
      });
    }
  }, [profile, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      console.log("Updated Values:", values);

      const formData = new FormData();
      formData.append("first_name", values.firstName);
      formData.append("last_name", values.lastName);
      formData.append("email", values.email);
      formData.append("phone_number", values.phone);
      formData.append("gender", values.gender);
      formData.append("bio", values.bio);
      formData.append("address_line_1", values.addressLine1);
      formData.append("address_line_2", values.addressLine2);
      formData.append("country", values.country);
      formData.append("state_or_province", values.province);
      formData.append("city", values.city);
      formData.append("landmark", values.landmark);

      const result = await editProfile(formData, userID);
      notification.success({
        message: "Edit Successfully",
        description: `Success to edit ${isEditing ? "profile" : "address"}`,
      });

      isEditing ? setIsEditing(false) : setIsAddress(false);
    } catch (error) {
      notification.error({
        message: "Failed Edit",
        description: "Check Your Input Edit",
      });
      throw ("Validation Failed:", error);
    }
  };

  return (
    <Card className="m-4">
      <Text className="text-slate-700 font-semibold font-poppins text-lg">
        My Profile
      </Text>
      {!isLoading ? (
        <Card className="my-4">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Avatar
                size={80}
                src={<Image src="./imgs/angga.png" />}
                className="shadow-md"
              ></Avatar>
              <div className="flex flex-col justify-center items-start ml-4">
                <Text className="font-semibold font-poppins text-slate-800">
                  Dwi Angga
                </Text>
                <Text className="text-gray-500 font-medium">contributor</Text>
                <Text className="text-gray-500 font-light">
                  Karangasem Bali, Indonesia
                </Text>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Button>
                Edit <EditOutlined />
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Skeleton active={true} />
      )}

      {/* Personal Information */}
      {!isLoading ? (
        <Card>
          <div className="">
            <div className="flex justify-between items-center mb-8">
              <Text className="text-slate-700 font-semibold font-poppins">
                Personal Information
              </Text>
              <Button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              >
                {isEditing ? (
                  <span>
                    {" "}
                    Save <SaveOutlined />
                  </span>
                ) : (
                  <span>
                    {" "}
                    Edit <EditOutlined />
                  </span>
                )}
              </Button>
            </div>

            <div className="">
              <Form
                form={form}
                layout="vertical"
                // initialValues={formData}
                className="space-y-4"
                disabled={false}
              >
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      label="First Name"
                      name="firstName"
                      rules={[
                        {
                          required: isEditing ? true : false,
                          message: "First name is required",
                        },
                      ]}
                    >
                      <Input
                        placeholder="First Name"
                        className="bg-white font-poppins text-black border-none !outline-none"
                        disabled={!isEditing}
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          pointerEvents: !isEditing ? "none" : "auto", // Hindari klik saat disable
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Email Address"
                      name="email"
                      rules={[
                        {
                          required: isEditing ? true : false,
                          type: "email",
                          message: "Valid email is required",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Email Address"
                        className="bg-white font-poppins text-black border-none !outline-none"
                        disabled={!isEditing}
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          pointerEvents: !isEditing ? "none" : "auto",
                        }}
                      />
                    </Form.Item>
                    <Form.Item label="Gender" name="gender">
                      <Input
                        placeholder="Gender"
                        className="bg-white font-poppins text-black border-none !outline-none"
                        disabled={!isEditing}
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          pointerEvents: !isEditing ? "none" : "auto",
                        }}
                      />
                      {/* <Select
                        placeholder="Select Gender"
                        className="bg-white font-poppins text-black border-none !outline-none"
                        disabled={!isEditing}
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          pointerEvents: !isEditing ? "none" : "auto",
                        }}
                      >
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                      </Select> */}
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Last Name"
                      name="lastName"
                      rules={[
                        {
                          required: isEditing ? true : false,
                          message: "Last name is required",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Last Name"
                        className="bg-white font-poppins border-none !outline-none"
                        disabled={!isEditing}
                        style={{
                          backgroundColor: "white",
                          color: !isEditing && "black",
                          pointerEvents: !isEditing ? "none" : "auto",
                        }}
                      />
                    </Form.Item>
                    <Form.Item label="Phone" name="phone">
                      <Input
                        placeholder="Phone Number"
                        className="bg-white font-poppins text-black border-none outline-none "
                        disabled={!isEditing}
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          pointerEvents: !isEditing ? "none" : "auto",
                        }}
                      />
                    </Form.Item>
                    <Form.Item label="Bio" name="bio">
                      <Input
                        placeholder="Bio"
                        className="bg-white font-poppins text-black border-none !outline-none"
                        disabled={!isEditing}
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          pointerEvents: !isEditing ? "none" : "auto",
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </Card>
      ) : (
        <Skeleton active={true} />
      )}

      {/* Address */}
      {!isLoading ? (
        <Card className="my-4">
          <div className="">
            <div className="flex justify-between items-center mb-8">
              <Text className="text-slate-700 font-semibold font-poppins">
                Address
              </Text>
              <Button
                onClick={() => (isAddress ? handleSave() : setIsAddress(true))}
              >
                {isAddress ? (
                  <span>
                    {" "}
                    Save <SaveOutlined />
                  </span>
                ) : (
                  <span>
                    {" "}
                    Edit <EditOutlined />
                  </span>
                )}
              </Button>
            </div>
            <div className="">
              <Form
                form={form}
                layout="vertical"
                //   initialValues={formData}
                className="space-y-4"
                disabled={false}
              >
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      label="Address Line 1"
                      name="addressLine1"
                      rules={[
                        {
                          required: isAddress ? true : false,
                          message: "Address is required",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Address"
                        className="bg-white font-poppins text-black border-none !outline-none"
                        disabled={!isAddress}
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          pointerEvents: !isAddress ? "none" : "auto", // Hindari klik saat disable
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Country"
                      name="country"
                      rules={[
                        {
                          required: isAddress ? true : false,
                          type: "text",
                          message: "Valid email is required",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Country"
                        className="bg-white font-poppins text-black border-none !outline-none"
                        disabled={!isAddress}
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          pointerEvents: !isAddress ? "none" : "auto",
                        }}
                      />
                    </Form.Item>
                    <Form.Item label="City" name="city">
                      <Input
                        placeholder="City"
                        className="bg-white font-poppins text-black border-none !outline-none"
                        disabled={!isAddress}
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          pointerEvents: !isAddress ? "none" : "auto",
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Address Line 2 (optional)"
                      name="addressLine2"
                    >
                      <Input
                        placeholder="Address line 2"
                        className="bg-white font-poppins border-none !outline-none"
                        disabled={!isAddress}
                        style={{
                          backgroundColor: "white",
                          color: !isAddress && "black",
                          pointerEvents: !isAddress ? "none" : "auto",
                        }}
                      />
                    </Form.Item>
                    <Form.Item label="State/Province" name="province">
                      <Input
                        placeholder="state/province"
                        className="bg-white font-poppins text-black border-none outline-none "
                        disabled={!isAddress}
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          pointerEvents: !isAddress ? "none" : "auto",
                        }}
                      />
                    </Form.Item>
                    <Form.Item label="Landmark" name="landmark">
                      <Input
                        placeholder="Landmark"
                        className="bg-white font-poppins text-black border-none !outline-none"
                        disabled={!isAddress}
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          pointerEvents: !isAddress ? "none" : "auto",
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </Card>
      ) : (
        <Skeleton active={true} />
      )}
    </Card>
  );
};

export default Profile;
