// src/components/CardProduct/style.js
import styled from 'styled-components';
import { Button } from 'antd';

export const CardContainer = styled.div`
  width: 220px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0.5px 2px rgba(0, 0, 0, 0.3);
  margin-left: 10px;
  margin-top: 150px;
  margin-bottom: 20px;
  position: relative;
`;

export const Image = styled.img`
  width: 100%;
  height: 170px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
`;

export const Content = styled.div`
  padding: 2px;
  text-align: center;
  position: relative;
`;

export const Title = styled.div`
  font-size: 18px;
  margin: 2px 0;
`;

export const Description = styled.p`
  font-size: 12px;
  color: #555;
  height: 60px;
  overflow: hidden;
  text-align: justify; /* Căn đều trái và phải */
`;

export const Name = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Căn trái nếu muốn */
`;

export const Price = styled.p`
  font-size: 16px;
  color: gray; /* Màu xám cho giá hiện tại */
  margin-bottom: 0; /* Đặt margin bottom về 0 */
  text-decoration: line-through; /* Gạch ngang giá hiện tại */
`;

export const DiscountedPrice = styled.p`
  font-size: 16px; /* Kích thước chữ cho giá đã giảm */
  color: #1890ff; /* Màu chữ cho giá đã giảm */
  margin-top: 1px; /* Khoảng cách phía trên */
`;

export const Rating = styled.div`
  margin-top: 42px;
  margin-left: 10px;
  margin-right: -25px;
  .ant-rate-star .anticon {
    font-size: 12px;
    color: lightgray; /* Màu xám cho các ngôi sao chưa được đánh giá */
  }

  .ant-rate-star-full .anticon {
    color: #FFD700; /* Màu vàng toàn bộ cho các ngôi sao đã được đánh giá */
  }
`;

export const HoverActions = styled.div`
  position: absolute;
  bottom: 1px;
  right: -140px; /* Đặt ở ngoài box */
  text-align: right;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  opacity: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  transform: translateX(0);

  ${CardContainer}:hover & {
    opacity: 1;
    transform: translateX(-100px); /* Dịch chuyển vào box */
  }
`;

export const ActionButton = styled(Button)`
  font-size: 12px;
  color: white;
  background-color: red;
  border: none;
  padding-left: 3px;
  font-weight: bold;
  &:hover {
    color: white;
    background-color: #ff4d4f;
  }
`;

export const PriceaAndRate =styled.div`
  display: flex;
  margin-bottom: -20px;
  margin-top: -20px;
`;

export const DiscountTag = styled.span`
  background-color: red; /* Màu nền cho tag giảm giá */
  color: white; /* Màu chữ cho tag */
  padding: 2px 5px; /* Khoảng cách bên trong tag */
  border-radius: 5px; /* Bo tròn góc cho tag */
  margin-left: 10px; /* Khoảng cách với tên sản phẩm */
  font-size: 12px; /* Kích thước chữ cho tag */
`;