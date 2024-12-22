import React from 'react';
import { ArrowUpOutlined } from '@ant-design/icons'; // Import icon từ Ant Design

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Cuộn mượt mà
    });
  };

  return (
    <button
    style={{marginRight: '75px', marginBottom: '19px'}}
      onClick={scrollToTop}
      className="fixed bottom-5 right-5 w-12 h-12 bg-blue-600 text-white rounded-full flex justify-center items-center shadow-lg hover:bg-blue-500 transition duration-200 ease-in-out cursor-pointer"
    >
      <ArrowUpOutlined className="text-lg" />
    </button>
  );
};

export default ScrollToTopButton;
