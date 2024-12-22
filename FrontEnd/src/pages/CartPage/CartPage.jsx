import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, Table, InputNumber, Button, Modal, Input } from "antd";
import { MinusOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { increaseAmount, decreaseAmount, removeOrderProduct, removeOrderAllProduct, updateStock } from "../../components/redux/Slide/orderSlide";
import { formatCurrencyVND } from "../../utils";

const CartPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updatedItems, setUpdatedItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isCheckoutModalVisible, setIsCheckoutModalVisible] = useState(false);
  const [isEditAddressModalVisible, setIsEditAddressModalVisible] = useState(false);
  const [checkoutInfo, setCheckoutInfo] = useState({ name: "", address: "", phone: "" });

  useEffect(() => {
    if (user) {
      setCheckoutInfo({
        name: user.name || "",
        address: user.address || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (order?.orderItems) {
      const transformedItems = order.orderItems.map((item) => ({
        id: item.product,
        name: item.name,
        type: item.type,
        amount: item.amount,
        price: item.price,
        image: item.image,
        product: item.product,
        color: item.color,
        size: item.size,
      }));
      setUpdatedItems(transformedItems);
    }
  }, [order]);

  const columns = [
    {
      title: () => (
        <>
          Sản phẩm
          {updatedItems.length > 0 && (
            <span className="ml-2">({updatedItems.length})</span>
          )}
        </>
      ),
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center">
          <img
            src={record.image}
            alt={record.name}
            className="w-20 mr-4 rounded-md"
          />
          <div>
            <p className="m-0 font-medium">{record.name}</p>
          </div>
          <Button
            icon={<DeleteOutlined />}
            className="ml-auto"
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Màu sắc",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Kích thước",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      key: "amount",
      render: (_, record) => (
        <div className="flex items-center">
          <Button
            icon={<MinusOutlined />}
            onClick={() => handleAmountChange(record.id, -1)}
            className="bg-gray-300 hover:bg-gray-400"
          />
          <InputNumber
            min={1}
            value={record.amount}
            className="w-16 mx-2"
            onChange={(value) => handleAmountChange(record.id, value - record.amount)}
          />
          <Button
            icon={<PlusOutlined />}
            onClick={() => handleAmountChange(record.id, 1)}
            className="bg-gray-300 hover:bg-gray-400"
          />
        </div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price, record) => {
        const total = price * record.amount;
        return formatCurrencyVND(total);
      },
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, selectedRows) => {
      let selectedIds = [];
      if (keys.length === updatedItems.length) {
        selectedIds = updatedItems.map((item) => item.id);
      } else {
        selectedIds = selectedRows.map((row) => row.id);
      }
      setSelectedRowKeys(selectedIds);
    },
  };

  const total = useMemo(() => {
    const selectedItems = updatedItems.filter((item) => selectedRowKeys.includes(item.id));
    return selectedItems.reduce((sum, item) => sum + item.amount * item.price, 0);
  }, [updatedItems, selectedRowKeys]);

  const checkTotal = useMemo(() => {
    const selectedItems = updatedItems.filter((item) => selectedRowKeys.includes(item.id));
    return selectedItems.reduce((sum, item) => sum + item.amount * item.price, 0);
  }, [updatedItems, selectedRowKeys]);

  const handlePayment = () => {
    const selectedItems = updatedItems.filter(item => selectedRowKeys.includes(item.id));
    setIsCheckoutModalVisible(false);
    navigate("/payment", { state: { totalAmount: total, itemsPrice: checkTotal, selectedItems } });
  };

  const handleCheckout = () => {
    if (!user.id) {
      Modal.confirm({
        title: "Bạn phải đăng nhập để mua hàng",
        content: "Bạn có chắc muốn đăng nhập không?",
        okText: "Đăng nhập",
        cancelText: "Hủy",
        onOk: () => {
          navigate("/sign-in", { state: location?.pathname });
        },
      });
    } else if (user) {
      setCheckoutInfo({
        name: user.name || "",
        address: user.address || "",
        phone: user.phone || "",
      });
      setIsCheckoutModalVisible(true);
    }
  };

  const handleRemoveAll = () => {
    Modal.confirm({
      title: "Xóa sản phẩm đã chọn",
      content: "Bạn có chắc muốn xóa các sản phẩm đã chọn không?",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: () => {
        dispatch(removeOrderAllProduct({ idProducts: selectedRowKeys }));
        setSelectedRowKeys([]);
      },
    });
  };

  const handleDelete = (record) => {
    setIsModalVisible(true);
    setItemToDelete(record);
  };

  const handleAmountChange = (id, delta) => {
    const item = updatedItems.find((item) => item.id === id);
    if (item) {
      if (delta > 0) {
        dispatch(increaseAmount({ idProduct: item.id }));
      } else if (delta < 0) {
        dispatch(decreaseAmount({ idProduct: item.id }));
      }
    }
  };

  const handleOk = () => {
    if (itemToDelete) {
      dispatch(removeOrderProduct({ idProduct: itemToDelete.id }));
      dispatch(updateStock({
        productId: itemToDelete.product,
        color: itemToDelete.color,
        size: itemToDelete.size,
        quantity: itemToDelete.amount,
        increase: true,
      }));
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (updatedItems.length === 0) {
    return (
      <Row className="p-6 mt-24 text-center">
        <Col span={24}>
          <h2>Giỏ hàng của bạn đang trống</h2>
          <Button type="primary" onClick={() => navigate("/")} className="mt-4">
            Quay lại trang mua sắm
          </Button>
        </Col>
      </Row>
    );
  }

  return (
    <Row gutter={[16, 16]} className="p-6 mt-24 mb-72">
      <Col xs={24} lg={16}>
        <div className="mb-4 flex items-center">
          {selectedRowKeys.length > 1 && (
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={handleRemoveAll}
              className="mb-4"
            >
              Xóa sản phẩm đã chọn
            </Button>
          )}
        </div>
        <Table
          dataSource={updatedItems}
          columns={columns}
          pagination={false}
          rowKey="id"
          rowSelection={rowSelection}
          bordered
          className="rounded-lg shadow-md"
        />
      </Col>

      <Col xs={24} lg={8}>
        <div className="flex justify-between items-center p-2">
          <span>Địa chỉ giao hàng: {checkoutInfo.address}</span>
          <Button type="link" onClick={() => setIsEditAddressModalVisible(true)}>
            Chỉnh sửa
          </Button>
        </div>
        <div className="flex justify-between items-center p-2">
          <span>Tạm tính: </span>
          <span>{formatCurrencyVND(checkTotal)}</span>
        </div>
        <div className="flex justify-between items-center p-2">
          <span>Tổng số sản phẩm: </span>
          <span>{selectedRowKeys.length}</span>
        </div>
        <div className="mt-6 flex justify-between font-medium text-xl">
          <span>Tổng cộng: </span>
          <span className="text-red-600">{formatCurrencyVND(total)}</span>
        </div>
        <Button
          type="primary"
          size="large"
          className="mt-4 w-full"
          disabled={selectedRowKeys.length === 0}
          onClick={handleCheckout}
        >
          Mua hàng
        </Button>
      </Col>

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

      <Modal
        title="Thông tin thanh toán"
        open={isCheckoutModalVisible}
        onOk={handlePayment}
        onCancel={() => setIsCheckoutModalVisible(false)}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <div className="mb-4">
          <p>Họ và tên:</p>
          <Input
            placeholder="Nhập họ và tên"
            value={checkoutInfo.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>
        <div className="mb-4">
          <p>Địa chỉ:</p>
          <Input
            placeholder="Nhập địa chỉ"
            value={checkoutInfo.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
        </div>
        <div className="mb-4">
          <p>Số điện thoại:</p>
          <Input
            placeholder="Nhập số điện thoại"
            value={checkoutInfo.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
        </div>
      </Modal>

      <Modal
        title="Bạn có muốn thay đổi địa chỉ hiện tại không?"
        open={isEditAddressModalVisible}
        onOk={() => {
          setIsEditAddressModalVisible(false);
          navigate("/profile", { state: { activeTab: "3" } });
        }}
        onCancel={() => setIsEditAddressModalVisible(false)}
        okText="Thay đổi"
        cancelText="Hủy"
      >
        <div className="mb-4">
          <Input
            placeholder="Nhập địa chỉ mới"
            value={checkoutInfo.address}
            disabled
          />
        </div>
      </Modal>
    </Row>
  );
};

export default CartPage;
