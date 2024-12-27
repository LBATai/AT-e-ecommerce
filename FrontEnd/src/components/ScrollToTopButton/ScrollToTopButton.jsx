import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Check scroll position to show/hide button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Scroll to top"
      className={`
        fixed bottom-6 right-24 
        w-14 h-14 
        bg-gradient-to-r from-blue-600 to-blue-700
        text-white 
        rounded-full 
        flex justify-center items-center 
        shadow-lg
        transition-all duration-500 ease-in-out
        hover:shadow-blue-400/50 hover:scale-110
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
        ${isHovered ? 'bg-gradient-to-r from-blue-700 to-blue-800' : ''}
      `}
    >
      <div className={`
        transform transition-transform duration-300
        ${isHovered ? '-translate-y-1' : 'translate-y-0'}
      `}>
        <ArrowUp className={`
          w-6 h-6
          transition-all duration-300
          ${isHovered ? 'animate-bounce' : ''}
        `} />
      </div>
      
      {/* Ripple effect background */}
      <div className={`
        absolute inset-0 
        rounded-full
        bg-blue-600
        animate-ping
        opacity-20
      `} />
      
      {/* Glow effect */}
      <div className={`
        absolute -inset-1
        bg-gradient-to-r from-blue-600 to-blue-400
        rounded-full
        opacity-0
        transition-opacity duration-300
        ${isHovered ? 'opacity-20 animate-pulse' : ''}
      `} />
    </button>
  );
};

export default ScrollToTopButton;