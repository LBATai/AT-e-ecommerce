import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetUser } from '../redux/Slide/userSlide.js';
import * as UserService from '../../Service/UserService';
import * as ProductService from '../../Service/ProductService';
import { searchProduct } from '../redux/Slide/productSlide.js';

const Header = () => {
    const user = useSelector((state) => state.user);
    const order = useSelector((state) => state.order);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [categories, setCategories] = useState({});
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
    const [isVisible, setIsVisible] = useState(true);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false); // Thêm trạng thái cho danh mục mobile

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await ProductService.getAllType();
                const items = res.data;
                const categorizedData = categorizeItems(items);
                setCategories(categorizedData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
        setUserAvatar(user?.avatar);
        setIsAdmin(user?.isAdmin);
    }, [user]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    const categorizeItems = (items) => {
        const categoryMap = {
            "Áo": ["quần tây", "áo polo", "áo thun", "giày", "túi"],
            "Quần": ["quần tây", "máy tính", "tai nghe"],
            "Giới tính": ["quần tây", "máy giặt", "lò vi sóng"],
        };
        const categorized = {};
        Object.keys(categoryMap).forEach((parentCategory) => {
            categorized[parentCategory] = items.filter((item) =>
                categoryMap[parentCategory].includes(item.toLowerCase())
            );
        });
        return categorized;
    };

    const handleSignOut = async () => {
        try {
            await UserService.signOut();
            localStorage.removeItem('access_token');
            dispatch(resetUser());
            alert('Đăng xuất thành công!');
        } catch (error) {
            console.error('Sign out error:', error);
            alert('Đăng xuất thất bại!');
        }
    };

    const toggleDropdown = () => setIsDropdownVisible((prev) => !prev);
    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
    const toggleCategory = () => setIsCategoryOpen((prev) => !prev); // Toggle trạng thái danh mục

    return (
        <header
            className={`bg-white text-gray-800 p-4 flex justify-between items-center shadow-md sticky top-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
        >
            <div className="text-lg font-bold cursor-pointer" onClick={() => navigate('/home')}>
                AT-Ecommerce
            </div>

            <nav className="hidden md:flex space-x-8">
                <a href="/home" className={`hover:text-blue-500 ${location.pathname === '/home' ? 'text-blue-500' : ''}`}>Trang chủ</a>
                <a href="/shop" className={`hover:text-blue-500 ${location.pathname === '/shop' ? 'text-blue-500' : ''}`}>Cửa hàng</a>
                <div className="relative group">
                    <span className="cursor-pointer">Danh mục</span>
                    <div className="absolute left-0 mt-2 hidden group-hover:block bg-white text-black shadow-lg rounded-lg w-48 transition-all ease-in-out duration-300 transform opacity-0 group-hover:opacity-100">
                        {Object.keys(categories).map((category) => (
                            <div key={category} className="p-2 border-b last:border-none">
                                <strong>{category}</strong>
                                <ul className="mt-1 ml-2">
                                    {categories[category].map((type, idx) => (
                                        <li key={idx} className="text-sm cursor-pointer hover:underline" onClick={() => navigate(`/type/${type}`)}>
                                            {type}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <a href="/blog" className={`hover:text-blue-500 ${location.pathname === '/blog' ? 'text-blue-500' : ''}`}>Blog</a>
            </nav>

            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    {userAvatar ? (
                        <img
                            src={userAvatar}
                            alt="User Avatar"
                            className="w-8 h-8 rounded-full"
                        />
                    ) : (
                        <span className="text-xl cursor-pointer" onClick={toggleDropdown}>👤</span>
                    )}
                    <div ref={dropdownRef}>
                        {user?.name ? (
                            <div className="relative group" onClick={toggleDropdown}>
                                <span className="cursor-pointer">
                                    {user.name} ▼
                                </span>

                                {isDropdownVisible && (
                                    <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-lg w-48">
                                        {isAdmin && (
                                            <div
                                                className="p-2 border-b hover:bg-gray-200 cursor-pointer"
                                                onClick={() => navigate('/system/admin')}
                                            >
                                                Quản lý hệ thống
                                            </div>
                                        )}
                                        <div
                                            className="p-2 border-b hover:bg-gray-200 cursor-pointer"
                                            onClick={() => navigate('/profile', { state: { activeTab: '1' } })}
                                        >
                                            Thông tin tài khoản
                                        </div>
                                        <div
                                            className="p-2 border-b hover:bg-gray-200 cursor-pointer"
                                            onClick={() => navigate('/profile', { state: { activeTab: '2' } })}
                                        >
                                            Đơn mua
                                        </div>
                                        <div
                                            className="p-2 border-b hover:bg-gray-200 cursor-pointer"
                                            onClick={() => navigate('/cart')}
                                        >
                                            Giỏ hàng
                                        </div>
                                        <div
                                            className="p-2 hover:bg-gray-200 cursor-pointer"
                                            onClick={handleSignOut}
                                        >
                                            Đăng xuất
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <span className="cursor-pointer" onClick={() => navigate('/sign-in')}>
                                Đăng nhập
                            </span>
                        )}
                    </div>
                </div>
                <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
                    <span className="text-xl">🛒</span>
                    {order?.orderItems?.length > 0 && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                            {order.orderItems.length}
                        </span>
                    )}
                </div>
            </div>

            <button
                className="md:hidden block text-gray-800 hover:text-blue-500 focus:outline-none focus:text-blue-500"
                onClick={toggleMobileMenu}
            >
                ☰
            </button>
            {/* Menu mobile */}
            <div id="mobile-menu"
                className={`md:hidden bg-white text-gray-800 absolute top-full left-0 w-full shadow-lg transition-all ease-in-out duration-300
             ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                <a href="/home" className="block p-4 border-b hover:bg-gray-200">Trang chủ</a>
                <a href="/shop" className="block p-4 border-b hover:bg-gray-200">Cửa hàng</a>
                <div className={`border-b`}>
                    <span  className="block p-4 hover:bg-gray-200" onClick={toggleCategory} >Danh mục</span>
                   {/*Dropdown menu*/}
                        {isCategoryOpen && (
                            <div className="p-2">
                                {Object.keys(categories).map((category) => (
                                    <div key={category} className="p-2 border-b last:border-none">
                                        <strong className="block p-2 hover:bg-gray-200">{category}</strong>
                                        <ul className="mt-1 ml-2">
                                            {categories[category].map((type, idx) => (
                                                <li key={idx} className="text-sm cursor-pointer hover:underline p-2 hover:bg-gray-200" onClick={() => navigate(`/type/${type}`)}>
                                                    {type}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}
                        {/*End dropdown*/}
                </div>

                <a href="/blog" className="block p-4 border-b hover:bg-gray-200">Blog</a>
            </div>

        </header>
    );
};

export default Header;