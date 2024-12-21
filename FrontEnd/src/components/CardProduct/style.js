import styled from 'styled-components';
import { Button } from 'antd';

export const CardContainer = styled.div`
  width: 220px;
  height: 400px;
  position: relative;
  overflow: hidden;
  border: #c0c0c0 solid ;

  transition: border-color 0.1s ease-in-out;
  display: flex;
  flex-direction: column;

  .ant-card {
    height: 100%; /* Đảm bảo chiều cao đầy đủ */
    display: flex;
    flex-direction: column;
    border-radius: 0 0 0 0; /* Xóa bo tròn */
  }

  .ant-card-body {
    padding: 10px;
    flex-grow: 1; /* Cho phép nội dung chiếm không gian còn lại */
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* Đảm bảo nội dung cách đều */
  }
  .ant-card-cover {
    border-radius: 0 0 0 0;
  }
  &:hover {
    border-color: #5f5f5f;
    box-shadow: inset 0 6px 12px rgba(0, 0, 0, 0.5);
  }
`;


export const Image = styled.img`
  width: 100%;
  height: 170px;
  object-fit: cover;
`;

export const Content = styled.div`
  padding: 10px;
  text-align: center;
  flex-grow: 1; /* Đảm bảo phần content chiếm không gian còn lại */
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => (props.isHovered ? '#f70000' : '#000')};
`;

export const Description = styled.p`
  font-size: 12px;
  color: #555;
  margin-top: 20px;
  height: 65px;
  overflow: hidden;
  text-align: justify;
  position: relative;

  /* Gradient làm mờ từ trên xuống và mờ dần thành màu đen */
  background: linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 90%);
  background-clip: text;
  -webkit-background-clip: text; /* Dành cho trình duyệt Safari */
  color: transparent;
`;

export const Name = styled.div`
  color: #555;
  height: 45px;
  overflow: hidden;
  text-align: start;
`;

export const Price = styled.p`
  font-size: 14px;
  color: gray;
  text-decoration: ${(props) => (props.discount && props.discount > 0 ? 'line-through' : 'none')};
  font-size: ${(props) => (props.discount && props.discount < 1 ? '25px' : '14px')};
  margin-bottom: -15px;
`;

export const DiscountedPrice = styled.p`
  font-size: 18px;
  font-size: ${(props) => (props.discount && props.discount < 1 ? '18px' : '16px')};
  color: #ff0000
`;

export const Rating = styled.div`
  margin-top: 10px;
  margin-right: -20px;

  .ant-rate-star .anticon {
    font-size: 12px;
    color: lightgray;
  }

  .ant-rate-star-full .anticon {
    color: #ffd700;
  }
`;

export const HoverActions = styled.div`
  position: absolute;
  bottom: 14px;
  right: -4px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ActionButton = styled(Button)`
  background-color: red;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  transform: translateX(100%);
  transition: transform 0.15s ease-in-out, box-shadow 0.1s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);

  &:hover {
    background-color: #951c1c !important;  /* Màu nền đỏ đậm */
    color: white !important;  /* Giữ nguyên màu chữ trắng */
    /* Thêm hiệu ứng shadow khi hover */
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;

export const PriceaAndRate = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
`;

export const DiscountTag = styled.span`
  background-color: red;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  position: absolute;
  top: 10px;  // Điều chỉnh khoảng cách từ trên
  left: 10px;  // Điều chỉnh khoảng cách từ bên trái
  z-index: 10;
`;
