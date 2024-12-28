import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { formatCurrencyVND } from "../../utils";
import { CreditCardOutlined, PayCircleOutlined } from "@ant-design/icons";
import { FaPaypal } from "react-icons/fa";
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as OrderService from "../../Service/OrderService";
import * as ProductService from '../../Service/ProductService';
import * as PaymentTypeService from '../../Service/PaymentTypeService'; // Import PaymentType service
import Pending from '../../components/Pending/Pending';
import { markProductsAsPaid, removePaidProducts } from '../../components/redux/Slide/orderSlide';
import { Typography, Modal, message, Tag, Button } from 'antd';

const PaymentPage = () => {
  const location = useLocation();
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const { totalAmount, itemsPrice, selectedItems, userInfo } = location.state || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null); // changed from string to null
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [checkoutInfo, setCheckoutInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    if (userInfo) {
      setCheckoutInfo({
        name: userInfo.name || "",
        address: userInfo.address || "",
        phone: userInfo.phone || "",
      });
    }
  }, [userInfo]);

  // Fetch payment types from backend
  useEffect(() => {
    const fetchPaymentTypes = async () => {
      try {
        const response = await PaymentTypeService.getAllPaymentTypes();
        if (response?.status === "OK" && Array.isArray(response?.data)) {
          setPaymentTypes(response.data);
          // Set the initial payment method to the first one, if available.
          if (response.data.length > 0) {
            setPaymentMethod(response.data[0].name);
          }
        }
      } catch (error) {
        message.error('Không thể lấy danh sách phương thức thanh toán!');
      }
    };

    fetchPaymentTypes();
  }, []);


  const getShippingPrice = (method) => {
    switch (method) {
      case "standard":
        return 10000;
      case "express":
        return 20000;
      default:
        return 0;
    }
  };

  const [currentShippingPrice, setCurrentShippingPrice] = useState(getShippingPrice(deliveryMethod));

  useEffect(() => {
    setCurrentShippingPrice(getShippingPrice(deliveryMethod));
  }, [deliveryMethod]);

  const mutationAddOrder = useMutationHooks(async (data) => {
    const { token, ...restData } = data;
    const userId = data.id || user?.id;
    const res = await OrderService.createOrder(userId, token, restData);
    return res;
  });

  const mutationUpdateProduct = useMutationHooks(async ({ id, selled }) => {
    const res = await ProductService.updateProduct(id, user?.access_token, { selled: selled })
    return res;
  });


  const handleCheckout = async () => {
    setIsPending(true);
    if (!paymentMethod) {
      message.error('Vui lòng chọn phương thức thanh toán!');
      setIsPending(false);
      return;
    }
    try {
      const payload = {
        token: user?.access_token,
        orderItems: selectedItems,
        name: checkoutInfo.name,
        address: checkoutInfo.address,
        phone: checkoutInfo.phone,
        paymentMethod: paymentMethod,
        deliveryMethod: deliveryMethod,
        itemsPrice: itemsPrice,
        shippingPrice: currentShippingPrice,
        totalPrice: itemsPrice + currentShippingPrice,
        user: user?.id,
      };

      await mutationAddOrder.mutateAsync(payload);
      const updateProductPromises = selectedItems.map(async (item) => {
        await mutationUpdateProduct.mutateAsync({
          id: item.product,
          selled: item.amount,
        });
      });
      await Promise.all(updateProductPromises)

      const selectedItemIds = selectedItems.map(item => item.product);
      dispatch(markProductsAsPaid({ selectedItemIds }));
      dispatch(removePaidProducts({ selectedItemIds }));

      message.success('Thanh toán thành công!')
      navigate('/profile', { state: { activeTab: '2' } });
    } catch (error) {
      if (error.response?.status === 400) {
        message.error(error.response.data.message || 'Sản phẩm đã tồn tại.');
      } else {
        message.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <Pending isPending={isPending}>
          <h1 className="text-3xl font-semibold text-gray-800 text-center py-8 border-b border-gray-200">
            Thanh toán
          </h1>
          <div className="flex flex-col lg:flex-row p-6">
            <div className="lg:w-1/2 lg:pr-8 space-y-6">
              {/* Delivery Method Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-medium mb-2 text-gray-700">Chọn phương thức giao hàng</h2>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="standard"
                      checked={deliveryMethod === "standard"}
                      onChange={(e) => setDeliveryMethod(e.target.value)}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <span className="text-gray-600">Giao hàng tiêu chuẩn: 10.000 đ</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="express"
                      checked={deliveryMethod === "express"}
                      onChange={(e) => setDeliveryMethod(e.target.value)}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <span className="text-gray-600">Giao hàng nhanh: 20.000 đ</span>
                  </label>
                </div>
              </div>
              {/* Payment Method Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-medium mb-2 text-gray-700">Chọn phương thức thanh toán</h2>
                <div className="space-y-2">
                  {paymentTypes.map(paymentType => (
                    <label key={paymentType._id} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={paymentType.name}
                        checked={paymentMethod === paymentType.name}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <span className="text-gray-600 flex items-center">
                        {paymentType.icon && <img src={paymentType.icon} alt={paymentType.name} className="mr-1" style={{ width: "20px", height: "20px", marginRight: "5px" }} />}
                        {paymentType.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/2 lg:pl-8 space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">Địa chỉ giao hàng:</span>
                  <span className="font-medium">{checkoutInfo.address}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">Tạm tính:</span>
                  <span className="text-gray-700">{formatCurrencyVND(itemsPrice)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">Phí giao hàng:</span>
                  <span className="text-gray-700">{formatCurrencyVND(currentShippingPrice)}</span>
                </div>
                <div className="mt-4 py-2 border-t border-gray-200 flex justify-between font-semibold text-lg">
                  <span className="text-gray-800">Tổng cộng:</span>
                  <span className="text-red-500">
                    {totalAmount !== undefined ? formatCurrencyVND(itemsPrice + currentShippingPrice) : "Chưa có dữ liệu"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                >
                  Đặt hàng
                </button>
              </div>
            </div>
          </div>
        </Pending>
      </div>
    </div>
  );
};

export default PaymentPage;