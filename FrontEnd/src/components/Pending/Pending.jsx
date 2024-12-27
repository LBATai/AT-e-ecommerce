import React from 'react';
import './Pending.css';

const Pending = ({ isPending, children }) => {
  if (isPending) {
    return (
      <div className="pending-overlay">
        <div className="pending-content flex items-center justify-center"> {/* Thêm class flex */}
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        </div>
      </div>
    );
  }
  return children;
};

export default Pending;