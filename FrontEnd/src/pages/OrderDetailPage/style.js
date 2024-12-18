// styles.js
import styled from 'styled-components';
import { Layout, Menu, Card, Button } from 'antd';

export const OrderDetailWrapper = styled(Layout)`
  padding: 50px;
`;

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
  margin-bottom: 10px;
  
  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
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
  
  .order-total-button{
    display: flex;
    justify-content: space-between;                   /* Khoảng cách giữa các nút */
}

.order-button {
  margin-left: auto;            /* Đẩy các nút sang bên phải */
  display: flex;                /* Dùng Flexbox để căn chỉnh các nút */
  gap: 8px;                     /* Khoảng cách giữa các nút */
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