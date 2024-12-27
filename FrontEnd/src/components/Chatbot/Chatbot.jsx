import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Trash2, X, Bot } from "lucide-react";
import run from "./apiChatBot";

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

  const clearChat = () => {
    setMessages([{ sender: "bot", text: "Xin chào! Tôi là AT. Tôi có thể giúp gì cho bạn? 🎄🎄🎄" }]);
    setShowSuggestions(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

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
    setShowSuggestions(false);
    setIsTyping(true);

    try {
      const response = await run(userMessage.text); // Calling the API
      const botMessage = { 
        sender: "bot", 
        text: response, 
        timestamp: new Date() 
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsActive(true);
    } catch (error) {
      console.error("API Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Xin lỗi, tôi không thể trả lời ngay bây giờ.", timestamp: new Date() },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestions = [
    "Các loại sản phẩm đặc trưng của shop",
    "Các sản phẩm bán chạy của shop"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isChatOpen && (
        <div className="absolute bottom-20 right-0 w-96 bg-white rounded-2xl shadow-2xl transform transition-all duration-300 ease-in-out animate-slideUp">
          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl">
            <div className="flex items-center space-x-2">
              <Bot className="text-white w-6 h-6" />
              <h2 className="text-lg font-semibold text-white">AT Chatbot</h2>
              {isActive && (
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"/>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={clearChat} 
                className="p-2 hover:bg-blue-700 rounded-full transition-colors"
                aria-label="Clear chat"
              >
                <Trash2 className="w-5 h-5 text-white" />
              </button>
              <button 
                onClick={closeChat} 
                className="p-2 hover:bg-blue-700 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={chatContentRef} className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}>
                <div 
                  className={`max-w-[80%] ${
                    msg.sender === "user" 
                      ? "bg-blue-600 text-white rounded-br-sm" 
                      : "bg-white rounded-bl-sm"
                  } p-3 rounded-2xl shadow-md transition-all duration-200 hover:shadow-lg`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p>
                  <span className={`text-xs ${
                    msg.sender === "user" ? "text-blue-100" : "text-gray-400"
                  } mt-1 inline-block`}>
                    {msg.timestamp ? formatTimestamp(msg.timestamp) : formatTimestamp(new Date())}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start animate-fadeIn">
                <div className="bg-white p-3 rounded-2xl shadow-md">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              </div>
            )}

            {showSuggestions && (
              <div className="space-y-2 mt-4 animate-fadeIn">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => handleSendMessage(suggestion)}
                    className="cursor-pointer bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:bg-gray-50"
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white rounded-b-2xl border-t border-gray-100">
            <div className="relative">
              <textarea
                placeholder="Nhập tin nhắn..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full rounded-xl p-3 pr-12 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 resize-none"
                rows="1"
              />
              <button
                onClick={() => handleSendMessage()}
                className="absolute right-2 bottom-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className={`p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 ${isChatOpen ? 'rotate-180' : ''}`}
        aria-label="Toggle chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ChatBot;