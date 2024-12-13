import styled from 'styled-components';

export const WrapperProductDetail = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;
export const DiscountStyle = styled.div`
  background-color: red;
  color: white;
  padding: 4px 8px;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  display: inline-block;
  margin-top: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  margin-top: -2px;
`;
// Trong style.js
export const PriceStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`;

export const OriginalPriceStyle = styled.div`
  color: #858585;
  font-weight: 600;
  font-size: 16px;
  text-decoration: line-through;
`;

export const DiscountedPriceStyle = styled.div`
  color: #FF4D4F;
  font-weight: 600;
  font-size: 20px;
  margin-top: 4px;
`;

export const NormalPriceStyle = styled.div`
  color: #FF4D4F;
  font-weight: 600;
  font-size: 20px;
`;

