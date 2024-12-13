import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Modal, Form, message, Upload, Space, Select  } from 'antd';
import { PlusOutlined, UploadOutlined, EditOutlined, DeleteOutlined,  } from '@ant-design/icons';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as ProductService from '../../Service/ProductService';
import { getBase64 } from '../../utils';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import { useSelector } from 'react-redux'
import {renderOptions, fetchAllTypeProduct, formatCurrencyVND} from '../../utils'
const AdminProduct = () => {
  const user = useSelector((state) => state.user)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addForm] = Form.useForm(); // Form riêng cho thêm sản phẩm
  const [updateForm] = Form.useForm(); // Form riêng cho cập nhật sản phẩm  
  const [image, setImage] = useState('');
  const [products, setProducts] = useState([]); // State lưu danh sách sản phẩm
  const [isOpenDrawer, setIsOpenDrawer] = useState(false); // Lưu tổng số sản phẩm
  const [rowSelected, setRowSelected] = useState('')
  const [stateProductDetails, setStateProductDetails] = useState('')
  const [selectedProductName, setSelectedProductName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [types, setTypes] = useState([]); 
  const [newType, setNewType] = useState('');
  const [isAddingType, setIsAddingType] = useState(false);
  const [selectedType, setSelectedType] = useState(types[0]);// Trạng thái lưu loại sản phẩm đã chọn

      // Lấy danh sách loại sản phẩm từ API
    useEffect(() => {
      const fetchTypes = async () => {
        const data = await fetchAllTypeProduct();
        setTypes(data); // Lưu mảng loại sản phẩm
      };
      fetchTypes();
    }, []);

  const handleAddType = () => {
    if (newType.trim()) {
      // Thêm loại mới vào danh sách types
      setTypes((prevTypes) => [...prevTypes, newType]);
      setSelectedType(newType); // Đặt giá trị đã chọn là loại mới
      setNewType('');
      setIsAddingType(false); // Ẩn ô input sau khi thêm loại mới
    }
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await ProductService.getAllProduct();
      if (response && response.status === "OK") {
        setProducts(response.data); // Cập nhật sản phẩm
        // console.log('response.data', response.data)
      } else {
        console.error("Dữ liệu không hợp lệ:", response);
      }
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
      message.error("Không thể lấy danh sách sản phẩm");
    }finally {
      setIsLoading(false); // Kết thúc tải
    }
  };
  useEffect(() => {
    fetchProducts(); 
  }, []);
  const fetchGetDetailsProduct = async () => {
    const res = await ProductService.getDetailsProduct(rowSelected)
    if (res?.data) {
      setStateProductDetails({
        id: res?.data._id,
        name: res?.data?.name,
        price: res?.data?.price,
        rating: res?.data?.rating,
        type: res?.data?.type,
        countInStock: res?.data?.countInStock,
        description: res?.data?.description,
        image: res?.data?.image,
        discount: res?.data?.discount,
        selled: res?.data?.selled
      }),
      setImage(res?.data?.image);
    }
    return res
  }
  
  const mutation = useMutationHooks(
    async (newProduct) => {
      const response = await ProductService.createProduct(newProduct);
      return response;
    },
  );
  

  
  useEffect(() => {
    if (mutation.isSuccess) {
      const response = mutation.data;
  
      if (response && response.message === 'Product created successfully') {
        message.success('Sản phẩm đã được thêm thành công!');
        setIsModalOpen(false); // Tắt modal
        addForm.resetFields(); // Reset form
        updateForm.resetFields(); // Reset form
        setImage('');
        setProducts([...products, response.data]); // Cập nhật danh sách sản phẩm
      } else if (response && response.message === 'The name of product is already') {
        message.error('Sản phẩm đã tồn tại!');
      } else {  
        message.error('Vui lòng nhập đủ các thông tin của sản phẩm!');
      }
    }
  
    if (mutation.isError) {
      message.error('Đã xảy ra lỗi, vui lòng thử lại!');
    }
  }, [mutation.isSuccess, mutation.isError, mutation.data]);


  useEffect(() => {
    if (stateProductDetails) {
      addForm.setFieldsValue(stateProductDetails);
    }
  }, [addForm, stateProductDetails]);

  useEffect(() => {
    if (stateProductDetails) {
    updateForm.setFieldsValue(stateProductDetails)
  }
  }, [updateForm, stateProductDetails]);

  useEffect(() => {
    if (rowSelected){
      fetchGetDetailsProduct()
    }
  }, [rowSelected]);
  const handleDetailProduct = (record) => {
    setRowSelected(record._id);
    setSelectedProductName(record.name);      
    setIsOpenDrawer(true); // Mở drawer
  };
  const handleDeleteProduct = (record) => {
    setSelectedProductName(record.name); 
    Modal.confirm({
      title: `Xác nhận xóa sản phẩm: ${record.name}`,
      content: 'Bạn có chắc chắn muốn xóa sản phẩm này không?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          const res = await ProductService.deleteProduct(record._id);
          if (res?.status === 'OK') {
            message.success('Xóa sản phẩm thành công!');
            fetchProducts(); // Làm mới danh sách sản phẩm sau khi xóa
          } else {
            message.error('Xóa sản phẩm thất bại!');
          }
        } catch (error) {
          console.error('Lỗi khi xóa sản phẩm:', error);
          message.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
        }
      },
    });
  };
  
  const columns = [
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (text) => formatCurrencyVND(text), // Hiển thị giá có thêm đơn vị VND
      sorter: (a, b) => a.price - b.price
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      sorter: (a, b) => a.rating - b.rating
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      sorter: (a, b) => a.type.localeCompare(b.type)
    },
    {
      title: 'Mô Tả',
      dataIndex: 'description',
      key: 'description',
      render: (text) => (text.length > 20 ? `${text.substring(0, 20)}...` : text), // Rút ngắn mô tả nếu dài
      sorter: (a, b) => a.description.localeCompare(b.description)
    },
    {
      title: 'Số Lượng',
      dataIndex: 'countInStock',
      key: 'countInStock',
      sorter: (a, b) => a.countInStock - b.countInStock
    },
    {
      title: 'Thao Tác',
      key: 'actions',
      render: (record) => (
        <Space>
          <Button type="primary" icon={<EditOutlined />} size="small" onClick={() => handleDetailProduct(record)}>
            Sửa
          </Button>
          <Button type="primary" danger icon={<DeleteOutlined />} size="small" onClick={() => handleDeleteProduct(record)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const showModal = () => {
    setImage('');
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    updateForm.resetFields();
    addForm.resetFields();
    setImage('');
  };

  const handleOnchangeImage = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setImage(file.preview); // Cập nhật hình ảnh
  };
  const handleDeleteSelectedProducts = async () => {
    // console.log('Selected Row Keys:', selectedRowKeys); 
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: `Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} sản phẩm đã chọn không?`,
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          const res = await ProductService.deleteMultipleProducts(selectedRowKeys); // Gọi API xóa nhiều sản phẩm
          if (res?.status === 'OK') {
            message.success('Xóa sản phẩm thành công!');
            fetchProducts(); // Làm mới danh sách sản phẩm
            setSelectedRowKeys([]); // Reset danh sách sản phẩm được chọn
          } else {
            message.error('Xóa sản phẩm thất bại!');
          }
        } catch (error) {
          console.error('Lỗi khi xóa sản phẩm:', error);
          message.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
        }
      },
    });
  };
