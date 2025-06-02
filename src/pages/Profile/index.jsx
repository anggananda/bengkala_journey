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
  Upload,
  // Select
} from "antd";
import { EditOutlined, SaveOutlined, UploadOutlined } from "@ant-design/icons";
import {
  editProfile,
  editUserRegister,
  getUserById,
  getUserByUsername,
} from "../../services/apiService";
import useAuth from "../../store/useAuth";
import useProfile from "../../store/useProfile";
import { authStorage } from "../../utils/encryptStorage";
const url = import.meta.env.VITE_BASE_URL;

const { Text } = Typography;

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [main, setMain] = useState([]);
  const userID = useAuth((state) => state.auth.id);
  const username = useAuth((state) => state.auth.username);
  const { updateUsername } = useAuth();
  const { updatePhotoProfile } = useProfile();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddress, setIsAddress] = useState(false);
  const [isMain, setIsMain] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [form] = Form.useForm();
  const [filePreview, setFilePreview] = useState(null);
  const [fileList, setFileList] = useState([]);

  const getMainProfile = async () => {
    if (username) {
      try {
        const result = await getUserByUsername(username);
        console.log(result);
        setMain(result.datas);
      } catch (error) {
        throw error;
      }
    } else {
      return;
    }
  };

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
    if (username) {
      getMainProfile();
    }
  }, [username]);

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
        username: username || "",
      });
      setAvatarUrl(profile.avatar_url);
    }
  }, [profile, form]);

  const handleMain = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("username", values.username);
      const result = await editUserRegister(formData, userID);
      if (fileList.length > 0) {
        const photoProfile = new FormData();
        photoProfile.append("avatar", fileList[0].originFileObj);
        const result = await editProfile(photoProfile, userID);
        updatePhotoProfile(`./upload/${fileList[0].name}`);
      }
      updateUsername(values.username);
      authStorage.storeUsername(values.username);
      setIsMain(false);
      notification.success({
        message: "Edit Successfully",
        description: `Success to edit ${isEditing ? "profile" : "address"}`,
      });
    } catch (error) {
      notification.error({
        message: "Failed Edit",
        description: "Check Your Input Edit",
      });
      throw error;
    }
  };

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

      isEditing
        ? setIsEditing(false)
        : isAddress
        ? setIsAddress(false)
        : setIsMain(false);
    } catch (error) {
      notification.error({
        message: "Failed Edit",
        description: "Check Your Input Edit",
      });
      throw ("Validation Failed:", error);
    }
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj;
      setFilePreview(URL.createObjectURL(file));
    } else {
      setFilePreview(null);
    }
  };

  return (
    <Card className="m-4">
      <Text className="text-slate-700 font-semibold font-poppins text-lg">
        My Profile
      </Text>
      {!isLoading ? (
        <Card className="my-4">
          <div className="flex flex-wrap justify-between">
            <div className="flex justify-end w-full">
              <Button
                className="text-xs block md:hidden"
                onClick={() => (isMain ? handleMain() : setIsMain(true))}
              >
                {isMain ? (
                  <span>
                    Save <SaveOutlined />
                  </span>
                ) : (
                  <span>
                    Edit <EditOutlined />
                  </span>
                )}
              </Button>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Avatar
                  size={80}
                  src={
                    <Image
                      src={filePreview ? filePreview : `${url}/${avatarUrl}`}
                    />
                  }
                  className="shadow-md"
                />
                {isMain && (
                  <Upload
                    beforeUpload={() => false}
                    maxCount={1}
                    onChange={handleFileChange}
                    showUploadList={false} // Hide default file list
                  >
                    <Button
                      className="absolute bottom-0 right-0"
                      icon={<UploadOutlined />}
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        border: "none",
                      }}
                    />
                  </Upload>
                )}
              </div>
              <div className="flex flex-col justify-center items-start ml-4">
                <Form
                  style={{
                    margin: "0",
                    padding: "0",
                  }}
                  className=""
                  form={form}
                  disabled={!isMain}
                >
                  <Form.Item
                    name="username"
                    style={{
                      margin: "0",
                      padding: "0",
                    }}
                    rules={[
                      {
                        required: isMain ? true : false,
                        message: "username is required",
                      },
                    ]}
                  >
                    <Input
                      prefix={isMain && <EditOutlined />}
                      placeholder="username"
                      className="text-xs md:text-base bg-white font-semibold font-poppins p-0 text-slate-800 border-none !outline-none"
                      disabled={!isMain}
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        pointerEvents: !isMain ? "none" : "auto", // Hindari klik saat disable
                      }}
                    />
                  </Form.Item>
                </Form>
                <Text className="text-xs md:text-base text-gray-500 font-medium">
                  {main.role}
                </Text>
                <Text className="text-[8px] md:text-base text-gray-500 font-light">
                  {profile.city} {profile.state_or_province}, {profile.country}
                </Text>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Button
                className="hidden md:block"
                onClick={() => (isMain ? handleMain() : setIsMain(true))}
              >
                {isMain ? (
                  <span>
                    Save <SaveOutlined />
                  </span>
                ) : (
                  <span>
                    Edit <EditOutlined />
                  </span>
                )}
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
            <div className="flex justify-between gap-1 md:gap-0 items-center mb-8">
              <Text className="text-xs md:text-base text-slate-700 font-semibold font-poppins">
                Personal Information
              </Text>
              <Button
                className="text-xs md:text-base"
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
                      className="text-xs md:text-base"
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
                        className="text-xs md:text-base bg-white font-poppins text-black border-none !outline-none"
                        disabled={!isEditing}
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          pointerEvents: !isEditing ? "none" : "auto", // Hindari klik saat disable
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      className="text-xs md:text-base"
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
                        className="bg-white text-xs md:text-base font-poppins text-black border-none !outline-none"
                        disabled={!isEditing}
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          pointerEvents: !isEditing ? "none" : "auto",
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      className="text-xs md:text-base"
                      label="Gender"
                      name="gender"
                    >
                      <Input
                        placeholder="Gender"
                        className="bg-white text-xs md:text-base font-poppins text-black border-none !outline-none"
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
                      className="text-xs md:text-base"
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
                        className="bg-white text-xs md:text-base font-poppins border-none !outline-none"
                        disabled={!isEditing}
                        style={{
                          backgroundColor: "white",
                          color: !isEditing && "black",
                          pointerEvents: !isEditing ? "none" : "auto",
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      className="text-xs md:text-base"
                      label="Phone"
                      name="phone"
                    >
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
                    <Form.Item
                      className="text-xs md:text-base"
                      label="Bio"
                      name="bio"
                    >
                      <Input
                        placeholder="Bio"
                        className="bg-white text-xs md:text-base font-poppins text-black border-none !outline-none"
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
              <Text className="text-xs md:text-base text-slate-700 font-semibold font-poppins">
                Address
              </Text>
              <Button
                className="text-xs md:text-base"
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
                      className="text-xs md:text-base"
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
                        className="bg-white text-xs md:text-base font-poppins text-black border-none !outline-none"
                        disabled={!isAddress}
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          pointerEvents: !isAddress ? "none" : "auto", // Hindari klik saat disable
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      className="text-xs md:text-base"
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
                        className="bg-white text-xs md:text-base font-poppins text-black border-none !outline-none"
                        disabled={!isAddress}
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          pointerEvents: !isAddress ? "none" : "auto",
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      className="text-xs md:text-base"
                      label="City"
                      name="city"
                    >
                      <Input
                        placeholder="City"
                        className="bg-white text-xs md:text-base font-poppins text-black border-none !outline-none"
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
                      className="text-xs md:text-base"
                      label="Address Line 2 (optional)"
                      name="addressLine2"
                    >
                      <Input
                        placeholder="Address line 2"
                        className="bg-white text-xs md:text-base font-poppins border-none !outline-none"
                        disabled={!isAddress}
                        style={{
                          backgroundColor: "white",
                          color: !isAddress && "black",
                          pointerEvents: !isAddress ? "none" : "auto",
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      className="text-xs md:text-base"
                      label="State/Province"
                      name="province"
                    >
                      <Input
                        placeholder="state/province"
                        className="bg-white text-xs md:text-base font-poppins text-black border-none outline-none "
                        disabled={!isAddress}
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          pointerEvents: !isAddress ? "none" : "auto",
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      className="text-xs md:text-base"
                      label="Landmark"
                      name="landmark"
                    >
                      <Input
                        placeholder="Landmark"
                        className="bg-white text-xs md:text-base font-poppins text-black border-none !outline-none"
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
