import React, { useState, useEffect } from "react";
import { Row, Col, Space, Tag, Typography, Button, Modal, Form, Input, Switch, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { AddressCard } from "./style";
import {
  createOrderAddress,
  getAllOrderAddresses,
  updateOrderAddress,
  deleteOrderAddress,
} from "../../Service/OrderAddressService";
import { useSelector } from 'react-redux';
const { Title, Text } = Typography;

const OrderAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const user = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchAddresses()
  }, [])

  const fetchAddresses = async () => {
    try {
      const res = await getAllOrderAddresses(user.id, user.access_token)
      if (res && res.data) {
        setAddresses(res.data)
      }
    } catch (error) {
      console.log('err', error)
    }
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setEditingAddress(null);
  };

  const handleAddAddress = () => {
    form.resetFields();
    setEditingAddress(null);
    showModal();
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address)
    form.setFieldsValue(address);
    showModal();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      let data = { ...values, user: user.id };


      if (data.isDefault) {
        // Nếu có đánh dấu là mặc định thì phải tìm address nào đang mặc định bỏ đi
        const updatedAddresses = addresses.map(address => {
          if (address.isDefault) {
            return { ...address, isDefault: false }
          }
          return address;
        })

        // Update các address cũ về isDefault: false trước khi update or create
        await Promise.all(updatedAddresses.map(async (address) => {
          if (address._id) {
            await updateOrderAddress(address._id, address, user.access_token)
          }
        }))

      }


      if (editingAddress) {
        const res = await updateOrderAddress(editingAddress._id, data, user.access_token)
        if (res.status === 'OK') {
          message.success("Cập nhật địa chỉ thành công");
          fetchAddresses()
        } else {
          message.error("Cập nhật địa chỉ thất bại");
        }
      } else {
        const res = await createOrderAddress(data, user.access_token);
        if (res.status === 'success') {
          message.success("Thêm địa chỉ thành công");
          fetchAddresses()
        } else {
          message.error("Thêm địa chỉ thất bại");
        }
      }
      handleCancel();
    } catch (error) {
      message.error("Có lỗi xảy ra. Vui lòng thử lại");
      console.log("error:", error);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      const res = await deleteOrderAddress(id, user.access_token)
      if (res.status === 'OK') {
        message.success("Xóa địa chỉ thành công");
        fetchAddresses()
      } else {
        message.error("Xóa địa chỉ thất bại");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra. Vui lòng thử lại");
      console.log("error:", error);
    }
  };

  const renderAddresses = () => (
    <>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Title level={4}>Sổ địa chỉ</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddAddress}>
          Thêm địa chỉ mới
        </Button>
      </Row>
      <Row gutter={[16, 16]}>
        {addresses.map((address) => (
          <Col xs={24} sm={12} key={address._id}>
            <AddressCard>
              <div className="address-header">
                <Space>
                  <Text strong>{address.name}</Text>
                  {address.isDefault && <Tag color="blue">Mặc định</Tag>}
                </Space>
                <Space>
                  <Button
                    icon={<EditOutlined />}
                    type="text"
                    onClick={() => handleEditAddress(address)}
                  />
                  <Button
                    icon={<DeleteOutlined />}
                    type="text"
                    onClick={() => handleDeleteAddress(address._id)}
                  />
                </Space>
              </div>
              <div style={{ marginTop: 16 }}>
                <Text strong display="block">{address.recipient}</Text>
                <Text type="secondary" display="block">{address.phone}</Text>
                <Text>{address.address}</Text>
              </div>
            </AddressCard>
          </Col>
        ))}
      </Row>
      <Modal
        title={editingAddress ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên người nhận"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên địa chỉ" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="isDefault" valuePropName="checked">
            <Switch
              checkedChildren="Mặc định"
              unCheckedChildren="Không mặc định"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );

  return <div>{renderAddresses()}</div>;
};

export default OrderAddress;