// Hàm handleSearch thực hiện tìm kiếm khi có từ khóa
const handleSearch = async () => {
  try {
      const response = await ProductService.getAllProduct(searchText); // Gửi từ khóa tìm kiếm
      setProducts(response.data); // Cập nhật danh sách sản phẩm
  } catch (error) {
      console.error('Lỗi khi tìm kiếm sản phẩm:', error);
  }
};

  const onFinish = (values) => {
    const newProduct = {
      ...values,
      image, // Thêm hình ảnh đã chọn (nếu có)
    };
    mutation.mutate(newProduct); // Gửi yêu cầu tạo sản phẩm
  };

  const mutationUpdateProduct = useMutationHooks(
    (data) => {
      const { id, access_token, ...restData } = data;  // Tách access_token và giữ lại dữ liệu cần cập nhật
      const res = ProductService.updateProduct(id, access_token, restData); // Gọi hàm updateProduct với đúng tham số
      return res;
    },
  );

  const onFinishUpdateProduct = (values) => {
    const data = {
      ...values,
      image, // Nếu có thêm image
    };
    // Truyền id, access_token và dữ liệu cần cập nhật vào mutate
    mutationUpdateProduct.mutate({ id: rowSelected, access_token: user?.access_token, ...data });
  };
  
  useEffect(() => {
    if (mutationUpdateProduct.isSuccess) {
      const responseUpdate = mutationUpdateProduct.data;
  
      if (responseUpdate && responseUpdate.message === 'Update product successfully') {
        message.success('Sản phẩm đã được cập nhật thành công!');
        setIsOpenDrawer(false); // Tắt modal
        setImage('');
        // Cập nhật danh sách sản phẩm bằng cách thay thế sản phẩm cũ với sản phẩm mới
        setProducts(prevProducts => 
          prevProducts.map(product => 
            product._id === responseUpdate.data._id ? responseUpdate.data : product
          )
        );
      } else {
        message.error('Có lỗi khi cập nhật sản phẩm!');
      }
    }
  
    if (mutationUpdateProduct.isError) {
      message.error('Đã xảy ra lỗi, vui lòng thử lại!');
    }
  }, [mutationUpdateProduct.isSuccess, mutationUpdateProduct.isError, mutationUpdateProduct.data]);

  return (
    <div style={{ padding: '20px', background: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>Quản lý Sản Phẩm</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Thêm Sản Phẩm Mới
        </Button>
        {selectedRowKeys.length > 0 && (
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={handleDeleteSelectedProducts}
          >
            Xóa các sản phẩm đã chọn
          </Button>
        )}
      </div>

      <Input.Search
        placeholder="Tìm sản phẩm..."
        allowClear
        enterButton="Tìm kiếm"
        size="large"
        style={{ marginBottom: '20px' }}
        onChange={(e) => setSearchText(e.target.value)} // Cập nhật từ khóa
        onSearch={handleSearch}
      />

      <Table
        rowSelection={rowSelection} 
        columns={columns}
        rowKey="_id"
        loading={isLoading}
        pagination={{
          pageSize: 8,
          style: { display: 'flex', justifyContent: 'center' }, // Căn giữa pagination
        }} 
        dataSource={products}
        onRow={(record, rowIdex) => {
          return {
            onClick: event => {
              setRowSelected(record._id)
            }
          }
        }}
      />
      <Modal title="Thêm Sản Phẩm Mới" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form form={addForm} layout="vertical" onFinish={onFinish} initialValues={{type: selectedType,  }}>
          <Form.Item name="name" label="Tên Sản Phẩm" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}>
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>
          <Form.Item
  name="price"
  label="Giá sản phẩm (VNĐ)"
  rules={[
    { required: true, message: "Vui lòng nhập giá sản phẩm" },
    {
      validator: (_, value) =>
        value && value < 1
          ? Promise.reject(new Error("Giá sản phẩm phải lớn hơn 0"))
          : Promise.resolve(),
    },
  ]}
>
  <Input
    type="number"
    placeholder="Nhập giá sản phẩm"
    onChange={(e) => {
      const value = e.target.value; // Lấy giá trị từ input
      addForm.setFieldsValue({ price: value }); // Cập nhật vào form
    }}
    onBlur={(e) => {
      const value = parseFloat(e.target.value);
      if (!isNaN(value) && value >= 0) {
        addForm.setFieldsValue({ price: formatCurrencyVND(value) }); // Hiển thị định dạng VND
      } else {
        addForm.setFieldsValue({ price: '' }); // Xóa giá trị nếu không hợp lệ
      }
    }}
  />
</Form.Item>

          <Form.Item name="rating" label="Đánh giá sản phẩm (★)"           
          rules={[
            { required: true, message: 'Vui lòng nhập đánh giá sản phẩm' },
            {
              validator: (_, value) =>
                value && (value < 1 || value > 5)
                  ? Promise.reject(new Error('Đánh giá sản phẩm phải nằm trong khoảng 1 đến 5 sao'))
                  : Promise.resolve(),
            },
          ]}>
            <Input type="number" placeholder="Nhập đánh giá sản phẩm" />
          </Form.Item>
          <Form.Item
            name="type"
            label="Loại sản phẩm"
            rules={[{ required: true, message: "Vui lòng chọn loại sản phẩm" }]}
          >
            <Select
              placeholder="Chọn loại sản phẩm"
              allowClear
              value={selectedType} // Sử dụng selectedType để quản lý giá trị đã chọn
              onChange={(value) => {
                if (value === 'add_type') {
                  setIsAddingType(true); // Hiển thị ô nhập liệu khi chọn "Thêm type"
                } else {
                  setSelectedType(value); // Cập nhật giá trị đã chọn
                  setIsAddingType(false); // Nếu chọn loại có sẵn, ẩn ô nhập liệu
                }
              }}
              options={renderOptions(types)} // Sử dụng kết quả từ hàm renderOptions
            />
          </Form.Item>

          {isAddingType && (
            <Form.Item label="Nhập loại sản phẩm mới">
              <Input
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                placeholder="Nhập loại sản phẩm mới"
              />
              <Button type="primary" onClick={handleAddType} style={{ marginTop: 10 }}>
                Thêm loại
              </Button>
            </Form.Item>
          )}
          <Form.Item name="description" label="Mô Tả" rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm' }]}>
            <Input.TextArea placeholder="Nhập mô tả sản phẩm" />
          </Form.Item>
          <Form.Item name="countInStock" label="Số Lượng sản phẩm" 
          rules={[
            { required: true, message: 'Vui lòng nhập số lượng' },
            {
              validator: (_, value) =>
                value && (value < 1)
                  ? Promise.reject(new Error('Số lượng sản phẩm phải lớn hơn 0'))
                  : Promise.resolve(),
            },
          ]}>
            <Input type="number" placeholder="Nhập số lượng sản phẩm" />
          </Form.Item>
          <Form.Item name="discount" label="Phần trăm giảm giá"           
          rules={[
            { required: true, message: 'Vui lòng nhập phần trăm giảm giá trong khoảng 0 - 100' },
            {
              validator: (_, value) =>
                value && (value < 0 || value > 100)
                  ? Promise.reject(new Error('Phần trăm giảm giá phải nằm trong khoảng 1 đến 100'))
                  : Promise.resolve(),
            },
          ]}>
            <Input type="number" placeholder="Nhập phần trăm giảm giá" />
          </Form.Item>
          <Form.Item name="selled" label="Số lượng đã bán" 
          rules={[
            { required: true, message: 'Vui lòng nhập số lượng đã bán' },
            {
              validator: (_, value) =>
                value && (value < 0)
                  ? Promise.reject(new Error('Số lượng sản phẩm đã bán phải lớn hơn hoặc bằng 0'))
                  : Promise.resolve(),
            },
          ]}>
            <Input type="number" placeholder="Nhập số lượng đã bán" />
          </Form.Item>
          <Form.Item label="Hình Ảnh" rules={[{ required: true, message: 'Vui lòng chọn hình ảnh sản phẩm' }]} style={{display: 'flex', }}>
            <Upload onChange={handleOnchangeImage} maxCount={1} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Upload>
            {image && (
              <img
                src={image}
                alt="Product Image"
                style={{ width: "100px", height: "100px", marginTop: "10px" }}
              />
            )}
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={mutation.isLoading}>
            Thêm Sản Phẩm
          </Button>
        </Form>
      </Modal>
      <DrawerComponent title={`Chỉnh sửa sản phẩm: ${selectedProductName}`}  isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="50%"  >
      <Form form={updateForm} layout="vertical" onFinish={onFinishUpdateProduct}>
          <Form.Item name="name" label="Tên Sản Phẩm" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}>
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>
          <Form.Item name="price" label="Giá sản phẩm (vnđ)"           
          rules={[
            { required: true, message: 'Vui lòng nhập giá sản phẩm' },
            {
              validator: (_, value) =>
                value && (value < 1)
                  ? Promise.reject(new Error('Giá sản phẩm phải lớn hơn 0'))
                  : Promise.resolve(),
            },
          ]}>
            <Input type="number" placeholder="Nhập giá sản phẩm" />
          </Form.Item>
          <Form.Item name="rating" label="Đánh giá sản phẩm (★)"           
          rules={[
            { required: true, message: 'Vui lòng nhập đánh giá sản phẩm' },
            {
              validator: (_, value) =>
                value && (value < 1 || value > 5)
                  ? Promise.reject(new Error('Đánh giá sản phẩm phải nằm trong khoảng 1 đến 5 sao'))
                  : Promise.resolve(),
            },
          ]}>
            <Input type="number" placeholder="Nhập đánh giá sản phẩm" />
          </Form.Item>
          <Form.Item name="type" label="Loại sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập loại sản phẩm' }]}>
            <Input placeholder="Nhập loại sản phẩm" />
          </Form.Item>
          <Form.Item name="description" label="Mô Tả" rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm' }]}>
            <Input.TextArea placeholder="Nhập mô tả sản phẩm" />
          </Form.Item>
          <Form.Item name="countInStock" label="Số Lượng sản phẩm" 
          rules={[
            { required: true, message: 'Vui lòng nhập số lượng' },
            {
              validator: (_, value) =>
                value && (value < 1)
                  ? Promise.reject(new Error('Số lượng sản phẩm phải lớn hơn 0'))
                  : Promise.resolve(),
            },
          ]}>
            <Input type="number" placeholder="Nhập số lượng sản phẩm" />
          </Form.Item>
          <Form.Item name="discount" label="Phần trăm giảm giá"           
          rules={[
            { required: true, message: 'Vui lòng nhập phần trăm giảm giá trong khoảng 0 - 100' },
            {
              validator: (_, value) =>
                value && (value < 0 || value > 100)
                  ? Promise.reject(new Error('Phần trăm giảm giá phải nằm trong khoảng 1 đến 100'))
                  : Promise.resolve(),
            },
          ]}>
            <Input type="number" placeholder="Nhập phần trăm giảm giá " />
          </Form.Item>
          <Form.Item name="selled" label="Số lượng đã bán" 
          rules={[
            { required: true, message: 'Vui lòng nhập số lượng đã bán' },
            {
              validator: (_, value) =>
                value && (value < 0)
                  ? Promise.reject(new Error('Số lượng sản phẩm đã bán phải lớn hơn hoặc bằng 0'))
                  : Promise.resolve(),
            },
          ]}>
            <Input type="number" placeholder="Nhập số lượng đã bán" />
          </Form.Item>
          <Form.Item label="Hình Ảnh" rules={[{ required: true, message: 'Vui lòng chọn hình ảnh sản phẩm' }]} style={{display: 'flex', }}>
            <Upload onChange={handleOnchangeImage} maxCount={1} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Upload>
            {image && (
              <img
                src={image}
                alt="Product Image"
                style={{ width: "100px", height: "100px", marginTop: "10px" }}
              />
            )}
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={mutationUpdateProduct.isLoading} >
            Lưu thông tin sản phẩm
          </Button>
        </Form>
      </DrawerComponent>
    </div>
  );
};

export default AdminProduct;
