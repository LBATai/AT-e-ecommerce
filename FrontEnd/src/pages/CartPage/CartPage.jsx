import React, { useState } from "react";
import {
  Row,
  Col,
  Table,
  InputNumber,
  Button,
  Card,
  Radio,
  Space,
  Input,
  Modal,
} from "antd";
import {
  MinusOutlined,
  PlusOutlined,
  CreditCardOutlined,
  PayCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { FaPaypal } from "react-icons/fa";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      format: "Digital",
      quantity: 2,
      price: 240000,
      img: "https://i.imgur.com/2DsA49b.webp",
    },
    {
      id: 2,
      title: "Homo Deus: A Brief History of Tomorrow",
      author: "Yuval Noah Harari",
      format: "Paperback",
      quantity: 1,
      price: 324000,
      img: "https://i.imgur.com/Oj1iQUX.webp",
    },
  ]);

  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [updatedItems, setUpdatedItems] = useState(cartItems);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.img}
            alt={record.title}
            style={{ width: 80, marginRight: 16, borderRadius: 8 }}
          />
          <div>
            <p style={{ margin: 0, fontWeight: 500 }}>{record.title}</p>
            <p style={{ margin: 0, fontSize: 12, color: "gray" }}>
              {record.author}
            </p>
          </div>
          <Button
            icon={<DeleteOutlined />}
            style={{ marginLeft: "auto" }}
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "format",
      key: "format",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button icon={<MinusOutlined />} onClick={() => changeQuantity(record.id, -1)} />
          <InputNumber
            min={1}
            value={record.quantity}
            style={{ width: 60, margin: "0 8px" }}
            onChange={(value) => changeQuantity(record.id, value - record.quantity)}
          />
          <Button icon={<PlusOutlined />} onClick={() => changeQuantity(record.id, 1)} />
        </div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price, record) => `${(price * record.quantity).toLocaleString()} VND`,
    },
  ];

  const handleDelete = (record) => {
    setIsModalVisible(true);
    setItemToDelete(record);
  };

  const changeQuantity = (id, delta) => {
    setUpdatedItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + delta);
          
          // Nếu số lượng là 0, gọi handleDelete để hiển thị modal
          if (newQuantity === 0) {
            handleDelete(item); // Hiển thị modal xác nhận xóa
          }
          
          return {
            ...item,
            quantity: newQuantity,
          };
        }
        return item;
      })
    );
  };

  const total = updatedItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const handleOk = () => {
    if (itemToDelete.quantity === 0) {
      setCartItems(cartItems.filter((item) => item.id !== itemToDelete.id));
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Row gutter={[16, 16]} style={{ padding: 24, marginTop: "100px" }}>
      <Col xs={24} lg={16}>
        <Table
          dataSource={updatedItems}
          columns={columns}
          pagination={false}
          rowKey="id"
          bordered
        />
      </Col>
      <Col xs={24} lg={8}>
        <Card title="Thanh toán" bordered>
          <Radio.Group
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            style={{ width: "100%" }}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <Radio value="credit" style={{ width: "100%" }}>
                <CreditCardOutlined style={{ marginRight: 8 }} /> Thẻ tín dụng
              </Radio>
              <Radio value="debit" style={{ width: "100%" }}>
                <PayCircleOutlined style={{ marginRight: 8 }} /> Thẻ ghi nợ
              </Radio>
              <Radio value="paypal" style={{ width: "100%" }}>
                <FaPaypal style={{ marginRight: 8, color: "#003087" }} /> PayPal
              </Radio>
              <Radio value="cod" style={{ width: "100%" }}>
                Thanh toán khi nhận hàng
              </Radio>
            </Space>
          </Radio.Group>
          {paymentMethod !== "cod" && (
            <Space direction="vertical" size="large" style={{ width: "100%", marginTop: 16 }}>
              <Input placeholder="Tên trên thẻ" />
              <Input placeholder="Số thẻ" />
              <Space style={{ width: "100%" }}>
                <Input placeholder="MM/YY" style={{ flex: 1 }} />
                <Input placeholder="CVV" style={{ flex: 1 }} />
              </Space>
            </Space>
          )}
          <div
            style={{
              marginTop: 24,
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 500,
            }}
          >
            <span>Tổng cộng:</span>
            <span>{total.toLocaleString()} VND</span>
          </div>
          <Button
            type="primary"
            size="large"
            style={{ marginTop: 16, width: "100%" }}
          >
            Thanh toán
          </Button>
        </Card>
      </Col>

      {/* Modal xác nhận xóa sản phẩm */}
      <Modal
        title="Xóa sản phẩm"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>Bạn có muốn xóa sản phẩm này không?</p>
      </Modal>
    </Row>
  );
};

export default CartPage;
