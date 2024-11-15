import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
  padding: 20px;
`;

export const TitleContainer = styled.h1`
  font-size: 48px;
  color: #4a90e2;
  margin-bottom: 40px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
`;

export const InputBox = styled.input`
  height: 48px;
  font-size: 16px;
  padding: 0 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #4a90e2;
    box-shadow: 0 0 8px rgba(74, 144, 226, 0.3);
  }
`;

export const ErrorLabel = styled.span`
  color: #ff4d4f;
  font-size: 14px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
`;

export const SubmitButton = styled.button`
  background-color: #4a90e2;
  color: white;
  padding: 12px 32px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;

  &:hover {
    background-color: #357ab8;
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
`;

export const LinkText = styled.span`
  color: #4a90e2;
  cursor: pointer;
  font-size: 16px;
  text-decoration: underline;

  &:hover {
    color: #357ab8;
  }
`;
