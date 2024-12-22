import React from 'react';

const Pending = ({ isPending, children, delay = 10 }) => {
  return (
    <>
      {isPending ? (
        <div className="flex items-center justify-center h-fit">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default Pending;
