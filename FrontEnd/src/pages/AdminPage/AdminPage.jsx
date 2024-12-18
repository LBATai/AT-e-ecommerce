import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BellOutlined,
  UserOutlined,
  AppstoreOutlined,
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
  ShoppingOutlined
} from '@ant-design/icons';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminOrder from '../../components/AdminOrder/AdminOrder';
import {
  Container,
  Header,
  HeaderContent,
  Logo,
  UserSection,
  NotificationBadge,
  MainContent,
  Sidebar,
  MenuItem,
  DashboardGrid,
  StatCard,
  StatTitle,
  StatValue,
  PageTitle,
  AvatarWrapper,
} from './style';

const AdminPage = () => {
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  const navigate = useNavigate();
  const renderContent = () => {
    switch (selectedMenu) {
      case 'products':
        return <AdminProduct />;
      case 'users':
        return <AdminUser />;
      case 'orders':
        return <AdminOrder />;
      default:
        return (
          <div>
            <PageTitle>Bảng điều khiển</PageTitle>
            <DashboardGrid>
              <StatCard>
                <StatTitle>Tổng số người dùng</StatTitle>
                <StatValue>1,234</StatValue>
              </StatCard>
              <StatCard>
                <StatTitle>Tổng số sản phẩm</StatTitle>
                <StatValue>567</StatValue>
              </StatCard>
              <StatCard>
                <StatTitle>Tổng số đơn hàng</StatTitle>
                <StatValue>890</StatValue>
              </StatCard>
              <StatCard>
                <StatTitle>Doanh thu</StatTitle>
                <StatValue>$12,345</StatValue>
              </StatCard>
            </DashboardGrid>
          </div>
        );
    }
  };

  return (
    <Container>
      {/* Header */}
      <Header>
        <HeaderContent>
          <Logo>Bảng điều khiển quản trị</Logo>
          <UserSection>
            <NotificationBadge>
              <BellOutlined style={{ fontSize: 20 }} />
              <span>3</span>
            </NotificationBadge>
            <AvatarWrapper>
              <UserOutlined style={{ fontSize: 20 }} />
            </AvatarWrapper>
          </UserSection>
        </HeaderContent>
      </Header>

      {/* Nội dung chính */}
      <MainContent>
        <Sidebar>
        <MenuItem
            active={selectedMenu === 'dashboard' ? 'true' : 'false'}
            onClick={() => setSelectedMenu('dashboard')}
          >
            <HomeOutlined style={{ fontSize: 20 }} />
            <span>Bảng điều khiển</span>
          </MenuItem>
          <MenuItem
            active={selectedMenu === 'products' ? 'true' : 'false'}
            onClick={() => setSelectedMenu('products')}
          >
            <AppstoreOutlined style={{ fontSize: 20 }} />
            <span>Sản phẩm</span>
          </MenuItem>
          <MenuItem
            active={selectedMenu === 'users' ? 'true' : 'false'}
            onClick={() => setSelectedMenu('users')}
          >
            <UserOutlined style={{ fontSize: 20 }} />
            <span>Người dùng</span>
          </MenuItem>
          <MenuItem
            active={selectedMenu === 'orders' ? 'true' : 'false'}
            onClick={() => setSelectedMenu('orders')}
          >
            <ShoppingOutlined style={{ fontSize: 20 }}/>
            <span>Đơn hàng</span>
          </MenuItem>
          <MenuItem>
            <SettingOutlined style={{ fontSize: 20 }} />
            <span>Cài đặt</span>
          </MenuItem>
          <MenuItem onClick={() => navigate('/home')}>
            <LogoutOutlined style={{ fontSize: 20 }} />
            <span>Trang chủ</span>
          </MenuItem>
        </Sidebar>
        <div style={{ flex: 1 }}>{renderContent()}</div>
      </MainContent>
    </Container>
  );
};

export default AdminPage;
