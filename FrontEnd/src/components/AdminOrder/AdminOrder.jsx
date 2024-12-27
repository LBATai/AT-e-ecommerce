import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Input,
  Modal,
  message,
  Space,
  Drawer,
  Tag,
  Typography,
  Tooltip,
  Card,
  Row,
  Col
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
  CheckOutlined,
  SyncOutlined
} from '@ant-design/icons';
import * as OrderService from '../../Service/OrderService';

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stateOrderDetails, setStateOrderDetails] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { Text } = Typography;
  const onSelectChange = (newSelectedRowKeys) => setSelectedRowKeys(newSelectedRowKeys);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    setIsLoading(true);
    try {
      const response = await OrderService.getAllOrder();
      if (response?.status === 'OK') {
        const formattedData = response.data.map(order => ({
          key: order._id,
          name: order.shippingAddress.name,
          phone: order.shippingAddress.phone,
          address: order.shippingAddress.address,
          paymentMethod: order.paymentMethod,
          isDelivered: !!order.isDelivered,
          isSuccess: !!order.isSuccess,
          isPaid: !!order.isPaid,
          totalPrice: order.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
        }));
        setOrders(formattedData);
      }
    } catch (error) {
      message.error('Không thể lấy danh sách đơn hàng', 3);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await OrderService.getDetailsOrder(orderId);
      if (response?.data) {
        setStateOrderDetails(response.data);
        setIsDrawerOpen(true);
      }
    } catch (error) {
      message.error('Không thể lấy chi tiết đơn hàng', 3);
    }
  };

  const handleDeleteOrder = (record) => {
    Modal.confirm({
      title: `Xác nhận xóa đơn hàng: ${record.key}`,
      content: 'Bạn có chắc chắn muốn xóa đơn hàng này không?',
      onOk: async () => {
        try {
          await OrderService.deleteOrder(record.key);
          message.success('Xóa đơn hàng thành công!', 3);
          fetchAllOrders();
        } catch (error) {
          message.error('Xóa đơn hàng thất bại!', 3);
        }
      },
    });
  };
  const handleAceptDelivery = (record) => {
    Modal.confirm({
      title: `Xác nhận giao đơn hàng: ${record.name}`,
      content: 'Bạn có chắc chắn muốn giao đơn hàng này không?',
      onOk: async () => {
        try {
          await OrderService.updateOrder(record.key, { isDelivered: true }); // Gửi isDelivered
          message.success('Xác nhận giao đơn hàng thành công!', 3);
          fetchAllOrders(); // Làm mới danh sách đơn hàng
        } catch (error) {
          message.error('Xác nhận giao đơn hàng thất bại!', 3);
        }
      },
    });
  };
  const handleAceptSuccess = (record) => {
    Modal.confirm({
      title: `Xác nhận giao đơn hàng thành công: ${record.name}`,
      content: 'Bạn có chắc chắn muốn xác nhận giao đơn hàng thành công không?',
      onOk: async () => {
        try {
          await OrderService.updateOrder(record.key, { isSuccess: true }); // Gửi isDelivered
          message.success('Xác nhận hoàn thành đơn hàng!', 3);
          fetchAllOrders(); // Làm mới danh sách đơn hàng
        } catch (error) {
          message.error('Xác nhận đơn hàng thất bại!', 3);
        }
      },
    });
  };
  const handleAceptPaid = (record) => {
    Modal.confirm({
      title: `Xác nhận đã thanh toán: ${record.name}`,
      content: 'Bạn có chắc chắn muốn xác nhận đơn hàng đã thanh toán không',
      onOk: async () => {
        try {
          await OrderService.updateOrder(record.key, { isPaid: true }); // Gửi isDelivered
          message.success('Xác nhận thanh toán thành công!', 3);
          fetchAllOrders(); // Làm mới danh sách đơn hàng
        } catch (error) {
          message.error('Xác nhận thanh toán thất bại!', 3);
        }
      },
    });
  };


  const handleDeleteSelectedOrders = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Vui lòng chọn ít nhất một đơn hàng để xóa.', 3);
      return;
    }

    Modal.confirm({
      title: `Xóa ${selectedRowKeys.length} đơn hàng`,
      content: 'Bạn có chắc chắn muốn xóa các đơn hàng đã chọn?',
      onOk: async () => {
        try {
          await OrderService.deleteMultipleOrders(selectedRowKeys);
          message.success('Xóa đơn hàng thành công!', 3);
          fetchAllOrders();
          setSelectedRowKeys([]);
        } catch (error) {
          message.error('Xóa đơn hàng thất bại!', 3);
        }
      },
    });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredOrders = orders.filter(order =>
    order.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.address?.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const columns = [
    {
      title: 'ID Đơn hàng',
      dataIndex: 'key',
      key: 'key',
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: 'Thông tin khách hàng',
      key: 'customerInfo',
      render: (text, record) => (
        <div>
          <Text strong>Tên: </Text>
          <Text>{record.name}</Text>
          <br />
          <Text strong>SĐT: </Text>
          <Text>{record.phone}</Text>
          <br />
          <Text strong>Địa chỉ: </Text>
          <Text>{record.address}</Text>
        </div>
      ),
    },

    {
      title: 'Thanh toán',
      key: 'paymentStatus',
      render: (text, record) => (
        <div style={{ textAlign: 'center' }}>
          <Text type="secondary">
            <Text strong>Phương thức:</Text>  {record.paymentMethod || 'Chưa xác định'}</Text>
          <br />
          <Tag color={record.isPaid ? "success" : "warning"} style={{ marginTop: '5px' }}>
            {record.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
          </Tag>
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'deliveryStatus',
      render: (text, record) => {
        return (
          <div style={{ textAlign: 'center' }}>
            <Tag
              color={
                record.isDelivered
                  ? record.isSuccess
                    ? 'success'
                    : 'processing'
                  : 'warning'
              }
              style={{ marginTop: '5px' }}
            >
              {record.isDelivered
                ? record.isSuccess
                  ? 'Giao hàng thành công'
                  : 'Đang giao hàng'
                : 'Chưa giao hàng'}
            </Tag>
          </div>
        );
      },
    },

    { title: 'Tổng tiền', dataIndex: 'totalPrice', key: 'totalPrice', align: 'center' },
    {
      title: 'Thao tác',
      key: 'actions',
      align: 'center',
      render: (record) => (
        <Space size="small">
          <Tooltip title="Chi tiết đơn hàng">
            <Button
              type="primary"
              icon={<EditOutlined />}
              size="small"
              onClick={() => fetchOrderDetails(record.key)}
            />
          </Tooltip>
          <Tooltip title="Xóa đơn hàng">
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
              onClick={() => handleDeleteOrder(record)}
            />
          </Tooltip>
          {!record.isDelivered && !record.isSuccess && ( // Hiển thị nút nếu chưa giao hàng và chưa thành công
            <Tooltip title="Xác nhận đơn hàng">
              <Button
                type="primary"
                style={{ background: '#E6F4FF', borderColor: '#5FC8FF', color: '#5FC8FF' }}
                variant="solid"
                size="small"
                icon={<CheckOutlined />}
                onClick={() => handleAceptDelivery(record)}
              />
            </Tooltip>
          )}

          {!record.isPaid && record.isDelivered && (
            <Tooltip title="Xác nhận thanh toán">
              <Button
                type="primary"
                size="small"
                style={{ background: '#FFFBE6', borderColor: '#FBB414', color: '#FBB414' }}
                icon={<CheckOutlined />}
                onClick={() => handleAceptPaid(record)}
              />
            </Tooltip>
          )}

          {record.isDelivered && !record.isSuccess && record.isPaid && (
            <Tooltip title="Xác nhận thành công">
              <Button
                type="primary"
                size="small"
                icon={<CheckOutlined />}
                onClick={() => handleAceptSuccess(record)}
                style={{ background: '#F6FFED', borderColor: '#52C41A', color: '#52C41A' }}
              />
            </Tooltip>
          )}


        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px', background: '#f0f2f5' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <h2 style={{ margin: 0, fontSize: '24px' }}>Quản lý Đơn Hàng</h2>
        <Space>
          <Input
            placeholder="Tìm kiếm đơn hàng"
            prefix={<SearchOutlined />}
            style={{ marginBottom: '10px', marginRight: '10px', width: 300 }}
            value={searchQuery}
            onChange={handleSearch}
          />
          {selectedRowKeys.length > 0 && (
            <Button type="primary" danger onClick={handleDeleteSelectedOrders} icon={<DeleteOutlined />}>
              Xóa đơn hàng đã chọn
            </Button>
          )}
        </Space>
      </div>


      <Table
        rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
        columns={columns}
        dataSource={filteredOrders}
        loading={isLoading}
        pagination={{ pageSize: 10 }}
        rowKey="key"
        style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
      />

      <Drawer
        title="Chi tiết đơn hàng"
        width={800} // Tăng độ rộng của Drawer
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
      >
        {stateOrderDetails ? (
          <div style={{ padding: '20px' }}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <Card title={<Text strong>Thông tin khách hàng</Text>} >
                  <p><Text strong>Tên khách hàng:</Text> {stateOrderDetails.shippingAddress.name}</p>
                  <p><Text strong>Số điện thoại:</Text> {stateOrderDetails.shippingAddress.phone}</p>
                  <p><Text strong>Địa chỉ:</Text> {stateOrderDetails.shippingAddress.address}</p>
                </Card>
              </Col>
              <Col span={24}>
                <Text strong>Trạng thái đơn hàng:</Text>{" "}
                <Tag
                  color={
                    stateOrderDetails.isDelivered
                      ? stateOrderDetails.isSuccess
                        ? "success"
                        : "processing"
                      : "warning"
                  }
                  style={{ marginLeft: '10px' }}
                >
                  {stateOrderDetails.isDelivered
                    ? stateOrderDetails.isSuccess
                      ? "Giao hàng thành công"
                      : "Đang giao hàng"
                    : "Chưa giao hàng"}
                </Tag>
                <br />
                <Text style={{ marginTop: '10px' }} strong>Thanh toán:</Text>{" "}
                <Tag
                  color={stateOrderDetails.isPaid ? "success" : "warning"}
                  style={{ marginLeft: '10px' }}
                >
                  {stateOrderDetails.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                </Tag>
              </Col>


              <Col span={24}>
                <Text strong>Sản phẩm:</Text>
                <Table
                  columns={[
                    { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name' },
                    { title: 'Số lượng', dataIndex: 'amount', key: 'amount', align: 'center' },
                    {
                      title: 'Giá', dataIndex: 'price', key: 'price', align: 'right',
                      render: (price) => price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
                    },
                  ]}
                  dataSource={stateOrderDetails.orderItems.map((item, index) => ({ ...item, key: index }))}
                  pagination={false}
                  style={{ marginTop: '10px' }}
                />
              </Col>

              <Col span={24} style={{ textAlign: 'right' }}>
                <Text strong style={{ fontSize: '1.2em' }}>Tổng tiền:</Text>{" "}
                <Text strong style={{ fontSize: '1.2em', color: '#1890ff' }}>
                  {stateOrderDetails.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </Text>
              </Col>
            </Row>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
            <LoadingOutlined style={{ fontSize: 24 }} spin />
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default AdminOrder;