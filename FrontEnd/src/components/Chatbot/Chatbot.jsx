import React, { useState, useRef, useEffect } from "react";
import { MessageOutlined, SendOutlined, createFromIconfontCN, MoreOutlined, DeleteOutlined, CloseOutlined } from "@ant-design/icons";
import { Popover, Input, Dropdown, Menu } from "antd";
import run from "./apiChatBot"; // Import hàm run từ file API
import { formatTimestamp } from './callApi';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào! Tôi là AT Chatbot. Tôi có thể giúp gì cho bạn? 🎄🎄🎄" },
  ]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isActive, setIsActive] = useState(false);

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
          <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full">
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center">
                <IconFont type="icon-tuichu" className="text-xl cursor-pointer" onClick={() => setIsChatOpen(!isChatOpen)} />
                <h2 className="text-xl font-bold ml-2 flex items-center justify-center space-x-2">
                  <MessageOutlined className="text-2xl" />
                  {isActive && (
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white" />
                  )}
                  <span className="items-center">Chatbot</span>
                </h2>
              </div>
              <Dropdown overlay={menu} trigger={["click"]}>
                <MoreOutlined className="text-2xl cursor-pointer" />
              </Dropdown>
            </div>
            <div ref={chatContentRef} className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    style={{
                      boxShadow: msg.sender === "bot" ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "none", // Thêm bóng đổ cho chatbot
                      transition: "all 0.3s ease-in-out", // Hiệu ứng khi di chuyển
                    }}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <span className="text-xs text-gray-500">{msg.timestamp ? formatTimestamp(msg.timestamp) : formatTimestamp(new Date())}</span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-xs p-3 rounded-lg bg-gray-200">
                    <span className="text-xs text-gray-500">...</span>
                  </div>
                </div>
              )}
              {showSuggestions && (
                <div className="space-y-2 mt-4">
                  <div
                    onClick={() => handleSendMessage("Các loại sản phẩm đặc trưng của shop ")}
                    className="cursor-pointer bg-gray-100 p-3 rounded-lg hover:bg-gray-200"
                  >
                    Các loại sản phẩm đặc trưng của shop
                  </div>
                  <div
                    onClick={() => handleSendMessage("Các sản phẩm bán chạy của shop")}
                    className="cursor-pointer bg-gray-100 p-3 rounded-lg hover:bg-gray-200"
                  >
                    Các sản phẩm bán chạy của shop
                  </div>
                </div>
              )}
            </div>
            <div className="relative p-4 border-t">
              <TextArea
                placeholder="Nhập tin nhắn..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full rounded-lg p-2 border-2 border-gray-300"
                rows={2}
              />
              <SendOutlined
                onClick={() => handleSendMessage()}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-xl cursor-pointer"
              />
            </div>
          </div>
        }
        trigger="click"
        open={isChatOpen}
        onOpenChange={(newVisible) => setIsChatOpen(newVisible)}
        placement="topRight"
      >
        <div
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="fixed bottom-10 right-10 p-3 bg-blue-500 text-white rounded-full cursor-pointer shadow-lg"
        >
          <MessageOutlined className="text-2xl" />
        </div>
      </Popover>
    </div>
  );
};

export default ChatBot;
