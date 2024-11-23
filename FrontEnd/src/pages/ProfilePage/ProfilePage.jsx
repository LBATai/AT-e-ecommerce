// ProfilePage.jsx
import React, { useState,useEffect } from 'react';
import { Menu, Typography, Row, Col, Tag, Space, Upload , Input, Button,Modal  } from 'antd';
import { UserOutlined, ShoppingOutlined, EnvironmentOutlined, HeartOutlined, 
         BellOutlined, EditOutlined, PlusOutlined, UploadOutlined   } from '@ant-design/icons';
import {
  StyledLayout,
  StyledSider,
  UserProfile,
  Avatar,
  StyledContent,
  StyledCard,
  StatsCard,
  OrderCard,
  AddressCard,
  ActionButton
} from './style';
import { useSelector } from 'react-redux'
import * as UserService from '../../Service/UserService'
import {useMutationHooks} from '../../hooks/useMutationHook'
import { message } from 'antd';
import { useDispatch } from 'react-redux'
import { updateUser } from '../../components/redux/Slide/userSlide';
import Pending from '../../components/Pending/Pending'
import { getBase64 } from '../../utils';
const { Title, Text } = Typography;

const ProfilePage = () => {
  const user = useSelector((state) => state.user)
  const [selectedKey, setSelectedKey] = useState('1');
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState({});
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [address, setAddress] = useState('')
  const [age, setAge] = useState('')
  
  const mutation = useMutationHooks(
    (data) => {
      const { id,access_token, ...rests} = data;
      UserService.updateUser(id, rests, access_token,)
    }
  )
  const dispatch = useDispatch();
  const {data, isSuccess, isError} = mutation
  console.log('data', data)
  useEffect(() => {
    setEmail(user?.email)
    setPhone(user?.phone)
    setName(user?.name)
    setAvatar(user?.avatar)
    setAddress(user?.address)
    setAge(user?.age)
  }, [user])

const validateField = (field, value) => {
  let error = "";
  switch (field) {
    case "name":
      if (!value.trim()) error = "Họ tên không được để trống!";
      break;
    case "email":
      if (!value.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value))
        error = "Email không hợp lệ!";
      break;
    case "phone":
      if (!value.trim() || !/^\d{10}$/.test(value))
        error = "Số điện thoại phải là 10 chữ số!";
      break;
    case "age":
      if (!value.trim() || isNaN(value) || value <= 14 || value > 120)
        error = "Tuổi phải là số hợp lệ trong khoảng 15-120!";
      break;
    case "address":
      if (!value.trim()) error = "Địa chỉ không được để trống!";
      break;
    default:
      break;
  }
  setErrors((prev) => ({ ...prev, [field]: error }));
};
const handleOnChange = (e) => {
  const { id, value } = e.target;
  if (id === "name") setName(value);
  if (id === "email") setEmail(value);
  if (id === "phone") setPhone(value);
  if (id === "age") setAge(value);
  if (id === "address") setAddress(value);
  validateField(id, value);
};
  useEffect(() => {
    if (isSuccess) {
        console.log('Mutation successful, data:', data);
        message.success('Cập nhật thành công!');
        handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
        console.error('Mutation failed, error:', mutation.error);
        message.error('Có lỗi xảy ra khi cập nhật thông tin!');
    }
}, [isSuccess, isError, data]);

  const handleGetDetailsUser = async (id, token) => {
    try {
        const res = await UserService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
    } catch (error) {
        console.error('Error fetching user details:', error.response || error);
    }
};

