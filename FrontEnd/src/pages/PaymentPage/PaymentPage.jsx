import React, { useState, useEffect } from "react";
import { Row, Col, Button, Radio, Space, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { formatCurrencyVND } from "../../utils";
import { CreditCardOutlined, PayCircleOutlined } from "@ant-design/icons";
import { FaPaypal } from "react-icons/fa";
import { DeliveryStyle, PayStyle, PageWrapper, TitleStyle } from "./style";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as OrderService from "../../Service/OrderService";
import Pending from "../../components/Pending/Pending";
import { markProductsAsPaid, removePaidProducts } from "../../components/redux/Slide/orderSlide";
import { updateStock } from "../../components/redux/Slide/productSlide"; // Import reducer cập nhật kho

const PaymentPage = () => {
  const location = useLocation();
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const { totalAmount, itemsPrice, selectedItems } = location.state || {};
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

  const [currentShippingPrice, setCurrentShippingPrice] = useState(10000); // Phí giao hàng mặc định

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
    // Kiểm tra thông tin đầu vào
    if (!checkoutInfo.address || !checkoutInfo.phone) {
      message.error("Vui lòng điền đầy đủ thông tin giao hàng.");
      return;
    }

    if (!selectedItems || selectedItems.length === 0) {
      message.error("Không có sản phẩm nào để đặt hàng.");
      return;
    }

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

      // Cập nhật Redux
      selectedItems.forEach((item) => {
        dispatch(
          updateStock({
            productId: item.product,
            color: item.color,
            size: item.size,
            quantity: item.amount,
          })
        );
      });

      const selectedItemIds = selectedItems.map((item) => item.product);
      dispatch(markProductsAsPaid({ selectedItemIds }));
      dispatch(removePaidProducts({ selectedItemIds }));

      message.success("Đặt hàng thành công!");
      navigate("/profile", { state: { activeTab: "2" } });
    } catch (error) {
      if (error.response?.status === 400) {
        message.error(error.response.data.message || "Sản phẩm đã tồn tại.");
      } else {
        message.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <PageWrapper>
      <Pending isPending={isPending}>
        <TitleStyle>Thanh toán</TitleStyle>
        <Row gutter={[16, 16]} style={{ padding: 24, marginTop: "100px" }}>
          <Col xs={24} lg={11} style={{ marginLeft: "250px" }}>
            <DeliveryStyle>
              Chọn phương thức giao hàng
              <Radio.Group
                value={deliveryMethod}
                onChange={(e) => setDeliveryMethod(e.target.value)}
                style={{ width: "100%" }}
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Radio value="standard" style={{ width: "100%" }}>
                    Giao hàng tiêu chuẩn: 10.000 đ
                  </Radio>
                  <Radio value="express" style={{ width: "100%" }}>
                    Giao hàng nhanh: 20.000 đ
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
                  <Radio value="Thẻ tín dụng" style={{ width: "100%" }}>
                    <CreditCardOutlined style={{ marginRight: 8 }} /> Thẻ tín dụng
                  </Radio>
                  <Radio value="Thẻ ghi nợ" style={{ width: "100%" }}>
                    <PayCircleOutlined style={{ marginRight: 8 }} /> Thẻ ghi nợ
                  </Radio>
                  <Radio value="paypal" style={{ width: "100%" }}>
                    <FaPaypal style={{ marginRight: 8, color: "#003087" }} /> PayPal
                  </Radio>
                  <Radio value="Thanh toán khi nhận hàng" style={{ width: "100%" }}>
                    Thanh toán khi nhận hàng
                  </Radio>
                </Space>
              </Radio.Group>
            </PayStyle>
          </Col>

          <Col xs={24} lg={8} style={{ backgroundColor: "#fff", padding: "20px", height: "50%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 0",
              }}
            >
              <span>Địa chỉ giao hàng: {checkoutInfo.address}</span>
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
              <span>{formatCurrencyVND(currentShippingPrice)}</span>
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
                {totalAmount !== undefined
                  ? formatCurrencyVND(itemsPrice + currentShippingPrice)
                  : "Chưa có dữ liệu"}
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
