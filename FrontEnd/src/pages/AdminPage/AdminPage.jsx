import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BellOutlined,
  UserOutlined,
  HomeOutlined,
  DatabaseOutlined,
  ShoppingOutlined,
  SettingOutlined,
  LogoutOutlined,
  GiftOutlined,
  CarOutlined,
  PictureOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminOrder from '../../components/AdminOrder/AdminOrder';
import AdminBanner from '../../components/AdminBanner/AdminBanner';
import AdminVoucher from '../../components/AdminVoucher/AdminVoucher';
import AdminPaymentType from '../../components/AdminPaymentType/AdminPaymentType';
import { fetchAllUser, fetchAllProducts, fetchAllOrders } from '../../utils';

const AdminPage = () => {
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    const getUserCount = async () => {
      try {
        const users = await fetchAllUser();
        setUserCount(users.length);
      } catch (error) {
        console.error('Lỗi khi lấy số lượng người dùng', error);
      }
    };
    const getProductCount = async () => {
      try {
        const products = await fetchAllProducts();
        setProductCount(products.length);
      } catch (error) {
        console.error('Lỗi khi lấy số lượng sản phẩm', error);
      }
    };
    const getOrderCount = async () => {
      try {
        const orders = await fetchAllOrders();
        setOrderCount(orders.length);
      } catch (error) {
        console.error('Lỗi khi lấy số lượng đơn hàng', error);
      }
    };

    getUserCount();
    getProductCount();
    getOrderCount();
  }, []);

  const renderContent = () => {
    switch (selectedMenu) {
      case 'products':
        return <AdminProduct />;
      case 'users':
        return <AdminUser />;
      case 'orders':
        return <AdminOrder />;
      case 'banners':
        return <AdminBanner />;
      case 'vouchers':
        return <AdminVoucher />;
      case 'paymentType':
        return <AdminPaymentType />;
      default:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Bảng điều khiển</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Tổng số người dùng" value={userCount} />
              <StatCard title="Tổng số sản phẩm" value={productCount} />
              <StatCard title="Tổng số đơn hàng" value={orderCount} />
              <StatCard title="Doanh thu" value="$12,345" />
            </div>
          </div>
        );
    }
  };

  const StatCard = ({ title, value }) => (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-gray-500 text-sm font-medium mb-2">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
          <h1 className="text-lg font-bold text-gray-800">Bảng điều khiển quản trị</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <BellOutlined className="text-xl text-gray-600" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">3</span>
            </div>
            <UserOutlined className="text-xl text-gray-600" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-4">
          <nav className="space-y-2">
            {[
              { key: 'dashboard', label: 'Bảng điều khiển', icon: HomeOutlined },
              { key: 'products', label: 'Sản phẩm', icon: DatabaseOutlined },
              { key: 'users', label: 'Người dùng', icon: UserOutlined },
              { key: 'orders', label: 'Đơn hàng', icon: ShoppingOutlined },
              { key: 'vouchers', label: 'Voucher', icon: GiftOutlined },
              { key: 'delivery', label: 'Loại giao hàng', icon: CarOutlined },
              { key: 'paymentType', label: 'Loại thanh toán', icon: CarOutlined },
              { key: 'banners', label: 'Banner', icon: PictureOutlined },
              { key: 'blog', label: 'Blog', icon: FileTextOutlined },
              { key: 'settings', label: 'Cài đặt', icon: SettingOutlined },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setSelectedMenu(key)}
                className={`flex items-center w-full p-2 rounded-lg transition ${selectedMenu === key
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <Icon className="text-lg" />
                <span className="ml-3">{label}</span>
              </button>
            ))}
            <button
              onClick={() => navigate('/home')}
              className="flex items-center w-full p-2 text-gray-700 rounded-lg hover:bg-gray-100 transition"
            >
              <LogoutOutlined className="text-lg" />
              <span className="ml-3">Trang chủ</span>
            </button>
          </nav>
        </aside>

        {/* Main Section */}
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  );
};

export default AdminPage;
