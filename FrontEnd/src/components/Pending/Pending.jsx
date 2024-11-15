import React from 'react';
import { Spin } from 'antd';

const Pending = ({ isPending, children, delay = 200 }) => {
  return (
    <Spin spinning={isPending} delay={delay}>
        {children}
    </Spin>
  );
};

export default Pending;
