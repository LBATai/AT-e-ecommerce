import React, { useState } from 'react';
import { Table, Button, Input, Space, Modal, Form, InputNumber, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../Service/ProductService';
import { useMutationHooks } from '../../hooks/useMutationHook';

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Hook cho mutation thêm sản phẩm mới
  const mutation = useMutationHooks(
    async (newProduct) => {
      console.log('Sending product:', newProduct); // Debug khi gửi yêu cầu
      return await ProductService.createProduct(newProduct);
    },
    {
      onSuccess: (data) => {
        console.log('Product added successfully:', data);
        message.success('Sản phẩm đã được thêm thành công!');
        setIsModalOpen(false);  // Đóng modal sau khi thêm sản phẩm
        form.resetFields();  // Reset form sau khi thêm sản phẩm
      },
      onError: (error) => {
        console.log('Error occurred:', error);
        message.error(`Đã xảy ra lỗi: ${error.message}`);
      }
    }
  );

  // Hàm gọi API để lấy danh sách sản phẩm
  const fetchProductAll = async () => {
    const response = await ProductService.getAllProduct();
    return response?.data || [];
  };

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product'],
    queryFn: fetchProductAll,
  });

  const formattedProducts = product?.map((item) => ({
    key: item._id,
    id: item._id,
    name: item.name,
    price: item.price,
    type: item.type,
    rating: item.rating,
    discountedPrice: item.price - (item.price * item.discount) / 100,
    stock: item.countInStock,
    category: item.type,
    description: item.description,
    image: item.image,
  })) || [];

  const columns = [
    {
      title: 'Mã Sản Phẩm',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Loại Sản Phẩm',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Đánh giá sản phẩm',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `${price.toLocaleString()}₫`,
    },
    {
      title: 'Giá Khuyến Mãi',
      dataIndex: 'discountedPrice',
      key: 'discountedPrice',
      render: (discountedPrice) => `${discountedPrice.toLocaleString()}₫`,
    },
    {
      title: 'Số Lượng',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Danh Mục',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Mô Tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={image} alt="Product" width="50" />,
    },
    {
      title: 'Thao Tác',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="primary" icon={<EditOutlined />} size="small">
            Sửa
          </Button>
          <Button type="primary" danger icon={<DeleteOutlined />} size="small">
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields(); // Reset form khi đóng modal
  };

  const handleAddProduct = async () => {
    try {
      const values = await form.validateFields();  // Kiểm tra và xác thực form
      console.log('Submitting values:', values);  // In dữ liệu gửi lên API để kiểm tra
  
      // Chuyển đổi giá trị các trường cần thiết sang kiểu dữ liệu số
      const formattedValues = {
        ...values,
        price: parseFloat(values.price),  // Chuyển giá trị price sang số
        rating: parseFloat(values.rating),  // Chuyển giá trị rating sang số
        countInStock: parseInt(values.countInStock),  // Chuyển countInStock sang số nguyên
      };
  
      console.log('Sending product:', formattedValues);  // In dữ liệu đã được chuyển đổi
  
      // Gọi mutation để gửi yêu cầu
      mutation.mutate(formattedValues, {
        onSuccess: (data) => {
          console.log('Product added successfully:', data);
          message.success('Sản phẩm đã được thêm thành công!');
          setIsModalOpen(false);  // Đóng modal sau khi thêm sản phẩm
          form.resetFields();  // Reset form sau khi thêm sản phẩm
        },
        onError: (error) => {
          console.log('Error occurred:', error);
          message.error(`Đã xảy ra lỗi: ${error.message}`);
        }
      });
    } catch (error) {
      console.log('Lỗi khi xác thực form', error);
      message.error('Vui lòng điền đầy đủ thông tin sản phẩm!');
    }
  };

  if (isLoading) return <div>Đang tải dữ liệu...</div>;
  if (isError) return <div>Đã xảy ra lỗi khi tải dữ liệu!</div>;

  return (
    <div style={{ padding: '20px', background: '#fff' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>Quản lý Sản Phẩm</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Thêm Sản Phẩm Mới
        </Button>
      </div>

      {/* Input tìm kiếm */}
      <Input.Search
        placeholder="Tìm sản phẩm..."
        allowClear
        enterButton="Tìm kiếm"
        size="large"
        style={{ marginBottom: '20px' }}
      />

      {/* Bảng sản phẩm */}
      <Table
        columns={columns}
        dataSource={formattedProducts}
        rowKey="key"
        pagination={{ pageSize: 5 }}
        loading={isLoading}
      />

      {/* Modal thêm sản phẩm */}
      <Modal
        title="Thêm Sản Phẩm Mới"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên Sản Phẩm"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm' }]}
          >
            <Input type="number" placeholder="Nhập giá sản phẩm" />
          </Form.Item>
          <Form.Item
            name="rating"
            label="Đánh giá sản phẩm"
            rules={[{ required: true, message: 'Vui lòng nhập đánh giá sản phẩm' }]}
          >
            <Input type="number" placeholder="Nhập đánh giá sản phẩm" />
          </Form.Item>
          <Form.Item
            name="type"
            label="Loại sản phẩm"
            rules={[{ required: true, message: 'Vui lòng nhập loại sản phẩm' }]}
          >
            <Input  placeholder="Nhập loại sản phẩm" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô Tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm' }]}
          >
            <Input.TextArea placeholder="Nhập mô tả sản phẩm" />
          </Form.Item>
          <Form.Item
            name="countInStock"
            label="Số Lượng"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
          >
            <Input type="number" placeholder="Nhập số lượng sản phẩm" />
          </Form.Item>
          <Form.Item
            name="image"
            label="Hình Ảnh"
            rules={[{ required: true, message: 'Vui lòng chọn hình ảnh sản phẩm' }]}
          >
            <Input placeholder="URL hình ảnh sản phẩm" />
          </Form.Item>
          <Button
            type="primary"
            onClick={handleAddProduct}
            loading={mutation.isLoading}  // Hiển thị trạng thái khi đang gửi yêu cầu
          >
            Thêm Sản Phẩm
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProduct;
