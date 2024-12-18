import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  WrapperHeader, WrapperTextHeader, 
  WrapperHeaderAccout, WrapperHeaderCart, CartItemCount, ProductListBox, Popopover, MenuItem ,WrapperNav,SearchBox, DropdownMenu
} from './style';
import { Col, Popover, Dropdown, Space, Input, message } from 'antd'; // Use Popover instead of Dropdown
import { useNavigate, useLocation } from 'react-router-dom';
import { CloseOutlined ,SearchOutlined , UserOutlined, DownOutlined, CaretDownOutlined, ShoppingCartOutlined, AppstoreAddOutlined, InfoCircleOutlined, ShoppingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import Pending from '../Pending/Pending';
import { useDispatch } from 'react-redux';
import * as UserService from '../../Service/UserService';
import { resetUser } from '../redux/Slide/userSlide.js';
import DisableCopy from '../DisableCopy/DisableCopy.jsx';
import { searchProduct } from '../redux/Slide/productSlide.js';
import * as ProductService from '../../Service/ProductService.js'

const Header = () => {
  const user = useSelector((state) => state.user);
  const location = useLocation(); // Lấy đường dẫn hiện tại
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const order = useSelector((state) => state.order)
  const { Search } = Input;

  const navItems = [
    { path: '/', label: 'Trang chủ' },
    { path: '/home', label: 'Cửa hàng' },
    { label: 'Danh mục' },
    { path: '/blog', label: 'Blog' },
  ];
  const categoryMap = {
    "Thời trang": ["quần short", "áo polo", "áo thun", "giày", "túi"],
    "Điện tử": ["điện thoại", "máy tính", "tai nghe"],
    "Gia dụng": ["tủ lạnh", "máy giặt", "lò vi sóng"],
    // Thêm các danh mục khác
  };
  const categorizeItems = (items) => {
    const categorized = {};
  
    // Duyệt qua từng mục trong categoryMap
    Object.keys(categoryMap).forEach((parentCategory) => {
      categorized[parentCategory] = []; // Tạo mảng trống cho danh mục cha
  
      items.forEach((item) => {
        if (categoryMap[parentCategory].includes(item.toLowerCase())) {
          categorized[parentCategory].push(item); // Thêm danh mục con vào danh mục cha tương ứng
        }
      });
    });
  
    return categorized;
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await ProductService.getAllType(); // API trả về danh sách các danh mục
        const items = res.data; // ['quần', 'áo', 'máy tính', ...]
        const categorizedData = categorizeItems(items);
        setCategories(categorizedData); // Lưu dữ liệu đã phân loại vào state
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchCategories();
  }, []);
    
  const handleNavigateToCategory = (type) => {
    navigate(`/type/${type}`);
  };
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
        <MenuItem onClick={() => navigate('/profile', { state: { activeTab: '1' } })}>
          <InfoCircleOutlined /> Thông tin tài khoản
        </MenuItem>
        <MenuItem onClick={() => navigate('/profile', { state: { activeTab: '2' } })}>
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
          {navItems.map((item, index) =>
            item.label === 'Danh mục' ? (
              <Dropdown
                placement="bottom"
                arrow
                menu={{
                  items: Object.keys(categories).map((parentCategory) => ({
                    key: parentCategory,
                    label: (
                      <DropdownMenu>
                        <strong>{parentCategory}</strong>
                        <ul>
                          {categories[parentCategory].map((type, idx) => (
                            <li
                              key={idx}
                              onClick={() => handleNavigateToCategory(type)}
                            >
                              {type}
                            </li>
                          ))}
                        </ul>
                      </DropdownMenu>
                    ),
                  })),
                }}
              >
                <span onClick={(e) => e.preventDefault()}>
                  <Space>Danh mục</Space>
                </span>
              </Dropdown>
            ) : (
              <span
                key={item.path}
                onClick={() => navigate(item.path)}
                className={location.pathname === item.path ? 'active' : ''}
              >
                {item.label}
              </span>
            )
          )}
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
                <CartItemCount>{order?.orderItems?.length}</CartItemCount>
          </WrapperHeaderCart>
        </Col>
      </WrapperHeader>
    </DisableCopy>
  );
};

export default Header;
