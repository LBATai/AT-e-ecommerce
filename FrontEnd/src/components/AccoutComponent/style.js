import styled from "styled-components";

export const WrapperAccount = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  gap: 10px;
  color: #333;
  position: absolute;
  top: 60px;
  right: 60px;
  width: 250px;
  padding: 20px;
  box-sizing: border-box;
  z-index: 1000;
  border-radius: 12px;
  
  /* Hiệu ứng đổ bóng */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);
  }
`;

export const AccountItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 12px 15px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  font-weight: 500;

  &:hover {
    background-color: #d7d7d7;
  }
`;
