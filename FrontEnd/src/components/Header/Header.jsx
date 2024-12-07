import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  WrapperHeader, WrapperTextHeader, 
  WrapperHeaderAccout, WrapperHeaderCart, CartItemCount, ProductListBox, Popopover, MenuItem ,WrapperNav,SearchBox 
} from './style';
import { Col, Popover } from 'antd'; // Use Popover instead of Dropdown
import { useNavigate, useLocation } from 'react-router-dom';
import { AudioOutlined,CloseOutlined ,SearchOutlined , UserOutlined, CaretDownOutlined, ShoppingCartOutlined, AppstoreAddOutlined, InfoCircleOutlined, ShoppingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Input, message } from 'antd';
import { useSelector } from 'react-redux';
import Pending from '../Pending/Pending';
import { useDispatch } from 'react-redux';
import * as UserService from '../../Service/UserService';
import { resetUser } from '../redux/Slide/userSlide.js';
import DisableCopy from '../DisableCopy/DisableCopy.jsx';
import { searchProduct } from '../redux/Slide/productSlide.js';

const Header = () => {
  const user = useSelector((state) => state.user);
  const location = useLocation(); // Lấy đường dẫn hiện tại
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Search } = Input;

  const navItems = [
    { path: '/home', label: 'Trang chủ' },
    { path: '/cart', label: 'Cửa hàng' },
    { path: '/about', label: 'Giới thiệu' },
    { path: '/contact', label: 'Liên hệ' },
  ];
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
  const [search, setSearch] = useState(''); 


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
  const handleSearchClick = (event) => {
    event.stopPropagation(); // Ngăn chặn sự kiện lan truyền ra ngoài
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
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

  return (
    <DisableCopy>
      <WrapperHeader>
        <Col span={6}>
          <WrapperTextHeader onClick={handleHome}>AT-Ecommerce</WrapperTextHeader>
        </Col>
        <Col span={10}>
          <WrapperNav>
            {navItems.map((item) => (
              <span
                key={item.path}
                onClick={() => navigate(item.path)}
                className={location.pathname === item.path ? 'active' : ''}
              >
                {item.label}
              </span>
            ))}
          </WrapperNav>
        </Col>
        <Col span={2} onClick={toggleSearch} style={{ cursor: 'pointer' }}>
          <div >
                {isSearchVisible ? (
                  <CloseOutlined 
                  style={{ 
                    fontSize: '24px', color: '#000000', marginLeft: '60px' , backgroundColor:'#fff',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '5px',
                    cursor: 'pointer',
                  }} />
                ) : (
                  <SearchOutlined style={{ fontSize: '24px', color: '#fff', marginLeft: '60px'  }} />
                )}
          </div>
              {isSearchVisible && (
                <SearchBox onClick={handleSearchClick}>
                  <Search
                    placeholder="Tìm kiếm sản phẩm"
                    enterButton="Tìm"
                    size="large"
                    onChange={handleSearch}
                    style={{
                      height: '100px',
                      fontSize: '16px',
                      padding: '10px',
                    }}
                  />
                </SearchBox>
              )}
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

          <WrapperHeaderCart onClick={() => navigate('/cart')}>
                <ShoppingCartOutlined style={{ fontSize: '30px' }} />
                <CartItemCount>{cartItems.length}</CartItemCount>
          </WrapperHeaderCart>
        </Col>
      </WrapperHeader>
    </DisableCopy>
  );
};

export default Header;
