import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, Button, Radio, Space, message  } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { formatCurrencyVND } from "../../utils";
import { CreditCardOutlined, PayCircleOutlined } from "@ant-design/icons";
import { FaPaypal } from "react-icons/fa";
import {DeliveryStyle,PayStyle, PageWrapper, TitleStyle} from './style'
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as OrderService from "../../Service/OrderService";
import Pending from '../../components/Pending/Pending'
import { markProductsAsPaid, removePaidProducts } from '../../components/redux/Slide/orderSlide';

const PaymentPage = () => {
  const location = useLocation();
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const { totalAmount, itemsPrice, shippingPrice, selectedItems } = location.state || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod"); // State quản lý phương thức thanh toán
  const [deliveryMethod, setDeliveryMethod] = useState("standard"); // State quản lý phương thức giao hàng
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

  const mutationAddOrder = useMutationHooks(async (data) => {
    const { token, ...restData } = data; // Giả sử `data` có chứa token
    const userId = data.id || user?.id; // Lấy userId từ data hoặc từ user
  
    const res = await OrderService.createOrder(userId, token, restData); // Gọi API
    // console.log('first order created', res)
    return res;
  });
  
  // console.log('selectedItems',selectedItems)
  // console.log(' order?.orderItems', order?.orderItems)
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
        shippingPrice: shippingPrice,
        totalPrice: totalAmount,
        user: user?.id,
      };
  
      // console.log("Dữ liệu gửi lên API:", payload);
      await mutationAddOrder.mutateAsync(payload);

    const selectedItemIds = selectedItems.map(item => item.product);
    // console.log('selectedItemIds',selectedItemIds)
    // Đánh dấu các sản phẩm đã chọn là đã thanh toán
    dispatch(markProductsAsPaid({ selectedItemIds }));

    // Xóa các sản phẩm đã thanh toán khỏi danh sách
    dispatch(removePaidProducts({ selectedItemIds }));
    
    // Chuyển hướng đến trang thành công đặt hàng
    navigate('/profile', { state: { activeTab: '2' } });
    } catch (error) {
      if (error.response?.status === 400) {
        message.error(error.response.data.message || 'Sản phẩm đã tồn tại.');
      } else {
        message.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
      }
    } finally {
      setIsPending(false); // Kết thúc pending sau khi xử lý xong
    }
  };
  const { isLoading: isLoadingAddOrder, isError, isSuccess, data } = mutationAddOrder;
    useEffect(() => {
      if (isSuccess) {
        const response = data;
        if (response?.message === 'Order created successfully') {
          message.success('Đặt hàng thành công!');
          // Điều hướng sau khi đặt hàng thành công, có thể dừng loading tại đây.
        } else {
          message.error('Thanh toán thất bại!');
        }
      }
      if (isError) {
        message.error('Đã xảy ra lỗi, vui lòng thử lại!');
      }
    }, [isSuccess, isError, data]);
  
  return (
    <PageWrapper>
    <Pending isPending={isPending}>
    <TitleStyle>Thanh toán</TitleStyle>
    <Row gutter={[16, 16]} style={{ padding: 24, marginTop: "100px" }}>
      <Col xs={24} lg={11} style={{marginLeft: '250px'}}>
        <DeliveryStyle>
          Chọn phương thức giao hàng
          <Radio.Group
            value={deliveryMethod}
            onChange={(e) => setDeliveryMethod(e.target.value)}
            style={{ width: "100%" }}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <Radio value="standard" style={{ width: "100%" }}>
                Giao hàng tiêu chuẩn
              </Radio>
              <Radio value="express" style={{ width: "100%" }}>
                Giao hàng nhanh
              </Radio>
            </Space>
          </Radio.Group>
        </DeliveryStyle>
        <PayStyle>
          Chọn phương thức thanh toán
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
        </PayStyle>
      </Col>

      {/* Column bên phải với các thông tin khác */}
      <Col xs={24} lg={8} style={{backgroundColor: '#fff', padding: '20px', height:'50%'}}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 0",
          }}
        >
          <span>Địa chỉ giao hàng: {checkoutInfo.address}</span>
          <Button type="link" onClick={() => setIsEditAddressModalVisible(true)}>
            Chỉnh sửa
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 0",
          }}
        >
          <span>Tạm tính: </span>
          <span>{formatCurrencyVND(itemsPrice)}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 0",
          }}
        >
          <span>Phí giao hàng: </span>
          <span>{formatCurrencyVND(shippingPrice)}</span>
        </div>
        <div
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "space-between",
            fontWeight: 500,
            fontSize: "20px",
          }}
        >
          <span>Tổng cộng: </span>
          <span style={{ color: "red" }}>
            {totalAmount !== undefined ? formatCurrencyVND(totalAmount) : "Chưa có dữ liệu"}
          </span>
        </div>
        <Button
          type="primary"
          size="large"
          style={{ marginTop: 16, width: "100%" }}
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
