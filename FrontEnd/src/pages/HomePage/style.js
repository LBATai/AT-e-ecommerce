import styled from 'styled-components';

export const WrapperHome = styled.div`
  display: flex; /* Sử dụng flex để căn chỉnh Navbar và sản phẩm */
  background-color: #ff0000;
`;

export const CardContainer = styled.div`
  display: grid; /* Sử dụng grid để bố trí sản phẩm */
  grid-template-columns: repeat(4, 1fr); /* Tối đa 4 sản phẩm trên 1 hàng */
  gap: 20px 20px;  
  width: calc(100% - 250px); /* Chiếm phần còn lại sau khi trừ độ rộng Navbar */
  margin-top: 60px;
  margin-left: 50px;
  margin-right: 150px;
  padding: 20px;
  background-color: #0000ff;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
