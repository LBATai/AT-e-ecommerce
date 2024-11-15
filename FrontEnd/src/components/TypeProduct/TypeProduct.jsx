import { Col, Row } from 'antd';
import { TypeProductWrapper, CategoryItem } from './style';

const categories = [
  { id: 1, name: 'TV' },
  { id: 2, name: 'Tủ lạnh' },
  { id: 3, name: 'Máy tính' },
  { id: 4, name: 'Máy tính' },
  { id: 5, name: 'Máy tính' },
  { id: 6, name: 'Máy tính' },
  { id: 7, name: 'Máy tính' },
  // Thêm các danh mục khác nếu cần
];

const TypeProduct = () => {
  return (
    <TypeProductWrapper>
      <Row justify="center" gutter={[16, 16]}>
        {categories.map((category) => (
          <Col key={category.id}>
            <CategoryItem>{category.name}</CategoryItem>
          </Col>
        ))}
      </Row>
    </TypeProductWrapper>
  );
};

export default TypeProduct;
