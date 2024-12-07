import React from 'react';

const DisableCopy = ({ children }) => {
  // React.useEffect(() => {
  //   const handleContextMenu = (event) => event.preventDefault();
  //   document.addEventListener('contextmenu', handleContextMenu);

  //   const handleSelectStart = (event) => event.preventDefault();
  //   document.addEventListener('selectstart', handleSelectStart);

  //   const handleCopy = (event) => event.preventDefault();
  //   document.addEventListener('copy', handleCopy);

  //   return () => {
  //     document.removeEventListener('contextmenu', handleContextMenu);
  //     document.removeEventListener('selectstart', handleSelectStart);
  //     document.removeEventListener('copy', handleCopy);
  //   };
  // }, []);

  return <div style={{ userSelect: 'none' }}>{children}</div>;
};

export default DisableCopy;
