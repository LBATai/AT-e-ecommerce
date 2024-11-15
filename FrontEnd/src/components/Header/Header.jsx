import { useState } from 'react';
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccout, WrapperHeaderCart, CartItemCount, ProductListBox } from './style';
import { Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AudioOutlined, UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import AccoutComponent from '../AccoutComponent/AccoutComponent';

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#074398',
    }}
  />
);

const onSearch = (value, _e, info) => console.log(info?.source, value);

const Header = () => {
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Thêm state cho trạng thái đăng nhập và tên người dùng
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('John Doe'); // Tên người dùng mẫu

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

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
          {/* Kiểm tra trạng thái đăng nhập */}
          <WrapperHeaderAccout>
            <UserOutlined style={{ fontSize: '30px' }} />
            <div>
              {isLoggedIn ? (
                <>
                  <span onClick={toggleDropdown}>{userName}</span>
                  <CaretDownOutlined onClick={toggleDropdown} />
                </>
              ) : (
                <span onClick={handleLogin}>Đăng nhập</span>
              )}
            </div>
          </WrapperHeaderAccout>
          {/* Dropdown menu cho tài khoản */}
          {isLoggedIn && isDropdownOpen && <AccoutComponent />}
          
          {/* Icon giỏ hàng */}
          <WrapperHeaderCart>
            <div
              onClick={handleCart}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              style={{ position: 'relative' }}
            >
              <ShoppingCartOutlined style={{ fontSize: '30px' }} />
              <CartItemCount>{cartItems.length}</CartItemCount>
            </div>
            {isHovering && (
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
            )}
          </WrapperHeaderCart>
        </Col>
      </WrapperHeader>
    </div>
  );
}

export default Header;
