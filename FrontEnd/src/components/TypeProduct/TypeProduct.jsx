import { Col, Row } from 'antd';
import { TypeProductWrapper, CategoryItem } from './style';
import * as ProductService from '../../Service/ProductService';
import { useEffect, useState } from 'react';

const TypeProduct = () => {
  const [categories, setCategories] = useState([]); // State để lưu dữ liệu loại sản phẩm

  const fetchAllTypeProduct = async () => {
    try {
      const res = await ProductService.getAllType();
      return res.data; // Giả định API trả về một mảng dữ liệu trong `data`
    } catch (error) {
      console.error('Error fetching types:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchAllTypeProduct()
      .then((response) => {
        setCategories(response); // Cập nhật state với dữ liệu từ API
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []); // Chỉ chạy một lần khi component được render

  return (
    <TypeProductWrapper>
      <Row justify="center" gutter={[16, 16]}>
        {categories.map((category, index) => (
          <Col key={index}>
            <CategoryItem>{category}</CategoryItem>
          </Col>
        ))}
      </Row>
    </TypeProductWrapper>
  );
};

export default TypeProduct;
