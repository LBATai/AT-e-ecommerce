import React, { useState } from 'react';
import { Typography, Modal, message, Tag, Button } from 'antd';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import * as OrderService from '../../Service/OrderService';
import Pending from '../../components/Pending/Pending';
import { formatCurrencyVND } from '../../utils';

const OrderPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [filter, setFilter] = useState('all');

    const { Title, Text } = Typography;
    const user = useSelector((state) => state.user);
    const userId = user?.id;

    const fetchOrderAll = async () => {
        try {
            const res = await OrderService.getAllOrder(userId);
            return res?.data || [];
        } catch (error) {
            console.error('Error fetching orders:', error);
            return [];
        }
    };

    const { data: orders, isLoading } = useQuery({
        queryKey: ['orders'],
        queryFn: fetchOrderAll,
        enabled: !!userId,
    });

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

    const handleViewDetails = (orderId) => {
        navigate(`/order-detail?id=${orderId}`);
    };

    const filteredOrders = orders?.filter((order) => {
        switch (filter) {
            case 'waitingAccept':
                 return order.isPaid === false && order.isSuccess === false && order.isDelivered === false;
            case 'pending':
                 return (order.isPaid === false || order.isPaid === true) && order.isSuccess === false && order.isDelivered === true;
            case 'delivered':
                return order.isPaid === true && order.isSuccess === true && order.isDelivered === true;
             case 'cancelled':
                return order.isCancelled;
            default:
                return true;
        }
    });
  return (
    <Pending isPending={isLoading}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <div className="flex space-x-8 text-lg font-semibold">
            <span
              className={`cursor-pointer ${filter === 'all' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              onClick={() => setFilter('all')}
            >
              Tất cả
            </span>
               <span
              className={`cursor-pointer ${filter === 'waitingAccept' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              onClick={() => setFilter('waitingAccept')}
            >
              Chờ xác nhận
            </span>
            <span
              className={`cursor-pointer ${filter === 'pending' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              onClick={() => setFilter('pending')}
            >
              Vận chuyển
            </span>
            <span
              className={`cursor-pointer ${filter === 'delivered' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              onClick={() => setFilter('delivered')}
            >
              Hoàn thành
            </span>
            <span
              className={`cursor-pointer ${filter === 'cancelled' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              onClick={() => setFilter('cancelled')}
            >
              Đã hủy
            </span>
          </div>
        </div>

        <Title level={3} className="text-xl font-semibold mb-4">
          {filter === 'all' && 'Tất cả đơn hàng'}
          {filter === 'waitingAccept' && 'Chờ thanh toán'}
          {filter === 'pending' && 'Đơn hàng đang vận chuyển'}
          {filter === 'delivered' && 'Đơn hàng hoàn thành'}
          {filter === 'cancelled' && 'Đã hủy'}
        </Title>
         {/* Kiểm tra nếu không có đơn hàng trong tab đang chọn */}
        {!isLoading && Array.isArray(filteredOrders) && filteredOrders.length === 0 && (
          <Text className="text-gray-500">Hiện tại không có đơn hàng nào.</Text>
         )}

        {!isLoading && Array.isArray(filteredOrders) && filteredOrders.length > 0 && (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order._id} className="border rounded-lg p-4 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <Title level={5} className="text-lg font-semibold">
                      Đơn hàng: {order._id}
                    </Title>
                    <Text className="text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </Text>
                  </div>
                   <Tag
                        className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                            order.isDelivered
                                ? order.isSuccess
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                         {
                                  order.isDelivered
                                    ? order.isSuccess
                                        ? "Đã giao hàng thành công"
                                        :  "Đang giao hàng"
                                    : 'Chưa giao hàng'
                             }
                    </Tag>
                </div>

                <div className="space-y-2 mb-4">
                  {order.orderItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm border-b pb-2 last:border-none"
                    >
                      <Text>{item.name} x{item.amount}</Text>
                      <Text className="font-semibold">
                        {formatCurrencyVND(item.price)}
                      </Text>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <Text>Tổng cộng: </Text>
                    <Text className="text-blue-600 font-semibold text-lg">
                      {formatCurrencyVND(order.itemsPrice + order.shippingPrice)}
                    </Text>
                  </div>
                  <div className="space-x-2">
                     {filter !== 'pending' && !order.isDelivered && (
                        <button
                         className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            onClick={() => handleCancelOrder(order._id)}
                        >
                          Hủy đơn hàng
                        </button>
                    )}

                    <button
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200"
                      onClick={() => handleViewDetails(order._id)}
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <Text>Phương thức thanh toán: </Text>
                  <Text className="font-semibold">
                    {order.paymentMethod || 'Phương thức không xác định'}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Pending>
  );
};

export default OrderPage;