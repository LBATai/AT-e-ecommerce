import React, { useState } from 'react';
import { Row, Col, Space, Tag, Typography, Button } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import {
  AddressCard,
} from './style';
const { Title, Text } = Typography;

const OrderAddress = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Địa chỉ chính',
      isDefault: true,
      recipient: 'Nguyễn Văn A',
      phone: '0123456789',
      address: 'Số 123, Đường ABC, Quận 1, TP.HCM',
    },
    {
      id: 2,
      name: 'Địa chỉ văn phòng',
      isDefault: false,
      recipient: 'Nguyễn Thị B',
      phone: '0987654321',
      address: 'Số 456, Đường XYZ, Quận 3, TP.HCM',
    },
    {
      id: 3,
      name: 'Địa chỉ văn phòng',
      isDefault: false,
      recipient: 'Nguyễn Thị B',
      phone: '0987654321',
      address: 'Số 456, Đường XYZ, Quận 3, TP.HCM',
    },
  ]);

  const renderAddresses = () => (
    <>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Title level={4}>Sổ địa chỉ</Title>
        <Button type="primary" icon={<PlusOutlined />}>
          Thêm địa chỉ mới
        </Button>
      </Row>
      <Row gutter={[16, 16]}>
        {addresses.map(address => (
          <Col xs={24} sm={12} key={address.id}>
            <AddressCard>
              <div className="address-header">
                <Space>
                  <Text strong>{address.name}</Text>
                  {address.isDefault && <Tag color="blue">Mặc định</Tag>}
                </Space>
                <Button icon={<EditOutlined />} type="text" />
              </div>
              <div style={{ marginTop: 16 }}>
                <Text strong display="block">{address.recipient}</Text>
                <Text type="secondary" display="block">{address.phone}</Text>
                <Text>{address.address}</Text>
              </div>
            </AddressCard>
          </Col>
        ))}
      </Row>
    </>
  );

  return <div>{renderAddresses()}</div>;
};

export default OrderAddress;