const handleOnchangeAvatar = async ({fileList}) => {
  const file = fileList[0]
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj);
  }
  setAvatar(file.preview)
}

  const handleSubmit = () => {
    mutation.mutate({id: user?.id, name, email, avatar, phone, address, age, access_token: user?.access_token},
      {
        onSuccess: (response) => {
          // Kiểm tra dữ liệu trả về từ server
          if (response?.status === 'Success') {
            setIsPending(true); // Bật pending khi bắt đầu đăng ký
          }else if(response?.message === 'The user not found'){
            setIsPending(false); // Tắt pending nếu có lỗi
          }
        }
      },
    )
  setTimeout(() => {
    handleGetDetailsUser(user?.id, user?.access_token);
  }, 10); // Cho mutation thời gian hoàn tất
  setIsEditing(false); // Kết thúc chế độ chỉnh sửa
  }
  const handlePreview = (image) => {
    setPreviewImage(image);
    setIsPreviewVisible(true);
  };
  
  const handleCancelPreview = () => {
    setIsPreviewVisible(false);
  };

  const menuItems = [
    { key: '1', icon: <UserOutlined />, label: 'Tổng quan' },
    { key: '2', icon: <ShoppingOutlined />, label: 'Đơn hàng' },
    { key: '3', icon: <EnvironmentOutlined />, label: 'Địa chỉ' },
    { key: '4', icon: <HeartOutlined />, label: 'Yêu thích' },
    { key: '5', icon: <BellOutlined />, label: 'Thông báo' },
  ];

  const orders = [
    {
      id: 'DH123456',
      date: '15/11/2024',
      status: 'Đã giao',
      items: [
        { name: 'Áo thun nam', quantity: 2, price: '590.000₫' },
        { name: 'Quần jean', quantity: 1, price: '1.290.000₫' }
      ],
      total: '2.890.000₫'
    },
    // Thêm các đơn hàng khác
  ];

  const addresses = [
    {
      id: 1,
      name: 'Nhà riêng',
      recipient: 'Nguyễn Văn A',
      phone: '0123456789',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      isDefault: true
    },
    // Thêm các địa chỉ khác
  ];

  const renderOverview = () => (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={6}>
          <StatsCard>
            <div className="stats-value">15</div>
            <div className="stats-label">Đơn hàng</div>
          </StatsCard>
        </Col>
        <Col xs={12} sm={6}>
          <StatsCard color="#52c41a">
            <div className="stats-value">12</div>
            <div className="stats-label">Đã giao</div>
          </StatsCard>
        </Col>
        <Col xs={12} sm={6}>
          <StatsCard color="#faad14">
            <div className="stats-value">2</div>
            <div className="stats-label">Đang giao</div>
          </StatsCard>
        </Col>
        <Col xs={12} sm={6}>
          <StatsCard color="#ff4d4f">
            <div className="stats-value">1</div>
            <div className="stats-label">Đã hủy</div>
          </StatsCard>
        </Col>
      </Row>

      <StyledCard title="Thông tin cá nhân" extra={<ActionButton icon={<EditOutlined />} onClick={() => setIsEditing(true)}>Chỉnh sửa</ActionButton>}>
      {isPending && <Pending />} {/* Hiển thị Pending khi đang đăng ký */}
      {mutation.isLoading ? (
        <Pending />
      ) : isEditing ? (
              <Row gutter={[24, 16]}>
              <Col span={12}>
                <Text type="secondary">Họ tên</Text>
                <Input id="name" value={name} onChange={handleOnChange} />
                {errors.name && <Text type="danger">{errors.name}</Text>}
              </Col>
              <Col span={12}>
                <Text type="secondary">Email</Text>
                <Input id="email" value={email} onChange={handleOnChange} />
                {errors.email && <Text type="danger">{errors.email}</Text>}
              </Col>
              <Col span={12}>
                <Text type="secondary">Số điện thoại</Text>
                <Input id="phone" value={phone} onChange={handleOnChange} />
                {errors.phone && <Text type="danger">{errors.phone}</Text>}
              </Col>
              <Col span={12}>
                  <Text type="secondary">Avatar (Dung lượng &lt; 50MB)</Text>                  
                  <Upload onChange={handleOnchangeAvatar} maxCount={1}>
                    <Button icon={<UploadOutlined />} style={{marginLeft: '40px'}} >Upload</Button>
                  </Upload>
                  {avatar && (
                      <>
                        <img
                          src={avatar}
                          alt="avatar"
                          style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            cursor: 'pointer',
                          }}
                          onClick={() => handlePreview(avatar)} // Thêm sự kiện click
                        />
                        {/* Modal để hiển thị preview */}
                        <Modal
                          open={isPreviewVisible}
                          footer={null}
                          onCancel={handleCancelPreview}
                          centered
                        >
                          <img
                            alt="Preview"
                            src={previewImage}
                            style={{ width: '100%' }}
                          />
                        </Modal>
                      </>
                    )}
              </Col>
              <Col span={12}>
                <Text type="secondary">Tuổi</Text>
                <Input id="age" value={age} onChange={handleOnChange} />
                {errors.age && <Text type="danger">{errors.age}</Text>}
              </Col>
              <Col span={12}>
                <Text type="secondary">Địa chỉ</Text>
                <Input id="address" value={address} onChange={handleOnChange} />
                {errors.address && <Text type="danger">{errors.address}</Text>}
              </Col>
              <Col span={24}>
                <Button type="primary" onClick={handleSubmit} >Lưu thay đổi</Button>
              </Col>
            </Row>
            ) : (
              <Row gutter={[24, 16]}>
                <Col span={12}>
                  <Text type="secondary">Họ tên</Text>
                  <div>{user.name}</div>
                </Col>
                <Col span={12}>
                  <Text type="secondary">Email</Text>
                  <div>{user.email}</div>
                </Col>
                <Col span={12}>
                  <Text type="secondary">Số điện thoại</Text>
                  <div>{user.phone}</div>
                </Col>
                <Col span={12}>
                  <Text type="secondary">Avatar</Text>
                  <div>
                    {avatar && (
                      <>
                        <img
                          src={avatar}
                          alt="avatar"
                          style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            cursor: 'pointer',
                          }}
                          onClick={() => handlePreview(avatar)} // Thêm sự kiện click
                        />
                        {/* Modal để hiển thị preview */}
                        <Modal
                          open={isPreviewVisible}
                          footer={null}
                          onCancel={handleCancelPreview}
                          centered
                        >
                          <img
                            alt="Preview"
                            src={previewImage}
                            style={{ width: '100%' }}
                          />
                        </Modal>
                      </>
                    )}
                  </div>
                </Col>
                <Col span={12}>
                  <Text type="secondary">Tuổi</Text>
                  <div>{user.age}</div>
                </Col>
                <Col span={12}>
                  <Text type="secondary">Địa chỉ</Text>
                  <div>{user.address}</div>
                </Col>
              </Row>
            )}
          </StyledCard>    
          </>
  );

  const renderOrders = () => (
    <>
      {orders.map(order => (
        <OrderCard key={order.id}>
          <div className="order-header">
            <div>
              <Title level={5}>Đơn hàng {order.id}</Title>
              <Text type="secondary">{order.date}</Text>
            </div>
            <Tag color="success">{order.status}</Tag>
          </div>
          <div className="order-items">
            {order.items.map((item, index) => (
              <Row key={index} justify="space-between" style={{ marginBottom: 8 }}>
                <Text>{item.name} x{item.quantity}</Text>
                <Text strong>{item.price}</Text>
              </Row>
            ))}
          </div>
          <div className="order-total">
            <Text>Tổng cộng: </Text>
            <Text strong style={{ fontSize: 16, color: '#1890ff' }}>{order.total}</Text>
          </div>
        </OrderCard>
      ))}
    </>
  );

  const renderAddresses = () => (
    <>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Title level={4}>Sổ địa chỉ</Title>
        <ActionButton type="primary" icon={<PlusOutlined />}>
          Thêm địa chỉ mới
        </ActionButton>
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
                <ActionButton icon={<EditOutlined />} type="text" />
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

  const getContent = () => {
    switch (selectedKey) {
      case '1':
        return renderOverview();
      case '2':
        return renderOrders();
      case '3':
        return renderAddresses();
      case '4':
        return <StyledCard>Danh sách yêu thích trống</StyledCard>;
      case '5':
        return <StyledCard>Không có thông báo mới</StyledCard>;
      default:
        return renderOverview();
    }
  };

  return (
    <StyledLayout>
      <StyledSider width={280} breakpoint="lg" collapsedWidth="0">
        <UserProfile>
          <Avatar>
            <div>
              {avatar && (
                <>
                  <img
                    src={avatar}
                    alt="avatar"
                    onClick={() => handlePreview(avatar)} // Thêm sự kiện click
                  />
                  {/* Modal để hiển thị preview */}
                  <Modal
                    open={isPreviewVisible}
                    footer={null}
                    onCancel={handleCancelPreview}
                    centered
                  >
                    <img
                      alt="Preview"
                      src={previewImage}
                      style={{ width: '100%' }}
                    />
                  </Modal>
                </>
              )}
            </div>
          </Avatar>
          <Title level={4}>{user.name}</Title>
          <Text type="secondary">#123456</Text>
        </UserProfile>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => setSelectedKey(key)}
          items={menuItems}
          style={{ borderRight: 0 }}
        />
      </StyledSider>
      <StyledContent>
        {getContent()}
      </StyledContent>
    </StyledLayout>
  );
};

export default ProfilePage;