import styled from 'styled-components';

export const WrapperFooter = styled.div`
  background-color: #f5f5f5;
  padding: 40px 150px;
  border-top: 1px solid #d9d9d9;
  margin-top: auto; /* Đảm bảo footer luôn ở dưới cùng */
  @media (max-width: 768px) {
    padding: 20px 20px;
  }
`;

// Footer Section
export const WrapperFooterSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    display: none; /* Ẩn các phần tử khi ở chế độ mobile */
  }
`;

// Footer Title
export const WrapperFooterTitle = styled.h3`
  font-size: 18px;
  color: #074398;
  margin-bottom: 16px;
  font-weight: 600;
`;

// Footer Text
export const WrapperFooterText = styled.p`
  font-size: 14px;
  color: #333;
  margin: 4px 0;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #074398;
  }
`;

// Social Media Icon
export const SocialIcon = styled.div`
  display: flex;
  gap: 10px;
  
  @media (max-width: 768px) {
    justify-content: center;
    margin-bottom: 10px;
  }
`;

// Hamburger Menu for Footer (Mobile version)
export const HamburgerMenuFooter = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  height: 20px;
  width: 25px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex; /* Hiển thị hamburger chỉ khi thu nhỏ màn hình */
  }
`;

export const HamburgerLineFooter = styled.div`
  height: 4px;
  background-color: #074398;
  border-radius: 2px;
  width: 100%;
`;

export const FooterMenuDropdown = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  background-color: #f5f5f5;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #d9d9d9;
  z-index: 1000;
  color: #333;

  & > div {
    margin-bottom: 10px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;
