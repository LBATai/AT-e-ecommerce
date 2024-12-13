import React from 'react';
import { Select, Button, Row, Col, Space } from 'antd';
import { TagOutlined, RocketOutlined, FireOutlined, LinkOutlined } from '@ant-design/icons';
import { FilterWrapper } from './style';

const { Option } = Select;

const ProductFilter = ({ onSortChange, onSortByDate }) => {
  // Hàm thay đổi thứ tự sắp xếp
  const handleSortChange = (value) => {
    onSortChange(value); // Gửi giá trị sắp xếp về Homepage
    window.scrollTo({ top: 430, behavior: 'smooth' });
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
              <Button icon={<TagOutlined />}>Giảm giá</Button>
              <Button icon={<RocketOutlined />}>Freeship</Button>
              <Button icon={<FireOutlined />}>Bán chạy</Button>
              <Button icon={<LinkOutlined />} onClick={onSortByDate}>Mới nhất</Button>
            </Space>
          </Space>
        </Col>
      </Row>
    </FilterWrapper>
  );
};

export default ProductFilter;
