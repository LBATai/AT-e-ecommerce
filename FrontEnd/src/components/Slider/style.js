// src/components/style.js
import styled from 'styled-components';

export const SlideWrapper = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
`;

export const SlideItem = styled.div`
  img {
    width: 100%;
    max-height: 300px; /* Điều chỉnh chiều cao theo nhu cầu của bạn */
    border-radius: 8px;
    object-fit: cover; /* Giúp ảnh được cắt bớt mà không bị méo */
  }
`;
