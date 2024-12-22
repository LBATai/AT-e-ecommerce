import React, { useState, useEffect } from "react";
import { Row, Col, Button, Radio, Space, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { formatCurrencyVND } from "../../utils";
import { CreditCardOutlined, PayCircleOutlined } from "@ant-design/icons";
import { FaPaypal } from "react-icons/fa";
import { DeliveryStyle, PayStyle, PageWrapper, TitleStyle } from './style';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as OrderService from "../../Service/OrderService";
import Pending from '../../components/Pending/Pending';
import { markProductsAsPaid, removePaidProducts } from '../../components/redux/Slide/orderSlide';

const PaymentPage = () => {
  const location = useLocation();
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const { totalAmount, itemsPrice, selectedItems } = location.state || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [checkoutInfo, setCheckoutInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setCheckoutInfo({
        name: user.name || "",
        address: user.address || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

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

  const handleCheckout = async () => {
    setIsPending(true);
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

      const selectedItemIds = selectedItems.map(item => item.product);
      dispatch(markProductsAsPaid({ selectedItemIds }));
      dispatch(removePaidProducts({ selectedItemIds }));

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
    <PageWrapper>
      <Pending isPending={isPending}>
        <TitleStyle className="text-3xl font-semibold mb-6">Thanh toán</TitleStyle>
        <Row gutter={[16, 16]} className="p-6 mt-24">
          <Col xs={24} lg={11} className="ml-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <DeliveryStyle className="mb-4">
                <div className="text-lg font-medium mb-2">Chọn phương thức giao hàng</div>
                <Radio.Group
                  value={deliveryMethod}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                  className="w-full"
                >
                  <Space direction="vertical" className="w-full">
                    <Radio value="standard" className="w-full">
                      Giao hàng tiêu chuẩn: 10.000 đ
                    </Radio>
                    <Radio value="express" className="w-full">
                      Giao hàng nhanh: 20.000 đ
                    </Radio>
                  </Space>
                </Radio.Group>
              </DeliveryStyle>
              <PayStyle>
                <div className="text-lg font-medium mb-2">Chọn phương thức thanh toán</div>
                <Radio.Group
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full"
                >
                  <Space direction="vertical" className="w-full">
                    <Radio value="Thẻ tín dụng" className="w-full">
                      <CreditCardOutlined className="mr-2" /> Thẻ tín dụng
                    </Radio>
                    <Radio value="Thẻ ghi nợ" className="w-full">
                      <PayCircleOutlined className="mr-2" /> Thẻ ghi nợ
                    </Radio>
                    <Radio value="paypal" className="w-full">
                      <FaPaypal className="mr-2 text-[#003087]" /> PayPal
                    </Radio>
                    <Radio value="Thanh toán khi nhận hàng" className="w-full">
                      Thanh toán khi nhận hàng
                    </Radio>
                  </Space>
                </Radio.Group>
              </PayStyle>
            </div>
          </Col>

          <Col xs={24} lg={8} className="bg-white p-6 shadow-md rounded-lg">
            <div className="flex justify-between items-center py-2">
              <span>Địa chỉ giao hàng: {checkoutInfo.address}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span>Tạm tính: </span>
              <span>{formatCurrencyVND(itemsPrice)}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span>Phí giao hàng: </span>
              <span>{formatCurrencyVND(currentShippingPrice)}</span>
            </div>
            <div className="mt-6 flex justify-between font-semibold text-lg">
              <span>Tổng cộng: </span>
              <span className="text-red-500">
                {totalAmount !== undefined ? formatCurrencyVND(itemsPrice + currentShippingPrice) : "Chưa có dữ liệu"}
              </span>
            </div>
            <Button
              type="primary"
              size="large"
              className="mt-6 w-full"
              onClick={handleCheckout}
            >
              Đặt hàng
            </Button>
          </Col>
        </Row>
      </Pending>
    </PageWrapper>
  );
};

export default PaymentPage;
