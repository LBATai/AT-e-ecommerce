import React, { useState } from "react";
import {
  Row,
  Col,
  Table,
  InputNumber,
  Button,
  Card,
  Radio,
  Space,
  Input,
  Modal,
} from "antd";
import {
  MinusOutlined,
  PlusOutlined,
  CreditCardOutlined,
  PayCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { FaPaypal } from "react-icons/fa";
const PayPage = () => {
  return (
    <div>
                <Card title="Thanh toán" bordered>
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
          {paymentMethod !== "cod" && (
            <Space direction="vertical" size="large" style={{ width: "100%", marginTop: 16 }}>
              <Input placeholder="Tên trên thẻ" />
              <Input placeholder="Số thẻ" />
              <Space style={{ width: "100%" }}>
                <Input placeholder="MM/YY" style={{ flex: 1 }} />
                <Input placeholder="CVV" style={{ flex: 1 }} />
              </Space>
            </Space>
          )}

        </Card>
    </div>
  )
}

export default PayPage