import styled from 'styled-components';

export const PageWrapper = styled.div`
  background-color: #fbfbfb;  /* Màu nền cho toàn bộ trang */
  min-height: 100vh;           /* Đảm bảo chiều cao toàn trang */
  padding: 20px;
`
export const DeliveryStyle = styled.div`
    padding: 20px;
    background-color: #e3ffff;
    margin-bottom: 20px;
    border-radius: 6px;
    width: 60%;
    display: flex;
  flex-direction: column; /* Các phần tử con sẽ xếp theo chiều dọc */
  gap: 15px; /* Khoảng cách giữa các phần tử */
`
export const PayStyle = styled.div`
    padding: 20px;
    border-radius: 6px;
    background-color: #e3ffff;
    margin-bottom: 200px;
    width: 60%;
    display: flex;
  flex-direction: column; /* Các phần tử con sẽ xếp theo chiều dọc */
  gap: 15px; /* Khoảng cách giữa các phần tử */
`
export const TitleStyle = styled.h3`
  padding: 10px;
  margin-top: 80px;
  margin-bottom: -100px;
  margin-left: 120px;
  width: 14%;
`