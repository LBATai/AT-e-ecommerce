import styled from 'styled-components';

export const WrapperHome = styled.div`
  display: flex;
  flex-direction: row; /* Căn chỉnh các phần tử con theo chiều ngang */
  background-color: #F5F5F5;
  padding-top: 70px;
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Sử dụng auto-fill và minmax để điều chỉnh số lượng cột tự động */
  gap: 20px;
  width: 100%; /* Chiếm toàn bộ chiều rộng của container */
  margin-top: 20px;
  padding: 20px;
  background-color: #F5F5F5;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding-bottom: 50px; /* Thêm padding dưới cùng để phân trang không bị dính sát dưới */
`;
export const NavbarContainer = styled.div`
  width: 20%; /* Chiếm 20% chiều rộng */
  min-width: 200px; /* Đảm bảo không bị quá nhỏ */
  background-color: #fff; /* Màu nền hoặc thay đổi theo ý thích */
  border-right: 1px solid #ddd; /* Thêm đường viền phân cách nếu cần */
`;