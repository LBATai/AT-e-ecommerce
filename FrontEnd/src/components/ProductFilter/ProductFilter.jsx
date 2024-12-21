// ProductFilter.jsx
import React, { useState } from 'react';
import { Select, Button, Row, Col, Space, Input } from 'antd';
import { TagOutlined, RocketOutlined, FireOutlined, LinkOutlined } from '@ant-design/icons';
import { FilterWrapper } from './style';
import { useDispatch } from 'react-redux';
import { searchProduct } from '../redux/Slide/productSlide.js';

const { Option } = Select;

const ProductFilter = ({ onSortChange, onSortByDate, onSearch }) => {
  const [searchValue, setSearchValue] = useState(''); // chỉ cần một state cho input
  const dispatch = useDispatch();

  const handleSortChange = (value) => {
    onSortChange(value); 
    window.scrollTo({ top: 430, behavior: 'smooth' });
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value); // cập nhật giá trị vào searchValue
    dispatch(searchProduct(e.target.value)); // dispatch giá trị mới
  };

  return (
    <FilterWrapper>
      <Row gutter={[16, 16]}>
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
            <Space size="middle">
              <Button icon={<span role="img" aria-label="best-seller">🏆</span>}>Bán chạy</Button>
              <Button icon={<span role="img" aria-label="newest">🆕</span>} onClick={onSortByDate}>Mới nhất</Button>
              {/* <Button icon={<span role="img" aria-label="freeship">🚚</span>}>Freeship</Button> */}
              <Button icon={<span role="img" aria-label="discount">🔥</span>}>Giảm giá</Button>
            </Space>
            <Space size="middle">
              <Input
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Nhập tên sản phẩm"
                enterButton="Tìm"
                size="large"
                style={{
                  width: "100%",
                }}
              />
            </Space>
          </Space>
        </Col>
      </Row>
    </FilterWrapper>
  );
};

export default ProductFilter;
