import styled from "styled-components";
import { Row } from "antd";

// Wrapper for Header
export const WrapperHeader = styled(Row)`
  padding: 10px 120px;
  background-color: #007BFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    padding: 10px 20px;
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
  width: 200px;
  height: 200px;
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

// MenuItem style
export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  color: #333;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #cfcfcf;
  }

  .anticon {
    font-size: 18px;
    margin-right: 10px;
    color: #0080ff;
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

// Product list dropdown (hover over cart)
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
    background-color: #f0f0f0;
    color: #000000;
    font-weight: bold;
    border-radius: 4px;
  }

  span {
    position: relative;
    cursor: pointer;
    text-align: center;
    z-index: 1;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 30px;
    padding: 5px 10px;
    border-radius: 4px;
    transition: none;

    &:hover {
      color: #000000;
    }

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 0;
      background-color: #f0f0f0;
      z-index: -1;
      transition: height 0.15s ease-out;
      transform: translateY(-50%);
    }

    &:hover::before {
      height: 100%;
      top: 0;
      transform: translateY(0);
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
`;

export const MenuDropdown = styled.div``;

export const DropdownMenu = styled.div`
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #333;
  min-width: 300px;
  transition: all 0.3s ease;

  strong {
    display: block;
    font-size: 18px;
    margin-bottom: 8px;
    color: #007bff;
  }

  ul {
    display: flex;
    gap: 15px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.3s ease;

    &:hover {
      background-color: #f0f0f0;
    }
  }

  @media (max-width: 768px) {
    min-width: 250px;
  }
`;
