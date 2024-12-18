import styled from "styled-components";
import { Row } from "antd";

// Wrapper for Header
export const WrapperHeader = styled(Row)`
  padding: 10px 120px;
  background-color: #007BFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed; /* Đảm bảo luôn cố định */
  top: 0; /* Căn chỉnh ở đầu trang */
  left: 0;
  width: 100%; /* Chiếm toàn bộ chiều rộng */
  z-index: 999; /* Đặt z-index cao hơn để nằm trên các thành phần khác */

  @media (max-width: 768px) {
    padding: 10px 20px; /* Giảm padding cho màn hình nhỏ */
    flex-direction: column;
    align-items: flex-start;
  }
`;

// Title Text
export const WrapperTextHeader = styled.span`
  color: #000000;
  font-size: 24px;
  font-weight: bold;
  line-height: 1.5;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 10px;
  }
`;
export const Popopover = styled.div`
 display: flex;
  flex-direction: column;
  width: 200px; /* Đặt chiều rộng */
  height: 200px; /* Đặt chiều cao */
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

// Định nghĩa style cho các mục menu
export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  color: #333;
  font-weight: 600;
  transition: background-color 0.3s ease; /* Thêm hiệu ứng chuyển màu khi hover */

  &:hover {
    background-color: #cfcfcf;
  }

  .anticon {
    font-size: 18px;
    margin-right: 10px;
    color: #0080ff; /* Thêm màu cho icon */
  }
`;

// Account section
export const WrapperHeaderAccout = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 10px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;

  @media (max-width: 768px) {
    margin-left: 0;
    justify-content: center;
    margin-bottom: 10px;
  }
`;

// Cart section
export const WrapperHeaderCart = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: 30px;
  color: #fff;
  position: relative;
  cursor: pointer;

  @media (max-width: 768px) {
    margin-left: 0;
    justify-content: center;
  }
`;

// Cart item count badge
export const CartItemCount = styled.span`
  position: absolute;
  bottom: 15px;
  left: 25px;
  background-color: red;
  border-radius: 50%;
  color: white;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;

  @media (max-width: 768px) {
    bottom: 10px;
    left: 20px;
    width: 18px;
    height: 18px;
    font-size: 10px;
  }
`;

// Product list dropdown (when hovering over cart)
export const ProductListBox = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 20px;
  min-width: 250px;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  max-height: 300px;
  overflow-y: auto;
  width: max-content;

  h4 {
    font-size: 18px;
    color: #007bff;
    margin-bottom: 10px;
  }

  div {
    padding: 8px 0;
    font-size: 14px;
    cursor: pointer;
    border-bottom: 1px solid #f0f0f0;

    &:hover {
      background-color: #f0f0f0;
    }
  }

  @media (max-width: 768px) {
    min-width: 200px;
    padding: 15px;
    font-size: 14px;
  }
`;

// Popover Styling
export const PopoverContent = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 15px;
  width: 300px;
  font-size: 16px;
  color: #333;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  .ant-popover-inner {
    padding: 0 !important;
  }

  .ant-popover-arrow {
    display: none;
  }

  .popover-item {
    padding: 10px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #f0f0f0;
    }
  }

  @media (max-width: 768px) {
    width: 250px;
  }
`;

export const HamburgerMenu = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  height: 20px;
  width: 25px;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

export const HamburgerLine = styled.div`
  height: 4px;
  background-color: white;
  border-radius: 2px;
  width: 100%;
`;
export const WrapperNav = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 16px;
  color: #000000;
  font-weight: 600;

  span.active {
    background-color: #f0f0f0; /* Màu nền */
    color: #000000; /* Màu chữ */
    font-weight: bold; /* In đậm chữ */
    border-radius: 4px; /* Bo góc */
  }

  span {
    position: relative; /* Để pseudo-element hoạt động */
    cursor: pointer;
    text-align: center;
    z-index: 1; /* Đảm bảo nội dung luôn nằm trên pseudo-element */
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px; /* Chiều rộng cố định */
    height: 30px; /* Chiều cao cố định */
    padding: 5px 10px; /* Khoảng cách bên trong */
    border-radius: 4px; /* Bo góc */
    transition: none; /* Loại bỏ transition khi nhấn vào phần tử */

    &:hover {
      color: #000000;
    }

    &::before {
      content: '';
      position: absolute;
      top: 50%; /* Bắt đầu ở giữa */
      left: 0;
      width: 100%;
      height: 0; /* Chiều cao bắt đầu từ 0 */
      background-color: #f0f0f0;
      z-index: -1; /* Đưa nền ra sau chữ */
      transition: height 0.15s ease-out; /* Hiệu ứng cho phần tử này */
      transform: translateY(-50%);
    }

    &:hover::before {
      height: 100%; /* Khi hover, nền mở rộng toàn bộ */
      top: 0; /* Đưa lên đầu */
      transform: translateY(0); /* Reset lại vị trí */
    }
  }
`;
export const SearchBox = styled.div`
  position: absolute;
  top: 100%;
  right: 10px;
  width: 400px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  z-index: 100;
  margin-top: 12px;
  border-radius: 5px;
`;

export const MenuDropdown = styled.div``;

export const DropdownMenu = styled.div`
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #333;
  min-width: 300px; /* Đảm bảo chiều rộng */
  transition: all 0.3s ease;

  strong {
    display: block;
    font-size: 18px;
    margin-bottom: 8px;
    color: #007bff;
  }

  ul {
    display: flex; /* Hiển thị danh sách nằm ngang */
    gap: 15px; /* Khoảng cách giữa các mục */
    list-style: none; /* Bỏ dấu chấm */
    margin: 0;
    padding: 0;
  }

  li {
    padding: 5px 10px;
    background-color: #f9f9f9;
    border-radius: 4px;
    transition: background-color 0.3s ease, transform 0.3s ease;
    cursor: pointer;
    text-align: center;

    &:hover {
      background-color: #e6f7ff;
      transform: translateY(-3px); /* Hiệu ứng nổi khi hover */
    }
  }
`;

