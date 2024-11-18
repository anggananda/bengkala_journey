import React from "react";
import { Row, Col, Card } from "antd";

const AboutUs = () => {
  return (
    <div className="bg-gray-200">
      <div className="relative p-[100px] bg-cover bg-center bg-[url('./imgs/Judul.jpg')]">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative text-white flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-5">Bengkala Journey</h1>
          <p className="text-xl mb-5 leading-relaxed text-center">
            Website ini akan menyoroti Desa Bengkala, sebuah desa unik di Bali
            yang dikenal karena memiliki komunitas besar penyandang tunarungu
            yang disebut "Kolok." Desa ini sangat istimewa karena seluruh
            masyarakatnya menggunakan bahasa isyarat lokal yang dikenal sebagai
            Kata Kolok untuk berkomunikasi, menciptakan inklusivitas yang luar
            biasa dalam kehidupan sehari-hari. Website ini bertujuan untuk
            memperkenalkan keunikan budaya, tradisi, serta kehidupan sosial Desa
            Bengkala kepada dunia, sambil mempromosikan pariwisata inklusif dan
            budaya lokal yang kuat.
          </p>
        </div>
        <div>
          <body className="bg-gray-400"></body>
        </div>
      </div>
      <div className="team-section mb-[px]">
        <h2 className="p-[60px] text-center text-3xl font-bold">Our Team</h2>
        <Row gutter={[24, 16]}>
          <Col sm={24} md={6} ls={6} xl={6}>
            <Card className="hover:scale-90 transition-all ease-in-out duration-500">
              <img src="./imgs/angga.png" alt="Jane" />
              <div className="px-[16px] text-center">
                <h2 className="font-bold">Dwi Angga</h2>
                <p className="title">Team Pengembang</p>
                <p>dwiangga@gmail.com</p>
                <p>
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="button bg-transparent border border-black md-2 text-black rounded-md hover:bg-blue-700 hover:text-white transition-all ease-in-out duration-300">
                      Contact
                    </button>
                  </a>
                </p>
              </div>
            </Card>
          </Col>
          <Col sm={24} md={6} ls={6} xl={6}>
            <Card className="hover:scale-90 transition-all ease-in-out duration-500">
              <img src="./imgs/candra.jpg" alt="Mike" />
              <div className="px-[16px] text-center">
                <h2 className="font-bold">Ketut Candra Dipasanti</h2>
                <p className="title">Team Pengembang</p>
                <p>ketutcandra@gmail.com</p>
                <p>
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="button bg-transparent border border-black md-2 text-black rounded-md hover:bg-blue-700 hover:text-white transition-all ease-in-out duration-300">
                      Contact
                    </button>
                  </a>
                </p>
              </div>
            </Card>
          </Col>
          <Col sm={24} md={6} ls={6} xl={6}>
            <Card className="hover:scale-90 transition-all ease-in-out duration-500">
              <img src="./imgs/cahya.png" alt="John" />
              <div className="px-[16px] text-center">
                <h2 className="font-bold">Kadek Cahya Sugana Griadhi</h2>
                <p className="title">Team Pengembang</p>
                <p>cahyasugana@gmail.com</p>
                <p>
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="button bg-transparent border border-black md-2 text-black rounded-md hover:bg-blue-700 hover:text-white transition-all ease-in-out duration-300">
                      Contact
                    </button>
                  </a>
                </p>
              </div>
            </Card>
          </Col>
          <Col sm={24} md={6} ls={6} xl={6}>
            <Card className="hover:scale-90 transition-all ease-in-out duration-500">
              <img src="./imgs/yas.jpg" alt="Mike" />
              <div className="px-[16px] text-center">
                <h2 className="font-bold">Gusti Putu Yastika Putra</h2>
                <p className="title">Team Pengembang</p>
                <p>yastikaputragustiputu@gmail.com</p>
                <p>
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="button bg-transparent border border-black md-2 text-black rounded-md hover:bg-blue-700 hover:text-white transition-all ease-in-out duration-300">
                      Contact
                    </button>
                  </a>
                </p>
              </div>
            </Card>
          </Col>
        </Row>
        <div className="">
          <div className="column">
            <div className="card"></div>
          </div>

          <div className="column">
            <div className="card"></div>
          </div>

          <div className="column">
            <div className="card"></div>
          </div>
          <div className="column">
            <div className="card"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
