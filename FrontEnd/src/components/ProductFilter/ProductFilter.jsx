// File: ProductFilter.jsx
import React, { useState } from 'react';
import { Select, Button, Row, Col, Space } from 'antd';
import { UpOutlined, DownOutlined, TagOutlined, RocketOutlined, FireOutlined, LinkOutlined } from '@ant-design/icons';
import { FilterWrapper, IconDisplayWrapper } from './style';

const { Option } = Select;

const ProductFilter = () => {
  const [sortOrder, setSortOrder] = useState('asc'); // Để sắp xếp
  const [activeFilter, setActiveFilter] = useState(''); // Bộ lọc đang hoạt động

  // Hàm thay đổi thứ tự sắp xếp
  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  // Hàm thay đổi bộ lọc
  const handleFilterChange = (filterType) => {
    setActiveFilter(filterType);
  };

  return (
    <FilterWrapper>
      <Row gutter={[16, 16]}>
        {/* Phần sắp xếp giá */}
        <Col span={24}>
          <Space size="large">
            <Select
              defaultValue="asc"
              style={{ width: 160 }}
              onChange={handleSortChange}
            >
              <Option value="asc">Giá: Tăng dần</Option>
              <Option value="desc">Giá: Giảm dần</Option>
            </Select>

            {/* Các nút bộ lọc sản phẩm */}
            <Space size="middle">
              <Button icon={<TagOutlined />} onClick={() => handleFilterChange('sale')}>Giảm giá</Button>
              <Button icon={<RocketOutlined />} onClick={() => handleFilterChange('freeship')}>Freeship</Button>
              <Button icon={<FireOutlined />} onClick={() => handleFilterChange('bestseller')}>Bán chạy</Button>
              <Button icon={<LinkOutlined />} onClick={() => handleFilterChange('newest')}>Mới nhất</Button>
            </Space>
          </Space>
        </Col>

        {/* Hiển thị bộ lọc đang chọn */}
        <Col span={24}>
          <IconDisplayWrapper>
            {activeFilter && <span>{activeFilter} được chọn</span>}
          </IconDisplayWrapper>
        </Col>
      </Row>
    </FilterWrapper>
  );
};

export default ProductFilter;
