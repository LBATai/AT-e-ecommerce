import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, Table, InputNumber, Button, Modal } from "antd";
import { MinusOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { increaseAmount, decreaseAmount, removeOrderProduct, removeOrderAllProduct  } from "../../components/redux/Slide/orderSlide";
import { formatCurrencyVND } from "../../utils";

const CartPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [updatedItems, setUpdatedItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Các ID sản phẩm được chọn
  const navigate = useNavigate();

  // Chuyển đổi dữ liệu từ order.orderItems sang cấu trúc bảng
  useEffect(() => {
    if (order?.orderItems) {
      const transformedItems = order.orderItems.map((item) => ({
        id: item.product || item.productId,
        name: item.name,
        type: item.type,
        amount: item.amount,
        price: item.price,
        img: item.image,
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
            <span style={{ marginLeft: 8 }}>({updatedItems.length})</span>
          )}
        </>
      ),
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.img}
            alt={record.name}
            style={{ width: 80, marginRight: 16, borderRadius: 8 }}
          />
          <div>
            <p style={{ margin: 0, fontWeight: 500 }}>{record.name}</p>
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
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      key: "amount",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button icon={<MinusOutlined />} onClick={() => handleAmountChange(record.id, -1)} />
          <InputNumber
            min={1}
            value={record.amount}
            style={{ width: 60, margin: "0 8px" }}
            onChange={(value) => handleAmountChange(record.id, value - record.amount)}
          />
          <Button icon={<PlusOutlined />} onClick={() => handleAmountChange(record.id, 1)} />
        </div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price, record) => `${(price * record.amount).toLocaleString()} VND`,
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, selectedRows) => {
      let selectedIds = [];
      if (keys.length === updatedItems.length) {
        // Check All được nhấn, lấy tất cả ID từ updatedItems
        selectedIds = updatedItems.map((item) => item.id);
      } else {
        // Lấy danh sách ID từ các hàng được chọn
        selectedIds = selectedRows.map((row) => row.id);
      }
      setSelectedRowKeys(selectedIds); // Cập nhật danh sách ID đã chọn
      // console.log("Selected IDs:", selectedIds);
    },
  };
  
  // useEffect(() => {
  //   console.log("Selected IDs (from state):", selectedRowKeys);
  // }, [selectedRowKeys]);
  
  const handleRemoveAll = () => {
    Modal.confirm({
      title: "Xóa sản phẩm đã chọn",
      content: "Bạn có chắc muốn xóa các sản phẩm đã chọn không?",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: () => {
        dispatch(removeOrderAllProduct({ idProducts: selectedRowKeys })); // Truyền danh sách ID sản phẩm được chọn
        setSelectedRowKeys([]); // Xóa hết các sản phẩm được chọn
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

  const deliveryPriceMemo = useMemo(() => {
    const selectedItems = updatedItems.filter(item => selectedRowKeys.includes(item.id));
    const totalPrice = selectedItems.reduce((sum, item) => sum + item.amount * item.price, 0);
  
    if (totalPrice > 200000) {
      // Cộng thêm phí giao hàng 10.000 VND mỗi sản phẩm phù hợp
      return selectedItems.length * 10000;
    } else {
      return 0;
    }
  }, [updatedItems, selectedRowKeys]);
    

  const total = useMemo(() => {
    const selectedItems = updatedItems.filter((item) => selectedRowKeys.includes(item.id));
    const productTotal = selectedItems.reduce((sum, item) => sum + item.amount * item.price, 0);
  
    // Tính tổng giá bao gồm phí giao hàng
    const deliveryPrice = productTotal > 200000 ? selectedItems.length * 10000 : 0;
    return productTotal + deliveryPrice;
  }, [updatedItems, selectedRowKeys]);
  
  const handleAddCart = () => {

  }
  const handleOk = () => {
    dispatch(removeOrderProduct({ idProduct: itemToDelete.id }));
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  if (updatedItems.length === 0) {
    return (
      <Row style={{ padding: 24, marginTop: "100px", textAlign: "center" }}>
        <Col span={24}>
          <h2>Giỏ hàng của bạn đang trống</h2>
          <Button type="primary" onClick={() => navigate("/")} style={{ marginTop: 16 }}>
            Quay lại trang mua sắm
          </Button>
        </Col>
      </Row>
    );
  }

  return (
    <Row gutter={[16, 16]} style={{ padding: 24, marginTop: "100px" }}>
      <Col xs={24} lg={16}>
      <div style={{ marginBottom: 16, height: 40, display: "flex", alignItems: "center"}}>
        {selectedRowKeys.length > 1 && (
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={handleRemoveAll}
              style={{ marginBottom: 16 }}
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
        />
      </Col>
      <Col xs={24} lg={8}>
        <div style={{ display: 'flex',justifyContent: 'space-between',alignItems: 'center',padding: '8px 0',}}>
          <span>Địa chỉ giao hàng</span>
          <span>Hiển thị địa chỉ</span>
        </div>
        <div style={{ display: 'flex',justifyContent: 'space-between',alignItems: 'center',padding: '8px 0',}}>
          <span>Phí giao hàng</span>
          <span>{formatCurrencyVND(deliveryPriceMemo)}</span>
        </div>
        <div style={{marginTop: 24,display: "flex",justifyContent: "space-between",fontWeight: 500, fontSize: '20px'}}>
          <span>Tổng cộng: {selectedRowKeys.length}</span>
          <span style={{color: 'red'}}>{total.toLocaleString()} VND</span>
        </div>
        <Button
          type="primary"
          size="large"
          style={{ marginTop: 16, width: "100%" }}
          disabled={selectedRowKeys.length === 0}
          onClick={handleAddCart}
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
    </Row>
  );
};

export default CartPage;
