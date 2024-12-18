// styles.js
import styled from 'styled-components';
import { Layout, Menu, Card, Button } from 'antd';

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background: #f5f6fa;
`;

export const StyledSider = styled(Layout.Sider)`
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  
  /* .ant-layout-sider-children {
    position: fixed;
    width: inherit;
    height: 100vh;
    overflow-y: auto;
  }
   */
  @media (max-width: 768px) {
    .ant-layout-sider-children {
      position: static;
      height: auto;
    }
  }
`;

export const UserProfile = styled.div`
  padding: 24px;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
`;

export const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 50px auto 16px;
  overflow: hidden;
  border: 4px solid #f5f6fa;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const StyledContent = styled(Layout.Content)`
  padding: 24px;
  margin: 24px;
  
  @media (max-width: 768px) {
    margin: 12px;
    padding: 16px;
  }
`;

export const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  
  .ant-card-head {
    border-bottom: 1px solid #f0f0f0;
    padding: 16px 24px;
  }
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
`;

export const StatsCard = styled(StyledCard)`
  text-align: center;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  .stats-value {
    font-size: 24px;
    font-weight: bold;
    color: ${props => props.color || '#1890ff'};
    margin-bottom: 8px;
  }
  
  .stats-label {
    color: #8c8c8c;
    font-size: 14px;
  }
`;

export const OrderCard = styled(StyledCard)`
  margin-bottom: 16px;
  
  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  
  .order-status {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .order-items {
    padding: 16px 0;
    border-top: 1px solid #f0f0f0;
  }
  
  .order-total {
    text-align: right;
    padding-top: 16px;
    border-top: 1px solid #f0f0f0;
    font-weight: bold;
  }
`;

export const AddressCard = styled(StyledCard)`
  .address-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .address-badge {
    margin-left: 8px;
  }
`;

export const ActionButton = styled(Button)`
  &.primary {
    background: #1890ff;
    border-color: #1890ff;
    
    &:hover {
      background: #40a9ff;
      border-color: #40a9ff;
    }
  }
  
  &.warning {
    background: #faad14;
    border-color: #faad14;
    
    &:hover {
      background: #ffc53d;
      border-color: #ffc53d;
    }
  }
`;





//kfajsfdlkasjlfkjs
export const Container = styled.div`
  min-height: 100vh;
  background-color: #f5f6fa;
`;

export const Header = styled.header`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

export const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2d3436;
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const NotificationBadge = styled.div`
  position: relative;
  cursor: pointer;
  color: #636e72;
  
  span {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #e84393;
    color: white;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 0.75rem;
  }
`;

export const AvatarWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #dfe6e9;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background-color: #b2bec3;
  }
`;

export const MainContent = styled.div`
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  gap: 2rem;
`;

export const Sidebar = styled.aside`
  width: 260px;
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  height: calc(100vh - 100px);
  position: sticky;
  top: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;
export const MenuItem = styled.div.attrs(props => ({
  // Đảm bảo không truyền 'active' xuống DOM
  active: undefined,
}))`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  color: ${props => props.active ? '#6c5ce7' : '#636e72'};
  background-color: ${props => props.active ? '#f5f3fe' : 'transparent'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f5f3fe;
    color: #6c5ce7;
  }

  span {
    font-weight: ${props => props.active ? '600' : '400'};
  }
`;


export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

export const StatCard = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const StatTitle = styled.h3`
  font-size: 1rem;
  color: #636e72;
  margin-bottom: 0.5rem;
`;

export const StatValue = styled.p`
  font-size: 1.875rem;
  font-weight: bold;
  color: #2d3436;
`;

export const PageTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2d3436;
  margin-bottom: 1.5rem;
`;