import React, { useState } from "react";
import {
  Col,
  Row,
  Card,
  List,
  Input,
  Carousel,
  FloatButton,
  Modal,
  Popconfirm,
  Drawer,
  Button,
  Spin,
} from "antd";
import {
  PlusCircleOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

const dummyData = [
  {
    id: 1,
    name: "Tumpukan Sampah di Sisi Barat Desa Bengkala Terbakar",
    img: "https://www.balipost.com/wp-content/uploads/2024/10/balipostcom_tumpukan-sampah-di-sisi-barat-tpa-bengkala-terbakar_01.jpeg",
    description:
      " SINGARAJA, BALIPOST.com Cuaca panas ekstrim yang melanda wilayah Kabupaten Buleleng sejak beberapa pekan terakhir mengakibatkan tumpukan sampah di Tempat Pembuangan Akhir (TPA) Bengkala di Desa Bengkala, Kecamatan Kubutambahan terbakar. Bahkan sebelum kebakaran terjadi, warga sekitar mendengar suara letupan.",
  },
  {
    id: 2,
    name: "Hujan Deras mengakibatkan Pondasi Kantor Desa Bengkala Ambruk",
    img: "https://bengkala-buleleng.desa.id/assets/files/artikel/kecil_1653878366281542221_1251485228991929_1989223881699416682_n.jpg",
    description:
      "Hujan Deras mengakibatkan Pondasi Kantor Desa Bengkala Ambruk. Satpol PP Kecamatan Kubutambahan Terjun Langsung kelokasi Longsor di Desa Bengkala.",
  },
  {
    id: 3,
    name: "Janger Kolok di Desa Bengkala : Sejarah",
    img: "https://akcdn.detik.net.id/community/media/visual/2023/09/17/tari-janger-kolok-dibawakan-oleh-penyandang-disabilitas-dari-desa-bengkala_169.jpeg?w=700&q=90",
    description:
      "Sejarah Sekaa dan Tari Janger Kolok. Pencipta dari tari ini adalah Almarhum Wayan Nedeng yang merupakan penduduk asli Desa Bengkala.",
  },
];

const News = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading

  const showModal = (newsItem) => {
    setSelectedNews(newsItem);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setIsDrawerVisible(false);
  };

  const filteredData = dummyData.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleEdit = (item) => {
    setLoading(true);
    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
      // Add your edit logic here
      console.log("Editing:", item);
      // Optionally close the modal or do something else
    }, 2000);
  };

  const handleDelete = (item) => {
    setLoading(true);
    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
      // Add your delete logic here
      console.log("Deleting:", item);
      // Optionally remove the item from the list or do something else
    }, 2000);
  };

  return (
    <div className="layout-content">
      <Row gutter={[24, 0]}>
        <Col xs={24} className="mb-24">
          <Card bordered={false} className="criclebox h-full w-full">
            <FloatButton
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={showDrawer}
            />
            <Carousel autoplay>
              {filteredData.map((item, index) => (
                <div key={index} className="relative">
                  <img
                    src={item.img}
                    alt={`Slide ${index + 1}`}
                    className="h-[350px] w-full rounded-md transition-all ease-in-out duration-500"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 rounded-md"></div>
                </div>
              ))}
            </Carousel>

            <Input
              style={{ marginBottom: "10px", marginTop: "20px" }}
              placeholder="Cari di sini..."
              prefix={<SearchOutlined />}
              className="header-search"
              allowClear
              size="large"
              onChange={(e) => setSearchValue(e.target.value)}
            />

            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 2,
                lg: 3,
                xl: 3,
              }}
              dataSource={filteredData}
              renderItem={(item) => (
                <List.Item style={{ marginBottom: "20px", marginTop: "20px" }}>
                  <Card
                    cover={
                      <div className="h-[300px]">
                        <img
                          src={item.img}
                          onClick={() => showModal(item)}
                          alt={item.name}
                          className="rounded-md h-full w-full object-cover"
                        />
                      </div>
                    }
                    style={{
                      transition: "transform 0.3s",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                    className="hover:scale-90 transition-all ease-in-out duration-500 cursor-pointer h-400, w-100"
                  >
                    <Meta
                      title={item.name}
                      description={
                        <p className="line-clamp-3">{item.description}</p>
                      }
                    />
                    <div className="flex justify-between mt-2">
                      <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(item);
                        }}
                      />
                      <Popconfirm
                        title="Are you sure to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDelete(item)}
                      >
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        />
                      </Popconfirm>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Modal
        title="News Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={900}
        footer={null} // Disable default footer
      >
        <div className="mx-[30px]">
          {loading ? (
            <div className="flex justify-center items-center">
              <Spin size="large" />
            </div>
          ) : (
            selectedNews && (
              <>
                <Row gutter={16}>
                  <Col span={12}>
                    <img
                      src={selectedNews.img}
                      alt={selectedNews.name}
                      className="w-full h-auto rounded-md"
                    />
                  </Col>
                  <Col span={12}>
                    <h3 className="my-5 text-xl font-semibold">
                      {selectedNews.name}
                    </h3>
                    <p className="text-gray-700">{`${selectedNews.description.slice(
                      0,
                      100
                    )}...`}</p>
                  </Col>
                </Row>
              </>
            )
          )}
        </div>
      </Modal>

      <Drawer
        title="Add/Edit News"
        placement="right"
        onClose={onCloseDrawer}
        open={isDrawerVisible}
        width={450}
      >
        <div>
          <h3>Title</h3>
          <Input placeholder="Enter news title" />
          <h3>Description</h3>
          <Input.TextArea placeholder="Enter news description" rows={4} />
          <h3>Image URL</h3>
          <Input placeholder="Enter image URL" />
          <Button type="primary" className="mt-4" onClick={onCloseDrawer}>
            Save Changes
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default News;
