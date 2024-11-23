import { useState, useEffect, useRef, useCallback } from 'react';
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccout, WrapperHeaderCart, CartItemCount, ProductListBox, Popopover, MenuItem } from './style';
import { Col, Popover } from 'antd'; // Use Popover instead of Dropdown
import { useNavigate } from 'react-router-dom';
import { AudioOutlined, UserOutlined, CaretDownOutlined, ShoppingCartOutlined, AppstoreAddOutlined, InfoCircleOutlined, ShoppingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Input, message } from 'antd';
import { useSelector } from 'react-redux';
import Pending from '../Pending/Pending';
import { useDispatch } from 'react-redux';
import * as UserService from '../../Service/UserService';
import { resetUser } from '../redux/Slide/userSlide.js';

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#074398',
    }}
  />
);

const onSearch = (value, _e, info) => {
  console.log(info?.source, value); // Log source if needed
  // Add search logic here
};

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCart = () => {
    navigate('/cart');
  };

  const handleHome = () => {
    navigate('/home');
  };

  const handleLogin = () => {
    navigate('/sign-in');
  };

  const [cartItems, setCartItems] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [userAvatar, setUserAvatar] = useState('');

  const user = useSelector((state) => state.user);

  const handleSignOut = async () => {
    try {
      await UserService.signOut();
      localStorage.removeItem('access_token');
      dispatch(resetUser());
      message.success('Đăng xuất thành công!');
    } catch (error) {
      message.error('Đăng xuất thất bại! Vui lòng thử lại.');
      console.error('Sign out error:', error);
    }
  };

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);

  useEffect(() => {
    setUserAvatar(user?.avatar);
  }, [user?.avatar]);

  // Content for user popover
  const userPopoverContent = (
      <Popopover>
        <MenuItem onClick={() => navigate('/system/admin')}>
          <AppstoreAddOutlined /> Quản lý hệ thống
        </MenuItem>
        <MenuItem onClick={() => navigate('/profile-user')}>
          <InfoCircleOutlined /> Thông tin tài khoản
        </MenuItem>
        <MenuItem onClick={() => navigate('/orders')}>
          <ShoppingOutlined /> Đơn mua
        </MenuItem>
        <MenuItem onClick={handleCart}>
          <ShoppingCartOutlined /> Giỏ hàng
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <LogoutOutlined /> Đăng xuất
        </MenuItem>
      </Popopover>
  );

  // Content for cart popover
  const cartPopoverContent = (
    <ProductListBox>
      <h4>Sản phẩm trong giỏ hàng:</h4>
      {cartItems.length === 0 ? (
        <div>Giỏ hàng trống</div>
      ) : (
        cartItems.map((item, index) => (
          <div key={index}>{item.name}</div>
        ))
      )}
    </ProductListBox>
  );

  return (
    <div>
      <WrapperHeader>
        <Col span={6}>
          <WrapperTextHeader onClick={handleHome}>AT-Ecommerce</WrapperTextHeader>
        </Col>
        <Col span={12}>
          <Search
            placeholder="input search text"
            enterButton="Search"
            size="large"
            suffix={suffix}
            onSearch={onSearch}
          />
        </Col>
        <Col span={6} style={{ display: 'flex' }}>
          <Pending isPending={isPending}>
            <WrapperHeaderAccout>
              {userAvatar ? (
                <img alt="user avatar" src={userAvatar} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
              ) : (
                <UserOutlined style={{ fontSize: '30px' }} />
              )}
              <div>
                {user?.name ? (
                  <Popover content={userPopoverContent} trigger="click">
                    <span style={{ cursor: 'pointer' }}>
                      {user.name} <CaretDownOutlined />
                    </span>
                  </Popover>
                ) : (
                  <span onClick={handleLogin}>Đăng nhập</span>
                )}
              </div>
            </WrapperHeaderAccout>
          </Pending>

          <WrapperHeaderCart>
            <Popover
              content={cartPopoverContent}
              trigger="hover"
              open={isHovering}
              onOpenChange={setIsHovering}
            >
              <div
                onClick={handleCart}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ position: 'relative' }}
              >
                <ShoppingCartOutlined style={{ fontSize: '30px' }} />
                <CartItemCount>{cartItems.length}</CartItemCount>
              </div>
            </Popover>
          </WrapperHeaderCart>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default Header;
