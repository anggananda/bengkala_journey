import React, { useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  LikeOutlined,
  MoreOutlined,
  ShoppingCartOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Drawer, Button, Input, Upload, message } from "antd";

const CulturalHeritage = () => {
  const [searchText, setSearchText] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [comments, setComments] = useState({});
  const [selectedDescription, setSelectedDescription] = useState("");
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(null);

  // New states for the drawer
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [kainName, setKainName] = useState("");
  const [kainDescription, setKainDescription] = useState("");
  const [fileList, setFileList] = useState([]);

  const kainTenunItems = [
    {
      id: 1,
      title: "Tenun Songket",
      description:
        "Tenun Songket adalah jenis kain tradisional yang dibuat dengan teknik menenun menggunakan benang emas atau perak sebagai hiasan. Kain ini biasanya dikenakan dalam upacara adat atau acara penting seperti pernikahan. Motif songket yang rumit melambangkan kemakmuran dan keanggunan. Proses pembuatannya membutuhkan keterampilan tinggi karena benang emas atau perak harus disisipkan secara manual ke dalam tenunan utama. Tenun Songket tidak hanya menunjukkan keindahan seni tradisional, tetapi juga nilai budaya yang tinggi.",
      image: "./imgs/g1.jpeg",
    },
    {
      id: 2,
      title: "Tenun Endek Bengkala",
      description:
        "Tenun Endek Bengkala berasal dari Desa Bengkala, Bali, dan terkenal dengan motifnya yang unik dan sarat makna. Pola khas Bali yang terinspirasi dari alam, seperti bunga, burung, atau motif geometris, memberikan sentuhan khas pada kain ini. Endek Bengkala sering digunakan untuk keperluan adat maupun pakaian sehari-hari. Proses pembuatannya melibatkan pewarnaan alami dari tumbuh-tumbuhan, yang tidak hanya ramah lingkungan tetapi juga memberikan warna yang tahan lama.",
      image: "./imgs/g2.jpeg",
    },
    {
      id: 3,
      title: "Tenun Gringsing",
      description:
        "Tenun Gringsing adalah kain tenun tradisional yang hanya dapat ditemukan di Desa Tenganan, Bali. Nama 'Gringsing' berasal dari kata 'gring' yang berarti sakit dan 'sing' yang berarti tidak, sehingga kain ini dipercaya memiliki kekuatan magis untuk mengusir penyakit. Proses pembuatannya sangat rumit, menggunakan teknik ikat ganda yang membutuhkan waktu bertahun-tahun. Motifnya mencerminkan kepercayaan dan filosofi masyarakat setempat, seperti perlindungan dan harmoni dengan alam.",
      image: "./imgs/g3.jpeg",
    },
    {
      id: 4,
      title: "Tenun Lurik",
      description:
        "Tenun Lurik adalah kain tradisional yang berasal dari Jawa dan dikenal dengan motif garis-garisnya yang sederhana namun elegan. Kata 'lurik' berasal dari bahasa Jawa yang berarti 'garis' atau 'garis-garis kecil'. Kain ini sering digunakan dalam pakaian adat atau sebagai pelengkap kostum seni tradisional. Filosofi di balik motifnya melambangkan kerendahan hati, ketekunan, dan kesederhanaan. Tenun Lurik kini juga telah dimodifikasi untuk busana modern, sehingga tetap relevan di era kontemporer.",
      image: "./imgs/g4.jpeg",
    },
    {
      id: 5,
      title: "Tenun Bali Pesisir",
      description:
        "Tenun Bali Pesisir adalah kain yang terinspirasi oleh kehidupan masyarakat pesisir di Bali. Motifnya sering menggambarkan elemen laut, seperti ikan, ombak, atau terumbu karang. Tenun ini memiliki warna-warna cerah yang mencerminkan semangat dan dinamika kehidupan pesisir. Selain menjadi pakaian adat, kain ini juga mulai populer sebagai bahan untuk aksesoris dan dekorasi rumah. Proses pembuatannya mencerminkan hubungan erat antara masyarakat pesisir dan alam sekitar mereka.",
      image: "./imgs/g5.jpeg",
    },
    {
      id: 6,
      title: "Tenun Celup",
      description:
        "Tenun Celup adalah kain tradisional yang menggunakan teknik pewarnaan alami dari daun, akar, atau kulit kayu. Teknik ini memberikan warna-warna alami yang lembut dan tahan lama. Setiap kain memiliki keunikan tersendiri karena hasil pewarnaan tergantung pada bahan alami yang digunakan dan prosesnya. Tenun Celup sering dihargai karena ramah lingkungan dan cocok untuk pakaian santai maupun formal. Keindahan kain ini terletak pada kesederhanaannya yang tetap memancarkan keanggunan.",
      image: "./imgs/g6.jpeg",
    },
  ];

  const filteredItems = kainTenunItems.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleFavorite = (item) => {
    setFavorites((prev) =>
      prev.includes(item.id)
        ? prev.filter((id) => id !== item.id)
        : [...prev, item.id]
    );
  };

  const handleDescriptionClick = (description) => {
    setSelectedDescription(description);
    setDescriptionModalVisible(true);
  };

  const closeDescriptionModal = () => {
    setDescriptionModalVisible(false);
  };

  const handleCommentSubmit = (item) => {
    const comment = comments[item.id];
    if (comment && comment.trim()) {
      alert(`Komentar untuk "${item.title}": ${comment}`);
      setComments((prev) => ({ ...prev, [item.id]: "" })); // Kosongkan komentar setelah dikirim
    }
  };

  const handleMoreOptionsClick = (id) => {
    setDropdownVisible((prev) => (prev === id ? null : id));
  };

  const handleEdit = (id) => {
    alert(`Edit item dengan ID: ${id}`);
    setDropdownVisible(null); // Tutup dropdown setelah klik
  };

  const handleDelete = (id) => {
    alert(`Hapus item dengan ID: ${id}`);
    setDropdownVisible(null); // Tutup dropdown setelah klik
  };

  // Drawer control
  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
    setKainName("");
    setKainDescription("");
    setFileList([]);
  };

  // Handle file upload change
  const handleUploadChange = (info) => {
    if (info.fileList.length > 0) {
      setFileList(info.fileList);
    }
  };

  // Handle save data
  const handleSaveData = () => {
    if (!kainName || !kainDescription || fileList.length === 0) {
      message.error("Please fill all fields and upload an image.");
      return;
    }
    message.success("Data saved successfully!");
    onCloseDrawer();
  };

  return (
    <div className="bg-white p-6">
      <div
        className="p-6 mb-6 rounded-lg shadow-md bg-cover bg-bottom"
        style={{ backgroundImage: "url('./imgs/gambar.jpeg')" }}
      >
        <h1 className="text-white text-2xl font-bold font-dancing-script drop-shadow-lg">
          Warisan Budaya Kain Tenun Kolok
        </h1>
        <p className="text-white text-sm mt-2 drop-shadow-md">
          Kain tenun Kolok merupakan salah satu warisan budaya yang sangat
          berharga dari Desa Bengkala, Bali. Kain Tenun Kolok adalah salah satu
          jenis kain tradisional yang berasal dari Desa Bengkala, yang terletak
          di Kecamatan Kubutambahan, Kabupaten Buleleng, Bali, Indonesia. Kain
          ini memiliki nilai budaya yang tinggi dan merupakan salah satu warisan
          budaya yang sangat dihargai di Bali.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Cari Kain Tenun..."
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
          onChange={(e) => setSearchText(e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="relative bg-white border border-gray-100 rounded-lg shadow-md"
            >
              <img
                src={item.image}
                alt={item.title}
                className="rounded-t-lg w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <div className="relative">
                    <MoreOutlined
                      className="text-xl cursor-pointer"
                      onClick={() => handleMoreOptionsClick(item.id)}
                    />
                    {dropdownVisible === item.id && (
                      <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-10">
                        <button
                          onClick={() => handleEdit(item.id)}
                          className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <EditOutlined className="mr-2" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <DeleteOutlined className="mr-2" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <p
                  className="text-gray-600 mt-2 cursor-pointer"
                  onClick={() => handleDescriptionClick(item.description)}
                >
                  {item.description.slice(0, 100)}...
                </p>
                <div className="flex items-center mt-2">
                  <textarea
                    value={comments[item.id] || ""}
                    onChange={(e) =>
                      setComments((prev) => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }))
                    }
                    placeholder="Tulis komentar..."
                    className="flex-grow p-2 border border-gray-300 rounded-lg resize-none"
                    rows="2"
                  ></textarea>
                  <button
                    onClick={() => handleCommentSubmit(item)}
                    className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <SendOutlined />
                  </button>
                </div>
              </div>
              <div className="flex justify-center items-center py-2 border-t">
                <LikeOutlined
                  className={`text-xl cursor-pointer ${
                    favorites.includes(item.id)
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => handleFavorite(item)}
                />
                <div className="border-l h-6 mx-6"></div>
                <ShoppingCartOutlined className="text-xl text-gray-500 cursor-pointer" />
              </div>
            </div>
          ))}
        </div>

        {/* Upload Drawer */}
        <Button
          type="primary"
          icon={<UploadOutlined />}
          onClick={showDrawer}
          className="mt-6"
        >
          Upload Kain
        </Button>
      </div>

      <Drawer
        title="Upload Kain"
        visible={drawerVisible}
        onClose={onCloseDrawer}
        width={400}
      >
        <div className="mb-4">
          <Input
            placeholder="Nama Kain"
            value={kainName}
            onChange={(e) => setKainName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Input.TextArea
            placeholder="Deskripsi Kain"
            value={kainDescription}
            onChange={(e) => setKainDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Upload
            action="/upload" // action endpoint
            listType="picture"
            fileList={fileList}
            onChange={handleUploadChange}
          >
            <Button icon={<UploadOutlined />}>Upload Foto</Button>
          </Upload>
        </div>
        <Button type="primary" onClick={handleSaveData}>
          Save Data
        </Button>
      </Drawer>

      {descriptionModalVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeDescriptionModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold">Deskripsi Lengkap</h3>
            <p className="mt-2">{selectedDescription}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={closeDescriptionModal}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CulturalHeritage;
