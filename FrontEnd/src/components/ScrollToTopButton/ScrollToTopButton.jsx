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
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '50px',
        height: '50px',
        backgroundColor: '#1890ff', // Màu xanh chủ đạo của Ant Design
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
      }}
    >
      <ArrowUpOutlined style={{ fontSize: '20px' }} />
    </button>
  );
};

export default ScrollToTopButton;
