import React from 'react';
import { WrapperAccount, AccountItem } from './style';
import { UserOutlined, ShoppingCartOutlined, OrderedListOutlined, LogoutOutlined } from '@ant-design/icons';

const AccountDropdown = () => {
  return (
    <WrapperAccount>
      {/* Thông tin người dùng */}
      <AccountItem>
        <UserOutlined style={{ fontSize: '18px', color: '#074398' }} />
        Thông tin tài khoản
      </AccountItem>

      {/* Đơn mua */}
      <AccountItem>
        <OrderedListOutlined style={{ fontSize: '18px', color: '#FFA500' }} />
        Đơn mua
      </AccountItem>

      {/* Giỏ hàng */}
      <AccountItem>
        <ShoppingCartOutlined style={{ fontSize: '18px', color: '#32CD32' }} />
        Giỏ hàng
      </AccountItem>

      {/* Đăng xuất */}
      <AccountItem>
        <LogoutOutlined style={{ fontSize: '18px', color: '#FF4500' }} />
        Đăng xuất
      </AccountItem>
    </WrapperAccount>
  );
}

export default AccountDropdown;
