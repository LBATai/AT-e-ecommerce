import { WrapperNavbar, PriceRange, Star, WrapperCheckBox, TypeProduct, SexProduct } from './style';
import { Input, Button, Checkbox, Row, Col, Select, Typography } from 'antd';
import { useEffect, useState } from 'react';
import * as ProductService from '../../Service/ProductService';
import { useNavigate } from 'react-router';

const Navbar = () => {
  const navigate = useNavigate();

  const [type, setType] = useState([]); // State để lưu danh sách loại sản phẩm
  const [sex, setSex] = useState([]); // State để lưu danh sách loại sản phẩm
  const [priceFrom, setPriceFrom] = useState(''); // State lưu giá "Từ"
  const [priceTo, setPriceTo] = useState(''); // State lưu giá "Đến"
  const starRows = [5, 4, 3, 2, 1];

  useEffect(() => {
    const fetchData = async () => {
      await fetchType();
      await fetchSex();
    };
    fetchData();
  }, []);
  // Hàm lấy các loại sản phẩm từ API
  const fetchType = async () => {
    try {
      const response = await ProductService.getAllType(); // API lấy danh sách loại sản phẩm
      setType(response.data); // Cập nhật danh sách loại sản phẩm
    } catch (error) {
      console.error('Error fetching types:', error);
    }
  };
  const fetchSex = async () => {
    try {
      const response = await ProductService.getAllSex(); // API lấy danh sách loại sản phẩm
      setSex(response.data); // Cập nhật danh sách loại sản phẩm
    } catch (error) {
      console.error('Error fetching sexs:', error);
    }
  };
  const handleTypeClick = async (typeName) => {
    try {
      const products = await ProductService.getAllProduct(null, typeName, null); // Lấy sản phẩm theo type
      // console.log('Danh sách sản phẩm:', products); // Debug danh sách sản phẩm
      navigate(`/type/${typeName}`, { state: { products } }); // Điều hướng tới trang danh mục với danh sách sản phẩm
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSexClick = async (sexName) => {
    try {
      const products = await ProductService.getAllProduct(null, null, sexName); // Lấy sản phẩm theo type
      // console.log('Danh sách sản phẩm:', products); // Debug danh sách sản phẩm
      navigate(`/sex/${sexName}`, { state: { products } }); // Điều hướng tới trang danh mục với danh sách sản phẩm
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const handleApplyPriceRange = () => {
    // Áp dụng khoảng giá khi nhấn nút
    if (priceFrom || priceTo) {
      // Cập nhật lại các sản phẩm theo khoảng giá
      // Đây là nơi bạn sẽ gọi API với giá trị của priceFrom và priceTo
      navigate(`/price-range/${priceFrom}-${priceTo}`);
    }
  };
  const getSexLabel = (sexOption) => {
    switch (sexOption) {
      case 'male':
        return 'Nam';
      case 'female':
        return 'Nữ';
      case 'unisex':
        return 'Unisex';
      default:
        return '';
    }
  };
  return (
    <WrapperNavbar>
      <PriceRange>
        <div style={{ marginBottom: '10px', fontSize: '18px' }}>Khoảng giá</div>
        <Input
          placeholder="đ Từ"
          style={{ width: '100px', marginRight: '15px' }}
          value={priceFrom}
          onChange={(e) => setPriceFrom(e.target.value)} // Lưu giá trị "Từ"
        />
        <span>-</span>
        <Input
          placeholder="đ Đến"
          style={{ width: '100px', marginLeft: '15px' }}
          value={priceTo}
          onChange={(e) => setPriceTo(e.target.value)} // Lưu giá trị "Đến"
        />
        <div>
          <Button
            type="primary"
            style={{ marginTop: '10px', width: '235px' }}
            onClick={handleApplyPriceRange} // Áp dụng khoảng giá
          >
            Áp dụng
          </Button>
        </div>
      </PriceRange>
      <hr style={{ width: '150px', marginTop: '20px' }} />
      
      {/* Hiển thị loại sản phẩm */}
      <div style={{ marginTop: '30px', fontSize: '18px', }}>Danh mục</div>
      <Row >
        {type.map((type, index) => (
          <Col key={index} span={24}> {/* span={24} để chiếm toàn bộ chiều rộng của Row */}
            <TypeProduct onClick={() => handleTypeClick(type)}>
              {type}
            </TypeProduct>
          </Col>
        ))}
      </Row>

      <div style={{ marginTop: '30px', fontSize: '18px', }}>Giới tính</div>
      <Row>
        {sex.map((sexOption, index) => (
          <Col key={index} span={24}>
            <SexProduct onClick={() => handleSexClick(sexOption)}>
              {getSexLabel(sexOption)}
            </SexProduct>
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
    </WrapperNavbar>
  );
};

export default Navbar;
