import { WrapperNavbar, PriceRange, Star, WrapperCheckBox, TypeProduct } from './style';
import { Input, Button, Checkbox, Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import * as ProductService from '../../Service/ProductService';
import { useNavigate } from 'react-router';

const Navbar = () => {
  const navigate = useNavigate();

  const [type, setType] = useState([]); // State để lưu danh sách loại sản phẩm
  const starRows = [5, 4, 3, 2, 1];
  
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  // Hàm lấy các loại sản phẩm từ API
  const fetchType = async () => {
    try {
      const response = await ProductService.getAllType(); // API lấy danh sách loại sản phẩm
      setType(response.data); // Cập nhật danh sách loại sản phẩm
    } catch (error) {
      console.error('Error fetching types:', error);
    }
  };
  const handleTypeClick = async (typeName) => {
    try {
      const products = await ProductService.getAllProduct(null, typeName); // Lấy sản phẩm theo type
      // console.log('Danh sách sản phẩm:', products); // Debug danh sách sản phẩm
      navigate(`/type/${typeName}`, { state: { products } }); // Điều hướng tới trang danh mục với danh sách sản phẩm
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useEffect(() => {
    fetchType(); // Gọi API khi component mount
  }, []);

  return (
    <WrapperNavbar>
      <PriceRange>
        <div style={{ marginBottom: '10px', fontSize: '18px' }}>Khoảng giá</div>
        <Input placeholder="đ Từ" style={{ width: '100px', marginRight: '15px' }} />
        <span>-</span>
        <Input placeholder="đ Đến" style={{ width: '100px', marginLeft: '15px' }} />
        <div>
          <Button type="primary" style={{ marginTop: '10px', width: '235px' }}>
            Áp dụng
          </Button>
        </div>
      </PriceRange>
      <hr style={{ width: '150px', marginTop: '20px' }} />
            {/* Hiển thị loại sản phẩm */}
            <div style={{ marginTop: '30px', fontSize: '18px',}}>Danh mục</div>
      <Row >
        {type.map((type, index) => (
          <Col key={index} span={24}> {/* span={24} để chiếm toàn bộ chiều rộng của Row */}
            <TypeProduct onClick={() => handleTypeClick(type)}>
              {type}
            </TypeProduct>
          </Col>
        ))}
      </Row>
      <div>
        <div style={{ marginBottom: '10px', marginTop: '20px', fontSize: '18px' }}>Đánh giá</div>
        {starRows.map((goldStarCount, rowIndex) => (
          <Star key={rowIndex}>
            {[...Array(5)].map((_, starIndex) => (
              <span
                key={starIndex}
                className="star"
                style={{
                  color: starIndex < goldStarCount ? '#FFD700' : '#FFD700',
                  fontSize: '24px',
                }}
              >
                {starIndex < goldStarCount ? '★' : '☆'}
              </span>
            ))}
          </Star>
        ))}
      </div>
      <hr style={{ width: '150px', marginTop: '20px' }} />
      <WrapperCheckBox>
        <div style={{ marginBottom: '10px', marginTop: '20px', fontSize: '18px' }}>Nơi bán</div>
        <Checkbox onChange={onChange}>Hà Nội</Checkbox>
        <br />
        <Checkbox onChange={onChange}>Đà Nẵng</Checkbox>
        <br />
        <Checkbox onChange={onChange}>TP. Hồ Chí Minh</Checkbox>
        <br />
        <Checkbox onChange={onChange}>Quảng Trị</Checkbox>
        <br />
        <Checkbox onChange={onChange}>Quảng Nam</Checkbox>
        <br />
      </WrapperCheckBox>
    </WrapperNavbar>
  );
};

export default Navbar;
