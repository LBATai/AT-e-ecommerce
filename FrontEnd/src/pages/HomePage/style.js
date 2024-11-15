import styled from 'styled-components';

export const WrapperHome = styled.div`
  display: flex;
`;

export const CardContainer = styled.div`
  display: flex; /* Sử dụng flex để hiển thị theo hàng ngang */
  justify-content: space-between; /* Căn chỉnh đều các sản phẩm */
`;

export const Card = styled.div`
  flex: 0 0 calc(25% - 10px); /* Mỗi sản phẩm chiếm 25% chiều rộng (tổng cộng 4 sản phẩm trên hàng) */
  margin-bottom: 20px; /* Khoảng cách dưới mỗi sản phẩm */
`;

export const PaginationContainer = styled.div`
  display: flex; /* Sử dụng flex để hiển thị các phân trang */
  justify-content: center; /* Căn chỉnh đ��u các phân trang */
`;