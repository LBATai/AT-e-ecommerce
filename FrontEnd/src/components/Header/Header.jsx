import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  WrapperHeader, WrapperTextHeader, 
  WrapperHeaderAccout, WrapperHeaderCart, CartItemCount, ProductListBox, Popopover, MenuItem ,WrapperNav,SearchBox 
} from './style';
import { Col, Popover } from 'antd'; // Use Popover instead of Dropdown
import { useNavigate } from 'react-router-dom';
import { AudioOutlined,CloseOutlined ,SearchOutlined , UserOutlined, CaretDownOutlined, ShoppingCartOutlined, AppstoreAddOutlined, InfoCircleOutlined, ShoppingOutlined, LogoutOutlined } from '@ant-design/icons';
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



const Header = () => {
  const user = useSelector((state) => state.user);
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false); // Quản lý trạng thái hộp tìm kiếm


  useEffect(() => {
    setUserAvatar(user?.avatar);
    setIsAdmin(user?.isAdmin)
  }, [user?.avatar], [user?.isAdmin]);
  
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
  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev); // Bật/tắt hiển thị hộp tìm kiếm
  };

  const handleSearch = (value) => {
    console.log('Tìm kiếm:', value); // Xử lý logic tìm kiếm
  };
  // Content for user popover
  const userPopoverContent = (
      <Popopover>
        {isAdmin === true ? (
        <MenuItem onClick={() => navigate('/system/admin')}>
          <AppstoreAddOutlined /> Quản lý hệ thống
        </MenuItem>
              ) : (<div></div>)}
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
        <WrapperNav>
          <span onClick={() => navigate('/home')}>Trang chủ</span>
          <span onClick={() => navigate('/shop')}>Shop</span>
          <span onClick={() => navigate('/about')}>Giới thiệu</span>
          <span onClick={() => navigate('/contact')}>Liên hệ</span>
        </WrapperNav>
        </Col>
        <Col span={6} style={{ display: 'flex' }}>
          <Pending isPending={isPending}>
            <WrapperHeaderAccout>
              <div onClick={toggleSearch} style={{ cursor: 'pointer' }}>
                {isSearchVisible ? (
                  <CloseOutlined style={{ fontSize: '24px', color: '#000000', marginRight: '10px', backgroundColor:'#fff'}} />
                ) : (
                  <SearchOutlined style={{ fontSize: '24px', color: '#fff', marginRight: '10px'  }} />
                )}
              </div>
              {isSearchVisible && (
                <SearchBox>
                  <Search
                    placeholder="Tìm kiếm sản phẩm"
                    enterButton="Tìm"
                    size="large"
                    onSearch={handleSearch}
                    style={{
                      height: '50px',
                      fontSize: '16px',
                    }}
                  />
                </SearchBox>
              )}
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
              onClick={handleCart}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ position: 'relative', marginRight: '100px' }}
            >
                <ShoppingCartOutlined style={{ fontSize: '30px' }} />
                <CartItemCount>{cartItems.length}</CartItemCount>
            </Popover>
          </WrapperHeaderCart>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default Header;
