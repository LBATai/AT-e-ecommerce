import React, { useState } from 'react';
import {
  BellOutlined,
  UserOutlined,
  AppstoreOutlined,
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import AdminUser from '../../components/AdminUser/AdminUser';
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

  const renderContent = () => {
    switch (selectedMenu) {
      case 'products':
        return <AdminProduct />;
      case 'users':
        return <AdminUser />;
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
            active={selectedMenu === 'dashboard'}
            onClick={() => setSelectedMenu('dashboard')}
          >
            <HomeOutlined style={{ fontSize: 20 }} />
            <span>Bảng điều khiển</span>
          </MenuItem>
          <MenuItem
            active={selectedMenu === 'products'}
            onClick={() => setSelectedMenu('products')}
          >
            <AppstoreOutlined style={{ fontSize: 20 }} />
            <span>Sản phẩm</span>
          </MenuItem>
          <MenuItem
            active={selectedMenu === 'users'}
            onClick={() => setSelectedMenu('users')}
          >
            <UserOutlined style={{ fontSize: 20 }} />
            <span>Người dùng</span>
          </MenuItem>
          <MenuItem>
            <SettingOutlined style={{ fontSize: 20 }} />
            <span>Cài đặt</span>
          </MenuItem>
          <MenuItem>
            <LogoutOutlined style={{ fontSize: 20 }} />
            <span>Đăng xuất</span>
          </MenuItem>
        </Sidebar>
        <div style={{ flex: 1 }}>{renderContent()}</div>
      </MainContent>
    </Container>
  );
};

export default AdminPage;
