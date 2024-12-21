import styled, { css } from 'styled-components';

export const DiscountStyle = styled.div`
  background-color: red;
  color: white;
  padding: 4px 8px;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  display: inline-block;
  margin-top: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  margin-top: -2px;
  width: 40px;
`;
export const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  font-family: system-ui, sans-serif;
  margin-top: 5rem;
  h1 {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 500;
    margin: 1.5rem 0 1rem;
  }

  ul {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin-bottom: 1rem;
    
    li {
      margin-bottom: 0.5rem;
      line-height: 1.5;
    }
  }

  .size-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;

    a {
      color: #2563eb;
      font-size: 0.875rem;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .size-buttons {
    display: flex;
    gap: 0.5rem;
  }

  .actions {
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
  }

  .tab-buttons {
    display: flex;
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 1rem;
  }
`;

export const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1.5rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  margin-bottom: 2rem;

  .rating-summary {
    text-align: center;
  }

  .rating-count {
    color: #6b7280;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }

  .review-button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem;
  }
`;

export const RatingScore = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  line-height: 1;
  margin-bottom: 0.25rem;
`;

export const StarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.125rem;
  color: #d1d5db;

  .fill {
    color: #fbbf24;
    fill: currentColor;
  }
`;

// You might also want to update these existing components:




export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

export const Breadcrumb = styled.nav`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 1.5rem;

  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      color: #2563eb;
    }
  }

  span {
    margin: 0 0.5rem;
  }
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const ProductImage = styled.div`
  aspect-ratio: 1;
  background: #f3f4f6;
  border-radius: 0.5rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h1 {
    font-size: 1.5rem;
    font-weight: 500;
  }

  .size-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;

    a {
      color: #2563eb;
      font-size: 0.875rem;
      text-decoration: none;
    }
  }

  .actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  gap: 1rem;

  span:first-child {
    color: #666;
  }

  .status {
    color: #16a34a;
  }
`;

export const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: #dc2626;
`;

export const ColorButton = styled.button`
  padding: 0.5rem 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  margin-top: 0.5rem;
  cursor: pointer;

  ${props => props.selected && css`
    border-color: #dc2626;
    background-color: #fef2f2;
  `}

  &:hover {
    border-color: #dc2626;
  }
`;
export const DiscountedPriceStyle = styled.div`
  color: #000000;
  font-weight: 600;
  margin-top: 4px;
  text-decoration: line-through;
`;
export const SizeButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  margin-right: 0.5rem;
  cursor: pointer;

  ${props => props.selected && css`
    border-color: #dc2626;
    background-color: #fef2f2;
  `}

  ${props => props.disabled && css`
    opacity: 0.5;
    cursor: not-allowed;
  `}

  &:hover {
    border-color: ${props => (props.disabled ? '#e5e7eb' : '#dc2626')};
  }
`;

export const QuantityWrapper = styled.div`
  > span {
    display: block;
    margin-bottom: 0.5rem;
  }

  > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const QuantityButton = styled.button`
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    border-color: #dc2626;
  }
`;

export const QuantityInput = styled.input`
  width: 4rem;
  text-align: center;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  padding: 0.5rem;
`;

export const ActionButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;

  ${props => props.variant === 'primary' && css`
    background: #dc2626;
    color: white;
    &:hover {
      background: #b91c1c;
    }
  `}

  ${props => props.variant === 'secondary' && css`
    border: 1px solid #dc2626;
    color: #dc2626;
    &:hover {
      background: #fef2f2;
    }
  `}
`;

export const PromotionButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #1f2937;
  color: white;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #111827;
  }
`;

export const ShareWrapper = styled.div`
  margin-top: 1rem;
  cursor: pointer;

  > span {
    display: block;
    margin-bottom: 0.5rem;
  }

  > div {
    display: flex;
    gap: 0.5rem;
  }
`;

export const ShareButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${props => {
    switch(props.color) {
      case 'facebook':
        return css`color: #1877f2;`;
      case 'twitter':
        return css`color: #1da1f2;`;
      case 'pinterest':
        return css`color: #e60023;`;
      default:
        return css`color: #666;`;
    }
  }}

  &:hover {
    background: #f3f4f6;
  }
`;

export const TabWrapper = styled.div`
  .tab-buttons {
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 1.5rem;
  }
`;
export const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  border-bottom: 2px solid transparent;
  margin-right: 1rem;
  cursor: pointer;

  ${props => props.active && css`
    border-bottom-color: #dc2626;
  `}
`;

export const TabContent = styled.div`
  display: ${props => props.visible ? 'block' : 'none'};
  
  h3 {
    font-size: 1.125rem;
    font-weight: 500;
    margin-bottom: 1rem;
    margin-top: 1.5rem;

    &:first-child {
      margin-top: 0;
    }
  }
`;

export const DescriptionList = styled.ul`
  list-style-type: disc;
  padding-left: 1.5rem;
  
  li {
    margin-bottom: 0.5rem;
    line-height: 1.5;
  }
`;

export const ReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const RatingSummary = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;

  > div:first-child {
    text-align: center;
  }
`;

export const RatingNumber = styled.div`
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 0.25rem;
`;

export const RatingStars = styled.div`
  display: flex;
  color: #f59e0b;
  
  .fill {
    fill: currentColor;
  }
`;

export const ReviewCount = styled.div`
  font-size: 0.875rem;
  color: #666;
  margin-top: 0.25rem;
`;

export const ReviewButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #dc2626;
  color: #dc2626;
  border-radius: 0.25rem;
  font-weight: 500;
  justify-content: center;

  &:hover {
    background: #fef2f2;
  }
`;

export const ReviewCard = styled.div`
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
  }
`;

export const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;

  span:first-child {
    font-weight: 500;
  }

  span:nth-child(2) {
    color: #9ca3af;
  }
`;

export const ReviewDate = styled.div`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

export const ReviewText = styled.p`
  line-height: 1.5;
  margin-bottom: 1rem;
`;

export const ReviewImages = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const ReviewImage = styled.img`
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  border-radius: 0.25rem;
`;

// Thêm các utilities cho responsive
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px'
};

export const media = {
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`
};