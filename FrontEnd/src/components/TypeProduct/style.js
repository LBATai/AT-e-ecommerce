// src/components/style.js
import styled from 'styled-components';

export const TypeProductWrapper = styled.div`
  background-color: #fff;
`;

export const CategoryItem = styled.div`
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 8px;
  margin: 0 10px;
  text-align: center;
  font-weight: 500;
  color: #074398;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #d9e3f0;
  }
`;
