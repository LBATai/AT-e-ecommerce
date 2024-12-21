import styled from 'styled-components';

export const ChatContainer = styled.div`
  background-color: white;
  width: 420px;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const TypingIndicator = styled.span`
  display: inline-block;
  width: 30px;
  height: 10px;
  font-size: 30px;
  background-color: #6B7280;
  border-radius: 5px;
  animation: blink 1s infinite;

  @keyframes blink {
    0%, 100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }
`;

export const ChatHeader = styled.div`
  position: relative; /* Để sử dụng position tuyệt đối cho các phần tử con */
  display: flex;
  align-items: center;
  justify-content: center; /* Căn giữa h2 theo trục ngang */
  color: #000;
  height: 50px;
  width: 100%;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);

  /* Đảm bảo rằng các phần tử con sẽ căn giữa và menu được đặt ở góc phải */
  & > h2 {
    margin: 0;
  }

  /* Sử dụng absolute để đặt menu ở góc phải */
  .ant-dropdown-trigger {
    position: absolute;
    right: 10px; /* Điều chỉnh khoảng cách từ cạnh phải */
  }
`;


export const IconWrapper = styled.div`
  position: absolute;
  left: 16px; /* Đặt icon sát mép trái với khoảng cách 16px */
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color:rgb(237, 237, 237);
  }
`;



export const ChatContent = styled.div`
  flex-grow: 1;
  padding: 16px;
  overflow-y: auto;
  scroll-behavior: smooth;
`;

export const MessageContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
  justify-content: ${(props) => (props.sender === 'user' ? 'flex-end' : 'flex-start')};
`;
export const MessageBubble = styled.div`
  max-width: 70%;
  margin: 5px 0;
  padding: 10px 15px;
  border-radius: 15px;
  font-size: 14px;
  word-wrap: break-word;
  box-sizing: border-box;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15); /* Thêm box-shadow */
  position: relative; /* Để định vị thời gian */

  /* Áp dụng màu nền và màu chữ dựa trên sender */
  background-color: ${(props) => (props.sender === "bot" ? "#FFFFFF" : "#007BFF")};
  color: ${(props) => (props.sender === "bot" ? "#000000" : "#FFFFFF")};
  align-self: ${(props) => (props.sender === "bot" ? "flex-start" : "flex-end")};

  /* Thời gian chỉ hiển thị khi hover */
  &:hover::after {
    opacity: 1;
  }

  /* Thời gian nằm bên trái cho bot và bên phải cho user */
  &::after {
    content: attr(data-time); /* Lấy thời gian từ thuộc tính data-time */
    position: absolute;
    top: -18px;
    left: ${(props) => (props.sender === "bot" ? "10px" : "auto")};
    right: ${(props) => (props.sender === "user" ? "10px" : "auto")};
    font-size: 12px;
    color: #888;
    opacity: 0; /* Ẩn thời gian ban đầu */
    transition: opacity 0.3s; /* Thêm hiệu ứng chuyển tiếp */
  }
`;

export const ChatInputContainer = styled.div`
  padding: 16px;
  background-color: white;
  display: flex;
`;

export const ChatInput = styled.textarea`
  width: 100%; /* Chiều rộng 60% */
  max-width: 400px; /* Chiều rộng tối đa */
  height: 40px; /* Chiều cao ban đầu */
  max-height: 70px; /* Chiều cao tối đa là 70px */
  overflow: hidden; /* Tắt thanh cuộn */
  resize: none; /* Không cho phép thay đổi kích thước */
  padding: 10px 8px; /* Khoảng cách giữa nội dung và viền */
  border: 1px solid #E5E7EB;
  border-radius: 8px 0 0 8px;
  outline: none;
  box-sizing: border-box;
  white-space: pre-wrap; /* Cho phép xuống dòng tự động và giữ khoảng trắng */
  word-wrap: break-word; /* Tự động xuống dòng khi từ dài */
  padding-right: 80px; /* Khoảng cách từ ký tự cuối đến viền phải */
  &:focus {
    border-color: #1E40AF;
  }
`;



export const SendButton = styled.button`
  background-color: #1E40AF;
  color: white;
  padding: 8px 16px;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  &:hover {
    background-color: #1D4ED8;
  }
`;
export const BoxChat = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: #1890ff;
  color: #fff;
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 9999;
`;
export const SuggestionItem = styled.div`
  cursor: pointer;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  width: 80%;
  text-align: center;
  transition: background-color 0.1s ease, transform 0.1s ease;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
`;
