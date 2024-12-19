import React, { useState, useEffect } from 'react';
import { Menu, Typography, Row, Col, Tag, message, Upload, Input, Button, Modal } from 'antd';
import { OrderCard } from './style';
import * as OrderService from '../../Service/OrderService';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Pending from '../../components/Pending/Pending'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {formatCurrencyVND} from '../../utils'

const OrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // Khởi tạo queryClient

  const { Title, Text } = Typography;

  const user = useSelector((state) => state.user);
  const userId= user?.id
  // const token = user?.access_token
  // Hàm fetch dữ liệu từ API
  const fetchOrderAll = async () => {
    try {
      const res = await OrderService.getAllOrder(userId);
      // console.log('res?.data ',res?.data )
      return res?.data || [];
    } catch (error) {
      console.error('Error fetching orders:', error);
      return []; // Nếu có lỗi, trả về mảng trống
    }
  };

  // Sử dụng React Query để lấy dữ liệu
  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrderAll,
    enabled: !!userId, // Đảm bảo query chỉ chạy khi có sự thay đổi
  });

  // Xử lý sự kiện hủy đơn hàng
  const handleCancelOrder = (orderId) => {
    Modal.confirm({
      title: `Xác nhận hủy đơn hàng: ${orderId}`,
      content: 'Bạn có chắc chắn muốn hủy đơn hàng này không?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          const res = await OrderService.deleteOrder(orderId);
          if (res?.status === 'OK') {
            message.success('Hủy đơn hàng thành công!');
            // Làm mới dữ liệu của query "orders"
            queryClient.invalidateQueries(['orders']);
          } else {
            message.error('Hủy đơn hàng thất bại!');
          }
        } catch (error) {
          console.error('Lỗi khi hủy đơn hàng:', error);
          message.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
        }
      },
    });
  };
  // Xử lý sự kiện xem chi tiết đơn hàng
  const handleViewDetails = (orderId) => {
    // Điều hướng hoặc hiển thị chi tiết đơn hàng
    // console.log('View order details', orderId);
    navigate(`/order-detail?id=${orderId}`); // Truyền orderId qua query parameter
  };

  return (
<Pending isPending={isLoading}>
  <Title level={2}>Danh sách đơn hàng</Title>
  {!isLoading && (!Array.isArray(orders) || orders.length === 0) && (
    <Text>Hiện không có đơn hàng nào.</Text>
  )}
  {!isLoading && Array.isArray(orders) && orders.length > 0 && (
    orders.map((order) => (
      <OrderCard key={order._id}>
        <div className="order-header">
          <div>
            <Title level={5}>Đơn hàng: {order._id}</Title>
            <Text type="secondary">
              {new Date(order.createdAt).toLocaleDateString()}
            </Text>
          </div>
          <Tag color={order.isDelivered ? (order.isSuccess ? "success" : "warning") : "warning"}>
            {order.isDelivered
              ? (order.isSuccess ? "Đã giao hàng thành công" : "Đang giao hàng")
              : "Chưa giao hàng"
            }
          </Tag>
        </div>
        <div className="order-items">
          {order.orderItems.map((item, index) => (
            <Row key={index} justify="space-between" style={{ marginBottom: 8 }}>
              <Text>{item.name} x{item.amount}</Text>
              <Text strong>{formatCurrencyVND(item.price)}</Text>
            </Row>
          ))}
        </div>
        <div>
          <Row justify="space-between" align="middle" className="order-total-button">
            <span>
              <Col>
                <Text>Tổng cộng: </Text>
                <Text strong style={{ fontSize: 16, color: '#1890ff' }}>
                  {formatCurrencyVND(order.itemsPrice + order.shippingPrice)}
                </Text>
              </Col>
            </span>
            <span>
              <Col>
                {/* Chỉ hiển thị nút "Hủy đơn hàng" nếu isDelivered là false */}
                {!order.isDelivered && (
                  <Button
                    type="primary"
                    danger
                    onClick={() => handleCancelOrder(order._id)}
                    style={{ marginRight: 8 }}
                  >
                    Hủy đơn hàng
                  </Button>
                )}
                <Button type="default" onClick={() => handleViewDetails(order._id)}>
                  Xem chi tiết
                </Button>
              </Col>
            </span>
          </Row>
        </div>
        <div className="order-payment">
          <Text>Phương thức thanh toán: </Text>
          <Text style={{fontWeight:'600'}}>
            {order.paymentMethod || 'Phương thức không xác định'}
          </Text>
        </div>
      </OrderCard>
    ))
  )}
</Pending>

  );
};

export default OrderPage;
