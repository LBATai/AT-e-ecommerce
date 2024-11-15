import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  
  /* Đảm bảo nội dung có thể cuộn trên các màn hình nhỏ */
  overflow-x: hidden;
`;

export const CartItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 800px;
  justify-content: space-between;
  
  /* Điều chỉnh giỏ hàng khi màn hình nhỏ */
  @media (max-width: 768px) {
    padding: 10px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

export const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: flex-start;
`;

export const ItemName = styled.h2`
  font-size: 18px;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const ItemPrice = styled.p`
  font-size: 16px;
  color: #ff4d4f;
  margin-bottom: 12px;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ItemActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    width: auto;
  }
`;

export const QuantityContainer = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const QuantityButton = styled.button`
  background-color: #80b0f4;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #4a90e2;
  }
`;

export const RemoveButton = styled.button`
  background-color: #ff4d4f;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #e04444;
  }
  
  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 14px;
  }
`;

export const CheckoutContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  max-width: 800px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 20px;
  }
`;

export const TotalPrice = styled.h3`
  font-size: 20px;
  color: #333;
  margin-right: 20px;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const CheckoutButton = styled.button`
  background-color: #4a90e2;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #357ab8;
  }
  
  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

export const EmptyCartMessage = styled.p`
  font-size: 18px;
  color: #888;
  margin-top: 50px;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
