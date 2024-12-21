import React, { useState, useRef, useEffect } from "react";
import { MessageOutlined, SendOutlined, createFromIconfontCN, MoreOutlined, DeleteOutlined, CloseOutlined } from "@ant-design/icons";
import { Popover, Input, Dropdown, Menu } from "antd";
import run from "./apiChatBot"; // Import hàm run từ file API
import {
  ChatContainer,
  ChatHeader,
  ChatContent,
  MessageContainer,
  MessageBubble,
  TypingIndicator,
  ChatInputContainer,
  ChatInput,
  IconWrapper,
  BoxChat,
  SuggestionItem 
} from "./style";
import { formatTimestamp } from './callApi'

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào! Tôi là AT Chatbot. Tôi có thể giúp gì cho bạn? 🎄🎄🎄" },
  ]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true); // Trạng thái hiển thị các lựa chọn
  const [isActive, setIsActive] = useState(false); // Trạng thái chatbot đang hoạt động

  const chatContentRef = useRef(null);
  const { TextArea } = Input;
  const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
  });

  // Hàm để reset chat
  const clearChat = () => {
    setMessages([{ sender: "bot", text: "Xin chào! Tôi là AT. Tôi có thể giúp gì cho bạn? 🎄🎄🎄" }]);
    setShowSuggestions(true);
  };

  // Hàm để đóng chat bot
  const closeChat = () => {
    setIsChatOpen(false);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<DeleteOutlined />} onClick={clearChat}>
        Clear Chatbot
      </Menu.Item>
      <Menu.Item key="2" icon={<CloseOutlined />} onClick={closeChat}>
        Đóng Chatbot
      </Menu.Item>
    </Menu>
  );

  // Tự động cuộn xuống cuối
  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (message) => {
    const userMessage = { sender: "user", text: message || input, timestamp: new Date() };
    if (!userMessage.text.trim()) return;

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setShowSuggestions(false); // Ẩn gợi ý khi gửi tin nhắn
    setIsTyping(true);

    try {
      const response = await run(userMessage.text); // Gọi API với tin nhắn người dùng
      const botMessage = { sender: "bot", text: response, timestamp: new Date() };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsActive(true); // Khi có phản hồi từ bot, chatbot đang hoạt động
    } catch (error) {
      console.error("Lỗi API:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Xin lỗi, tôi không thể trả lời ngay bây giờ.", timestamp: new Date() },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div>
      <Popover
        content={
          <ChatContainer>
            <ChatHeader>
              <IconWrapper onClick={() => setIsChatOpen(!isChatOpen)}>
                <IconFont type="icon-tuichu" style={{ fontSize: "22px" }} />
              </IconWrapper>
              <h2 className="text-xl font-bold">
                <span
                  style={{
                    position: "relative",
                    display: "inline-block",
                    marginRight: "5px",
                  }}
                >
                  <MessageOutlined style={{ fontSize: "24px" }} />
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "green",
                        border: "2px solid white", // Thêm border màu trắng
                      }}
                    ></span>
                  )}
                </span>
                Chatbot
              </h2>
              <Dropdown overlay={menu} trigger={["click"]}>
                <MoreOutlined style={{ fontSize: "24px", cursor: "pointer" }} />
              </Dropdown>
            </ChatHeader>
            <ChatContent ref={chatContentRef}>
              {messages.map((msg, index) => (
                <MessageContainer key={index} sender={msg.sender}>
                  <MessageBubble sender={msg.sender} data-time={msg.timestamp ? formatTimestamp(msg.timestamp) : formatTimestamp(new Date())}>
                    {msg.text}
                  </MessageBubble>
                </MessageContainer>
              ))}
              {isTyping && (
                <MessageContainer sender="bot">
                  <MessageBubble sender="bot">
                    <TypingIndicator>...</TypingIndicator>
                  </MessageBubble>
                </MessageContainer>
              )}
              {showSuggestions && (
                <div style={{ marginTop: "10px" }}>
                  <SuggestionItem 
                    onClick={() => handleSendMessage("Các loại sản phẩm đặc trưng của shop ")}
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#f0f0f0",
                      padding: "10px",
                      borderRadius: "5px",
                      marginBottom: "5px",
                    }}
                  >
                    Các loại sản phẩm đặc trưng của shop
                  </SuggestionItem>
                  <SuggestionItem 
                    onClick={() => handleSendMessage("Các sản phẩm bán chạy của shop")}
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#f0f0f0",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    Các sản phẩm bán chạy của shop
                  </SuggestionItem>
                </div>
              )}
            </ChatContent>
            <ChatInputContainer>
              <ChatInput
                placeholder="Nhập tin nhắn..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <SendOutlined
                onClick={() => handleSendMessage()}
                style={{ position: "absolute", marginTop: "12px", right: "40px", cursor: "pointer" }}
              />
            </ChatInputContainer>
          </ChatContainer>
        }
        trigger="click"
        timestamp={new Date()}
        open={isChatOpen}
        onOpenChange={(newVisible) => setIsChatOpen(newVisible)}
        placement="topRight"
      >
        <BoxChat onClick={() => setIsChatOpen(!isChatOpen)}>
          <MessageOutlined style={{ fontSize: "24px" }} />
        </BoxChat>
      </Popover>
    </div>
  );
};

export default ChatBot;
