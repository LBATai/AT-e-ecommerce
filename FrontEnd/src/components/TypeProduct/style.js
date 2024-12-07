// src/components/style.js
import styled from 'styled-components';

export const TypeProductWrapper = styled.div`
  margin-top: 70px;
  margin-bottom: 10px;
  background-color: #fff;
`;

export const CategoryItem = styled.div`
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 8px;
  margin: 0 10px;
  text-align: center;
  font-weight: 500;
  color: #6f6f6f;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #d9e3f0;
  }
`;
