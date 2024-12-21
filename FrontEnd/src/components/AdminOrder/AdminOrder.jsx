import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Modal, Form, message, Space, Drawer, Select, Tag, Typography} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import * as OrderService from '../../Service/OrderService';

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rowSelected, setRowSelected] = useState('');
  const [stateOrderDetails, setStateOrderDetails] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { Text } = Typography;
  const onSelectChange = (newSelectedRowKeys) => setSelectedRowKeys(newSelectedRowKeys);

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
      message.error('Không thể lấy danh sách đơn hàng');
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
      message.error('Không thể lấy chi tiết đơn hàng');
    }
  };

  const handleDeleteOrder = (record) => {
    Modal.confirm({
      title: `Xác nhận xóa đơn hàng: ${record.name}`,
      content: 'Bạn có chắc chắn muốn xóa đơn hàng này không?',
      onOk: async () => {
        try {
          await OrderService.deleteOrder(record.key);
          message.success('Xóa đơn hàng thành công!');
          fetchAllOrders();
        } catch (error) {
          message.error('Xóa đơn hàng thất bại!');
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
          message.success('Xác nhận giao đơn hàng thành công!');
          fetchAllOrders(); // Làm mới danh sách đơn hàng
        } catch (error) {
          message.error('Xác nhận giao đơn hàng thất bại!');
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
          message.success('Xác nhận hoàn thành đơn hàng!');
          fetchAllOrders(); // Làm mới danh sách đơn hàng
        } catch (error) {
          message.error('Xác nhận đơn hàng thất bại!');
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
          message.success('Xác nhận thanh toán thành công!');
          fetchAllOrders(); // Làm mới danh sách đơn hàng
        } catch (error) {
          message.error('Xác nhận thanh toán thất bại!');
        }
      },
    });
  };
  

  const handleDeleteSelectedOrders = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Vui lòng chọn ít nhất một đơn hàng để xóa.');
      return;
    }

    Modal.confirm({
      title: `Xóa ${selectedRowKeys.length} đơn hàng`,
      content: 'Bạn có chắc chắn muốn xóa các đơn hàng đã chọn?',
      onOk: async () => {
        try {
          await OrderService.deleteMultipleOrders(selectedRowKeys);
          message.success('Xóa đơn hàng thành công!');
          fetchAllOrders();
          setSelectedRowKeys([]);
        } catch (error) {
          message.error('Xóa đơn hàng thất bại!');
        }
      },
    });
  };

  const columns = [
    { title: 'Tên khách hàng', dataIndex: 'name', key: 'name' },
    { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
    { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
    {
      title: 'Thanh toán',
      key: 'paymentStatus',
      render: (text, record) => (
        <span>
          <Text type="secondary">Phương thức: {record.paymentMethod || 'Chưa xác định'}</Text>
          <br />
          <Tag color={record.isPaid ? "success" : "warning"}>
            {record.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
          </Tag>
        </span>
      ),
    },
    
    {
      title: 'Trạng thái',
      dataIndex: 'isDelivered',
      key: 'isDelivered',
      render: (isDelivered, record) => {
        // console.log('isDelivered:', isDelivered); // Kiểm tra giá trị của isDelivered
        // console.log('isSuccess:', record.isSuccess); // Kiểm tra giá trị của isSuccess
        return (
          <span>
            <Tag color={isDelivered ? (record.isSuccess ? "success" : "processing") : "warning"}>
              {isDelivered 
                ? (record.isSuccess ? "Giao hàng thành công" : "Đang giao hàng") 
                : "Chưa giao hàng"
              }
            </Tag>
          </span>
        );
      },
    },

    
    { title: 'Tổng tiền', dataIndex: 'totalPrice', key: 'totalPrice' },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => fetchOrderDetails(record.key)}
          >
            Chi tiết
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => handleDeleteOrder(record)}
          >
            Xóa
          </Button>
          {!record.isDelivered && !record.isSuccess && ( // Hiển thị nút nếu chưa giao hàng và chưa thành công
            <Button
              type="primary"
              color="default"
              variant="solid"
              size="small"
              onClick={() => handleAceptDelivery(record)}
            >
              Xác nhận giao hàng
            </Button>
          )}

          {!record.isPaid && record.isDelivered  && ( // Hiển thị nút nếu đã giao hàng nhưng chưa thành công
            <Button
              type="primary"
              size="small"
              onClick={() => handleAceptPaid(record)}
            >
              Xác nhận đã thanh toán
            </Button>
          )}

          {record.isDelivered && !record.isSuccess && record.isPaid && ( // Hiển thị nút nếu đã giao hàng nhưng chưa thành công
            <Button
              type="primary"
              size="small"
              onClick={() => handleAceptSuccess(record)}
            >
              Xác nhận thành công
            </Button>
          )}
          
        </Space>
      ),
    },
    
    
  ];

  return (
    <div style={{ padding: '20px', background: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>Quản lý Đơn Hàng</h2>
        {selectedRowKeys.length > 0 && (
          <Button type="primary" danger onClick={handleDeleteSelectedOrders}>
            Xóa các đơn hàng đã chọn
          </Button>
        )}
      </div>

      <Input.Search placeholder="Tìm đơn hàng..." style={{ marginBottom: '20px' }} allowClear />

      <Table
        rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
        columns={columns}
        dataSource={orders}
        loading={isLoading}
        pagination={{ pageSize: 5 }}
        rowKey="key"
      />

      <Drawer
        title="Chi tiết đơn hàng"
        width={600}
        onClose={() => setIsDrawerOpen(false)}
        visible={isDrawerOpen}
      >
        {stateOrderDetails ? (
          <>
            <p><b>Tên khách hàng:</b> {stateOrderDetails.shippingAddress.name}</p>
            <p><b>Số điện thoại:</b> {stateOrderDetails.shippingAddress.phone}</p>
            <p><b>Địa chỉ:</b> {stateOrderDetails.shippingAddress.address}</p>
            <p><b>Tổng tiền:</b> {stateOrderDetails.totalPrice.toLocaleString('vi-VN')} VND</p>
            <p><b>Trạng thái:</b> 
              <Tag color={stateOrderDetails.isDelivered ? "success" : "warning"}>
              {stateOrderDetails.isDelivered ?"Đã giao" : "Chưa giao"}
              </Tag>
            </p>
            <h3>Sản phẩm: </h3>
            {stateOrderDetails.orderItems.map((item, index) => (
              <p key={index}>
                {item.name} - {item.amount} x {item.price.toLocaleString('vi-VN')} VND
              </p>
            ))}
          </>
        ) : (
          <p>Đang tải...</p>
        )}
      </Drawer>
    </div>
  );
};

export default AdminOrder;
