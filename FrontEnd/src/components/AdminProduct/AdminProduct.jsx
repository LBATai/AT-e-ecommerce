import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Modal, Form, message, Upload, Space, Select, Row, Col, Card } from 'antd';
import { PlusOutlined, UploadOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as ProductService from '../../Service/ProductService';
import { getBase64 } from '../../utils';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import { useSelector } from 'react-redux'
import { renderOptions, fetchAllTypeProduct, formatCurrencyVND } from '../../utils'

const AdminProduct = () => {
  const user = useSelector((state) => state.user)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [images, setImages] = useState([]);
  const [products, setProducts] = useState([]);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [rowSelected, setRowSelected] = useState('')
  const [stateProductDetails, setStateProductDetails] = useState('')
  const [selectedProductName, setSelectedProductName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [types, setTypes] = useState([]);
  const [newType, setNewType] = useState('');
  const [isAddingType, setIsAddingType] = useState(false);
  const [selectedType, setSelectedType] = useState(types[0]);

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
  const fetchAllProducts = async () => {
    setIsLoading(true);
    try {
      const response = await ProductService.getAllProduct();
      if (response && response.status === "OK") {
        setProducts(response.data);
      } else {
        console.error("Dữ liệu không hợp lệ:", response);
      }
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
      message.error("Không thể lấy danh sách sản phẩm", 3);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAllProducts();
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
        countAllInStock: res?.data?.countAllInStock,
        description: res?.data?.description,
        images: res?.data?.images,
        discount: res?.data?.discount,
        selled: res?.data?.selled,
        options: res.data.options,
        sex: res.data.sex
      }),
        setImages(res?.data?.images);
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
        message.success('Sản phẩm đã được thêm thành công!', 3);
        setIsModalOpen(false);
        addForm.resetFields();
        updateForm.resetFields();
        setImages('');
        setProducts([...products, response.data]);
      } else {
        message.error(response.message || 'Vui lòng nhập đủ các thông tin của sản phẩm!', 3);
      }
    }

    if (mutation.isError) {
      if (mutation.error && mutation.error.response && mutation.error.response.data) {
        const errorMessage = mutation.error.response.data.message || 'Đã xảy ra lỗi, vui lòng thử lại!';
        if (errorMessage === 'The name of the product already exists') {
          message.error('Tên sản phẩm đã tồn tại!', 3);
        } else if (errorMessage === 'Images are required') {
          message.error('Ảnh sản phẩm là bắt buộc!', 3);
        } else {
          message.error(errorMessage, 3);
        }
      } else {
        message.error('Đã xảy ra lỗi, vui lòng thử lại!', 3);
      }
    }
  }, [mutation.isSuccess, mutation.isError, mutation.data, mutation.error]);


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
    if (rowSelected) {
      fetchGetDetailsProduct()
    }
  }, [rowSelected]);

  const handleDetailProduct = (record) => {
    setRowSelected(record._id);
    setSelectedProductName(record.name);
    setIsOpenDrawer(true);
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
            message.success('Xóa sản phẩm thành công!', 3);
            fetchAllProducts();
          } else {
            message.error('Xóa sản phẩm thất bại!', 3);
          }
        } catch (error) {
          console.error('Lỗi khi xóa sản phẩm:', error);
          message.error('Đã xảy ra lỗi, vui lòng thử lại sau!', 3);
        }
      },
    });
  };

  const showModal = () => {
    setImages('');
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    updateForm.resetFields();
    addForm.resetFields();
    setImages('');
  };

  const handleOnchangeImages = async ({ fileList }) => {
    const newImages = await Promise.all(fileList.map(async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      return file.preview;
    }));

    setImages(newImages);
  };
  const handleDeleteSelectedProducts = async () => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: `Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} sản phẩm đã chọn không?`,
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          const res = await ProductService.deleteMultipleProducts(selectedRowKeys);
          if (res?.status === 'OK') {
            message.success('Xóa sản phẩm thành công!', 3);
            fetchAllProducts();
            setSelectedRowKeys([]);
          } else {
            message.error('Xóa sản phẩm thất bại!', 3);
          }
        } catch (error) {
          console.error('Lỗi khi xóa sản phẩm:', error);
          message.error('Đã xảy ra lỗi, vui lòng thử lại sau!', 3);
        }
      },
    });
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase()) ||
    product.type.toLowerCase().includes(searchText.toLowerCase()) ||
    product.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const onFinish = (values) => {
    if (values.options && Array.isArray(values.options)) {
      if (!values.options || !Array.isArray(values.options) || values.options.length === 0) {
        message.error("Vui lòng thêm ít nhất một màu sắc.", 3);
        return;
      }
      const invalidColor = values.options.find(
        (option) => !option.sizes || option.sizes.length === 0
      );

      if (invalidColor) {
        message.error("Vui lòng thêm ít nhất một kích thước cho mỗi màu sắc.", 3);
        return;
      }
    }
    const newProduct = {
      ...values,
      images,
    };
    mutation.mutate(newProduct);
  };

  const mutationUpdateProduct = useMutationHooks(
    (data) => {
      const { id, access_token, ...restData } = data;
      const res = ProductService.updateProduct(id, access_token, restData);
      return res;
    },
  );

  const onFinishUpdateProduct = (values) => {
    let totalStock = 0;
    if (values.options && Array.isArray(values.options)) {
      if (!values.options || !Array.isArray(values.options) || values.options.length === 0) {
        message.error("Vui lòng thêm ít nhất một màu sắc.", 3);
        return;
      }
      const invalidColor = values.options.find(
        (option) => !option.sizes || option.sizes.length === 0
      );

      if (invalidColor) {
        message.error("Vui lòng thêm ít nhất một kích thước cho mỗi màu sắc.", 3);
        return;
      }
      values.options.forEach((option) => {
        if (option.sizes && Array.isArray(option.sizes)) {
          option.sizes.forEach((size) => {
            totalStock += Number(size.countInStock) || 0;
          });
        }
      });
    } else {
      message.error("Vui lòng thêm ít nhất một màu sắc và kích thước.", 3);
      return;
    }
    const data = {
      ...values,
      images,
      countAllInStock: totalStock,
    };

    mutationUpdateProduct.mutate({
      id: rowSelected,
      access_token: user?.access_token,
      ...data,
    });
  };


  useEffect(() => {
    if (mutationUpdateProduct.isSuccess) {
      const responseUpdate = mutationUpdateProduct.data;

      if (responseUpdate && responseUpdate.message === 'Update product successfully') {
        message.success('Sản phẩm đã được cập nhật thành công!', 3);
        setIsOpenDrawer(false);
        setImages('');
        setProducts(prevProducts =>
          prevProducts.map(product =>
            product._id === responseUpdate.data._id ? responseUpdate.data : product
          )
        );
      } else {
        message.error('Có lỗi khi cập nhật sản phẩm!', 3);
      }
    }

    if (mutationUpdateProduct.isError) {
      message.error('Đã xảy ra lỗi, vui lòng thử lại!', 3);
    }
  }, [mutationUpdateProduct.isSuccess, mutationUpdateProduct.isError, mutationUpdateProduct.data]);

  const handleDeleteImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
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
      render: (text) => formatCurrencyVND(text),
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
      render: (text) => (text.length > 20 ? `${text.substring(0, 20)}...` : text),
      sorter: (a, b) => a.description.localeCompare(b.description)
    },
    {
      title: 'Số Lượng',
      dataIndex: 'countAllInStock',
      key: 'countAllInStock',
      sorter: (a, b) => a.countAllInStock - b.countAllInStock
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

  return (
    <div style={{ padding: '20px', background: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>Quản lý Sản Phẩm: {products.length}</h2>
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
        style={{ marginBottom: '20px' }}
        value={searchText}
        onChange={handleSearch}
        prefix={<SearchOutlined />}
      />
      <Table
        rowSelection={rowSelection}
        columns={columns}
        rowKey="_id"
        loading={isLoading}
        pagination={{
          pageSize: 8,
          style: { display: 'flex', justifyContent: 'center' },
        }}
        dataSource={filteredProducts}
        onRow={(record) => {
          return {
            onClick: () => {
              setRowSelected(record._id)
            }
          }
        }}
      />
      <Modal title="Thêm Sản Phẩm Mới" open={isModalOpen} onCancel={handleCancel} footer={null} width={1000} maskClosable={false}>
        <Form form={addForm} layout="vertical" onFinish={onFinish} initialValues={{ type: selectedType, }}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="name" label="Tên Sản Phẩm" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}>
                <Input placeholder="Nhập tên sản phẩm" />
              </Form.Item>
            </Col>
            <Col span={12}>
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
                    const value = e.target.value;
                    addForm.setFieldsValue({ price: value });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="sex"
                label="Sản phẩm dành cho giới tính"
                rules={[{ required: true, message: 'Vui lòng chọn giới tính sản phẩm' }]}
              >
                <Select placeholder="Chọn giới tính sản phẩm">
                  <Select.Option value="male">Nam</Select.Option>
                  <Select.Option value="female">Nữ</Select.Option>
                  <Select.Option value="unisex">Unisex</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
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
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item name="description" label="Mô Tả" rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm' }]}>
                <Input.TextArea placeholder="Nhập mô tả sản phẩm" autoSize={{ minRows: 3, maxRows: 15 }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
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
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="Hình Ảnh"
                rules={[{ required: true, message: 'Vui lòng chọn hình ảnh sản phẩm' }]}
                style={{ display: 'flex' }}
              >
                <Upload
                  onChange={handleOnchangeImages}
                  multiple={true}
                  maxCount={3}
                  beforeUpload={() => false} // Prevent auto upload
                >
                  <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                </Upload>

                {images && images.length > 0 && (
                  <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap' }}>
                    {images.map((image, index) => (
                      <div key={index} style={{ position: 'relative', marginRight: '10px', marginBottom: '10px' }}>
                        <img
                          src={image}
                          alt={`Product Image ${index + 1}`}
                          style={{ width: '100px', height: '100px' }}
                        />
                        {/* Nút xóa */}
                        <Button
                          onClick={() => handleDeleteImage(index)}
                          icon={<DeleteOutlined />}
                          style={{
                            position: 'absolute',
                            top: '0',
                            right: '0',
                            backgroundColor: 'red',
                            color: 'white',
                            borderRadius: '50%',
                          }}
                          size="small"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </Form.Item>
            </Col>
          </Row>
          {/* Phần thêm màu sắc và kích thước */}
          <Form.List name="options">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Card key={key} style={{ marginBottom: "20px", border: "1px solid #ddd", padding: "15px" }}>
                    <Row gutter={16} align="middle">
                      <Col span={10}>
                        <Form.Item
                          {...restField}
                          name={[name, "color"]}
                          fieldKey={[fieldKey, "color"]}
                          label="Màu sắc"
                          rules={[{ required: true, message: "Vui lòng nhập màu sắc" }]}
                        >
                          <Input placeholder="Nhập màu sắc" />
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <Button
                          type="danger"
                          onClick={() => remove(name)}
                          style={{ marginTop: "32px" }}
                        >
                          Xóa
                        </Button>
                      </Col>
                    </Row>

                    {/* Danh sách kích thước */}
                    <Form.List name={[name, "sizes"]}>
                      {(sizeFields, { add: addSize, remove: removeSize }) => (
                        <>
                          {sizeFields.map(({ key: sizeKey, name: sizeName, fieldKey: sizeFieldKey, ...sizeRestField }) => (
                            <Row gutter={16} key={sizeKey} align="middle">
                              {/* Kích thước */}
                              <Col span={8}>
                                <Form.Item
                                  {...sizeRestField}
                                  name={[sizeName, "size"]}
                                  fieldKey={[sizeFieldKey, "size"]}
                                  label="Kích thước"
                                  rules={[{ required: true, message: "Vui lòng nhập kích thước" }]}
                                >
                                  <Input placeholder="Nhập kích thước (S, M, L...)" />
                                </Form.Item>
                              </Col>
                              {/* Số lượng */}
                              <Col span={8}>
                                <Form.Item
                                  {...sizeRestField}
                                  name={[sizeName, "countInStock"]}
                                  fieldKey={[sizeFieldKey, "countInStock"]}
                                  label="Số lượng"
                                  rules={[
                                    { required: true, message: "Vui lòng nhập số lượng" },
                                    {
                                      validator: (_, value) =>
                                        value < 0
                                          ? Promise.reject("Số lượng phải lớn hơn hoặc bằng 0")
                                          : Promise.resolve(),
                                    },
                                  ]}
                                >
                                  <Input type="number" placeholder="Nhập số lượng" />
                                </Form.Item>
                              </Col>
                              {/* Xóa kích thước */}
                              <Col span={4}>
                                <Button
                                  type="danger"
                                  onClick={() => removeSize(sizeName)}
                                  style={{ marginTop: "32px" }}
                                >
                                  Xóa kích thước
                                </Button>
                              </Col>
                            </Row>
                          ))}
                          {/* Thêm kích thước */}
                          <Form.Item>
                            <Button type="dashed" onClick={() => addSize()} block>
                              Thêm kích thước
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </Card>
                ))}
                {/* Thêm màu mới */}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block>
                    Thêm màu mới
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Button type="primary" htmlType="submit" loading={mutation.isLoading}>
            Thêm Sản Phẩm
          </Button>
        </Form>
      </Modal>
      <DrawerComponent title={`Chỉnh sửa sản phẩm: ${selectedProductName}`} isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="70%" maskClosable={false} >
        <Form form={updateForm} layout="vertical" onFinish={onFinishUpdateProduct}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="name" label="Tên Sản Phẩm" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}>
                <Input placeholder="Nhập tên sản phẩm" />
              </Form.Item>
            </Col>
            <Col span={12}>
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
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="sex"
                label="Sản phẩm dành cho giới tính"
                rules={[{ required: true, message: 'Vui lòng chọn giới tính sản phẩm' }]}
              >
                <Select placeholder="Chọn giới tính sản phẩm">
                  <Select.Option value="male">Nam</Select.Option>
                  <Select.Option value="female">Nữ</Select.Option>
                  <Select.Option value="unisex">Unisex</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Loại sản phẩm"
                rules={[{ required: true, message: "Vui lòng chọn loại sản phẩm" }]}
              >
                <Select
                  placeholder="Chọn loại sản phẩm"
                  allowClear
                  value={selectedType}
                  onChange={(value) => {
                    if (value === 'add_type') {
                      setIsAddingType(true);
                    } else {
                      setSelectedType(value);
                      setIsAddingType(false);
                    }
                  }}
                  options={renderOptions(types)}
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
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item name="description" label="Mô Tả" rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm' }]}>
                <Input.TextArea placeholder="Nhập mô tả sản phẩm" autoSize={{ minRows: 3, maxRows: 15 }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
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
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="Hình Ảnh"
                rules={[{ required: true, message: 'Vui lòng chọn hình ảnh sản phẩm' }]}
                style={{ display: 'flex' }}
              >
                <Upload
                  onChange={handleOnchangeImages}
                  multiple={true}
                  maxCount={3}
                  beforeUpload={() => false}
                >
                  <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                </Upload>
                {images && images.length > 0 && (
                  <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap' }}>
                    {images.map((image, index) => (
                      <div key={index} style={{ position: 'relative', marginRight: '10px', marginBottom: '10px' }}>
                        <img
                          src={image}
                          alt={`Product Image ${index + 1}`}
                          style={{ width: '100px', height: '100px' }}
                        />
                        <Button
                          onClick={() => handleDeleteImage(index)}
                          icon={<DeleteOutlined />}
                          style={{
                            position: 'absolute',
                            top: '0',
                            right: '0',
                            backgroundColor: 'red',
                            color: 'white',
                            borderRadius: '50%',
                          }}
                          size="small"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </Form.Item>
            </Col>
          </Row>

          {/* Phần thêm màu sắc và kích thước */}
          <Form.List name="options">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Card key={key} style={{ marginBottom: "20px", border: "1px solid #ddd", padding: "15px" }}>
                    <Row gutter={16} align="middle">
                      <Col span={10}>
                        <Form.Item
                          {...restField}
                          name={[name, "color"]}
                          fieldKey={[fieldKey, "color"]}
                          label="Màu sắc"
                          rules={[{ required: true, message: "Vui lòng nhập màu sắc" }]}
                        >
                          <Input placeholder="Nhập màu sắc" />
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <Button
                          type="danger"
                          onClick={() => remove(name)}
                          style={{ marginTop: "32px" }}
                        >
                          Xóa
                        </Button>
                      </Col>
                    </Row>

                    {/* Danh sách kích thước */}
                    <Form.List name={[name, "sizes"]}>
                      {(sizeFields, { add: addSize, remove: removeSize }) => (
                        <>
                          {sizeFields.map(({ key: sizeKey, name: sizeName, fieldKey: sizeFieldKey, ...sizeRestField }) => (
                            <Row gutter={16} key={sizeKey} align="middle">
                              {/* Kích thước */}
                              <Col span={8}>
                                <Form.Item
                                  {...sizeRestField}
                                  name={[sizeName, "size"]}
                                  fieldKey={[sizeFieldKey, "size"]}
                                  label="Kích thước"
                                  rules={[{ required: true, message: "Vui lòng nhập kích thước" }]}
                                >
                                  <Input placeholder="Nhập kích thước (S, M, L...)" />
                                </Form.Item>
                              </Col>
                              {/* Số lượng */}
                              <Col span={8}>
                                <Form.Item
                                  {...sizeRestField}
                                  name={[sizeName, "countInStock"]}
                                  fieldKey={[sizeFieldKey, "countInStock"]}
                                  label="Số lượng"
                                  rules={[
                                    { required: true, message: "Vui lòng nhập số lượng" },
                                    {
                                      validator: (_, value) =>
                                        value < 0
                                          ? Promise.reject("Số lượng phải lớn hơn hoặc bằng 0")
                                          : Promise.resolve(),
                                    },
                                  ]}
                                >
                                  <Input type="number" placeholder="Nhập số lượng" />
                                </Form.Item>
                              </Col>
                              {/* Xóa kích thước */}
                              <Col span={4}>
                                <Button
                                  type="danger"
                                  onClick={() => removeSize(sizeName)}
                                  style={{ marginTop: "32px" }}
                                >
                                  Xóa kích thước
                                </Button>
                              </Col>
                            </Row>
                          ))}
                          {/* Thêm kích thước */}
                          <Form.Item>
                            <Button type="dashed" onClick={() => addSize()} block>
                              Thêm kích thước
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </Card>
                ))}
                {/* Thêm màu mới */}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block>
                    Thêm màu mới
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Button type="primary" htmlType="submit" loading={mutationUpdateProduct.isLoading} >
            Lưu thông tin sản phẩm
          </Button>
        </Form>
      </DrawerComponent>
    </div>
  );
};

export default AdminProduct;