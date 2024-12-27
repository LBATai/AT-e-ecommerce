import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as OrderService from "../../Service/OrderService";
import { formatCurrencyVND } from "../../utils";
import { Loader } from "lucide-react";

const OrderDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const orderId = new URLSearchParams(location.search).get("id");

  const { data: orderDetails, isLoading } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => OrderService.getDetailsOrder(orderId).then(res => res?.data || null),
    enabled: !!orderId,
  });

  const cancelOrderMutation = useMutation({
    mutationFn: OrderService.deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      navigate(-1);
    }
  });

  const handleCancelOrder = () => {
    if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) {
      cancelOrderMutation.mutate(orderId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="p-4 text-center text-gray-500">
        Không tìm thấy chi tiết đơn hàng.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8 bg-gray-50 min-h-screen">
      <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-8">
        Chi tiết đơn hàng: {orderId}
      </h1>

      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-8">
        <div className="space-y-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:space-y-0 mb-6">
          <div className="border-b sm:border-none pb-4 sm:pb-0">
            <p className="text-sm text-gray-500">Tên người nhận</p>
            <p className="font-medium">{orderDetails.shippingAddress?.name}</p>
          </div>
          <div className="border-b sm:border-none pb-4 sm:pb-0">
            <p className="text-sm text-gray-500">Địa chỉ</p>
            <p className="font-medium">{orderDetails.shippingAddress?.address}</p>
          </div>
          <div className="border-b sm:border-none pb-4 sm:pb-0">
            <p className="text-sm text-gray-500">Số điện thoại</p>
            <p className="font-medium">{orderDetails.shippingAddress?.phone}</p>
          </div>
        </div>

        <div className="space-y-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:space-y-0 mb-6">
          <div className="border-b sm:border-none pb-4 sm:pb-0">
            <p className="text-sm text-gray-500">Phương thức thanh toán</p>
            <p className="font-medium">{orderDetails.paymentMethod}</p>
          </div>
          <div className="border-b sm:border-none pb-4 sm:pb-0">
            <p className="text-sm text-gray-500">Trạng thái thanh toán</p>
            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${orderDetails.isPaid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}>
              {orderDetails.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Trạng thái giao hàng</p>
            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${orderDetails.isDelivered
                ? orderDetails.isSuccess
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
              }`}>
              {
                orderDetails.isDelivered
                  ? orderDetails.isSuccess
                    ? "Đã giao hàng thành công"
                    : "Đang giao hàng"
                  : 'Chưa giao hàng'
              }
            </span>
          </div>
        </div>

        <div className="space-y-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:space-y-0 mb-8">
          <div className="border-b sm:border-none pb-4 sm:pb-0">
            <p className="text-sm text-gray-500">Giá sản phẩm</p>
            <p className="font-medium">{formatCurrencyVND(orderDetails.itemsPrice)}</p>
          </div>
          <div className="border-b sm:border-none pb-4 sm:pb-0">
            <p className="text-sm text-gray-500">Phí vận chuyển</p>
            <p className="font-medium">{formatCurrencyVND(orderDetails.shippingPrice)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tổng cộng</p>
            <p className="text-lg font-bold text-blue-600">
              {formatCurrencyVND(orderDetails.totalPrice)}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              {orderDetails.orderItems.map((item) => (
                <div
                  key={item._id}
                  className="border-b last:border-b-0 p-4 sm:hidden"
                >
                  <div className="flex space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-grow">
                      <p className="font-medium text-gray-900 mb-1">{item.name}</p>
                      <p className="text-sm text-gray-500 mb-1">
                        {item.type} - {item.color} - {item.size}
                      </p>
                      <p className="text-sm text-gray-500 mb-1">
                        Số lượng: {item.amount}
                      </p>
                      <p className="font-medium text-gray-900">
                        {formatCurrencyVND(item.price * item.amount)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <table className="min-w-full divide-y divide-gray-200 hidden sm:table">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sản phẩm
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Loại sản phẩm
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Màu sắc
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kích thước
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Số lượng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Giá
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orderDetails.orderItems.map((item) => (
                    <tr key={item._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="ml-4">
                            <p className="font-medium text-gray-900">{item.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.color}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {formatCurrencyVND(item.price * item.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          Quay lại
        </button>
        {orderDetails.isPaid && orderDetails.isSuccess && orderDetails.isDelivered ? (
          <div className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md">
            Đơn hàng đã hoàn thành
          </div>
        ) : (
          !(orderDetails.isPaid || orderDetails.isSuccess || orderDetails.isDelivered) && (
            <button
              onClick={handleCancelOrder}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Hủy đơn hàng
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default OrderDetailPage;