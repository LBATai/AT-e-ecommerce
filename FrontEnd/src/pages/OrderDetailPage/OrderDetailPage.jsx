import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Table, Typography, Button, Tag, Row, Col, message, Modal } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as OrderService from "../../Service/OrderService";
import Pending from "../../components/Pending/Pending";
import {OrderDetailWrapper} from './style'
import {formatCurrencyVND} from '../../utils'
const OrderDetailPage = () => {
  const { Title, Text } = Typography;
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Lấy idOrder từ query parameter
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("id");

  const fetchOrderById = async (orderId) => {
    try {
      const res = await OrderService.getDetailsOrder(orderId);
      return res?.data || null;
    } catch (error) {
      console.error("Error fetching order details:", error);
      return null;
    }
  };

  const { data: orderDetails, isLoading } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => fetchOrderById(orderId),
    enabled: !!orderId,
  });

  const cancelOrderMutation = useMutation({
    mutationFn: (orderId) => OrderService.deleteOrder(orderId),
    onSuccess: () => {
      message.success("Hủy đơn hàng thành công!");
      queryClient.invalidateQueries(["orders"]);
      navigate(-1); // Quay lại danh sách đơn hàng
    },
    onError: () => {
      message.error("Hủy đơn hàng thất bại!");
    },
  });

  const handleCancelOrder = () => {
    Modal.confirm({
      title: "Xác nhận hủy đơn hàng",
      content: "Bạn có chắc chắn muốn hủy đơn hàng này không?",
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: () => cancelOrderMutation.mutate(orderId),
    });
  };

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.image}
            alt={record.name}
            style={{ width: 80, marginRight: 16, borderRadius: 8 }}
          />
          <div>
            <p style={{ margin: 0, fontWeight: 500 }}>{record.name}</p>
          </div>
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
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price, record) => formatCurrencyVND(price * record.amount),
    },
  ];

  return (
    <Pending isPending={isLoading}>
      <OrderDetailWrapper>
      {orderDetails ? (
        <>
          <Title level={3} style={{marginTop:'50px', marginBottom:'50px'}}>Chi tiết đơn hàng:  {orderId}</Title>
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col span={8}>
              <Text strong>Tên người nhận:</Text>
              <Text> {orderDetails.shippingAddress?.name}</Text>
            </Col>
            <Col span={8}>
              <Text strong>Địa chỉ:</Text>
              <Text> {orderDetails.shippingAddress?.address}</Text>
            </Col>
            <Col span={8}>
              <Text strong>Số điện thoại:</Text>
              <Text> {orderDetails.shippingAddress?.phone}</Text>
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col span={8}>
              <Text strong>Phương thức thanh toán:</Text>
              <Text> {orderDetails.paymentMethod}</Text>
            </Col>
            <Col span={8}>
              <Text strong>Trạng thái thanh toán: </Text>
              <Tag color={orderDetails.isPaid ? "success" : "error"}>
                {orderDetails.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
              </Tag>
            </Col>
            <Col span={8}>
              <Text strong>Trạng thái giao hàng: </Text>
              <Tag color={orderDetails.isDelivered ? "success" : "warning"}>
                {orderDetails.isDelivered ? "Đã giao" : "Chưa giao"}
              </Tag>
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col span={8}>
              <Text strong>Giá sản phẩm:</Text>
              <Text> {formatCurrencyVND(orderDetails?.itemsPrice)}</Text>
            </Col>
            <Col span={8}>
              <Text strong>Phí vận chuyển: </Text>
              <Text> {formatCurrencyVND(orderDetails?.shippingPrice)}</Text>
            </Col>
            <Col span={8}>
              <Text strong>Tổng cộng: </Text>
              <Text style={{ fontSize: 16, color: "#1890ff" }}>
                {formatCurrencyVND(orderDetails?.totalPrice)}
              </Text>
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={orderDetails.orderItems}
            pagination={false}
            rowKey={(record) => record._id}
            style={{ marginBottom: 16 }}
          />
          <Row justify="space-between">
            <Button type="primary" onClick={() => navigate(-1)}>
              Quay lại
            </Button>
            <Button
              type="primary"
              danger
              onClick={handleCancelOrder}
              disabled={orderDetails.isDelivered || orderDetails.isPaid}
            >
              Hủy đơn hàng
            </Button>
          </Row>
        </>
      ) : (
        <Text>Không tìm thấy chi tiết đơn hàng.</Text>
      )}
      </OrderDetailWrapper>
    </Pending>
  );
};

export default OrderDetailPage;
