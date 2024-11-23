import React from 'react';
import { Spin } from 'antd';

const Pending = ({ isPending, children, delay = 10 }) => {
  return (
    <Spin spinning={isPending} delay={delay}>
        {children}
    </Spin>
  );
};

export default Pending;
