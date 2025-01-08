import React from 'react'
import { Modal, Typography, Button } from 'antd';

const {Text} = Typography

const ModalDelete = ({modal, handleDelete, handleModal, subject}) => {
  return (
    <Modal
        open={modal}
        onCancel={handleModal}
        centered
        footer={null} // Hapus footer default
        width={400}
      >
        <div className="flex flex-col justify-center items-center p-6">
          <div className="mb-4 w-[250px] text-center">
            <Text className="text-lg font-bold text-gray-800 font-poppins">
              Do you really want to delete the {subject}?
            </Text>
          </div>

          <div className="w-[250px]">
            <img
              src="./imgs/deleteUser.png"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex gap-4">
            <Button
              type="primary"
              danger
              onClick={() => {
                handleDelete();
                handleModal(); // Tutup modal setelah delete
              }}
            >
              Yes
            </Button>
            <Button
              type="normal"
              className="bg-slate-800 hover:bg-slate-700 text-white"
              onClick={handleModal} // Tutup modal tanpa delete
            >
              No
            </Button>
          </div>
        </div>
      </Modal>
  )
}

export default ModalDelete