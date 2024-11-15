import styled from "styled-components";
import { Row } from "antd";

// Wrapper for Header
export const WrapperHeader = styled(Row)`
  padding: 10px 120px;
  background-color: #0080ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    padding: 10px 20px; /* Giảm padding cho màn hình nhỏ */
    flex-direction: column;
    align-items: flex-start;
  }
`;

// Title Text
export const WrapperTextHeader = styled.span`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  line-height: 1.5;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 10px;
  }
`;

// Account section
export const WrapperHeaderAccout = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 10px;
  color: #fff;
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
  padding: 10px;
  min-width: 200px;
  border-radius: 4px;

  @media (max-width: 768px) {
    min-width: 150px;
    padding: 8px;
  }
`;

// Hamburger menu icon and dropdown
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

export const MenuDropdown = styled.div`

`;
