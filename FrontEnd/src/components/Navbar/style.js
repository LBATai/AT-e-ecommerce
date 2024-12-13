import styled from "styled-components";

export const WrapperNavbar = styled.div `
    margin-bottom: 20px;
    margin-left: 20px;
    background-color: #fff;
    padding: 10px 10px;
    border: #c0c0c0 solid ;

`
export const WrapperCheckBox = styled.div`
    display: flex;  
    flex-direction: column;
`
export const TypeProduct = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  cursor: pointer;
  padding: 15px;
  border-radius: 8px;
  transition: all 0.3s ease; /* Thêm hiệu ứng chuyển động mượt mà khi hover */

  &:hover {
    background-color: #E6E6E6;
  }
  text-align: start;
`;

export const PriceRange = styled.div`
`
export const Star = styled.div`
    display: flex;
    gap: 5px;
    cursor: pointer;
`