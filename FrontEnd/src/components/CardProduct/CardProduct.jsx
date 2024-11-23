import { useState, useRef, useEffect } from 'react';
import { Card, Rate } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {
  CardContainer,
  Image,
  Content,
  Title,
  Description,
  Price,
  DiscountedPrice, // Thêm để hiển thị giá sau giảm giá
  Rating,
  HoverActions,
  ActionButton,
  PriceaAndRate,
  DiscountTag,
  Name
} from './style';

const CardProduct = (props) => {
  const navigate = useNavigate();

  const { countInStock, description, image, name, price, rating, type, selled, discount } = props;
  const [isHovered, setIsHovered] = useState(false);
  const addToCartRef = useRef(null);
  const viewDetailsRef = useRef(null);
  const discountedPrice = price - (price * discount / 100);
  useEffect(() => {
    if (isHovered) {
      moveButton(addToCartRef.current);
      moveButton(viewDetailsRef.current);
    }
  }, [isHovered]);

  const moveButton = (button) => {
    let position = 100; // Bắt đầu từ 100% bên phải
    const animate = () => {
      if (position <= 0) return; // Kết thúc khi tới vị trí gốc
      position -= 8; // Điều chỉnh tốc độ di chuyển
      button.style.transform = `translateX(${position}%)`;
      requestAnimationFrame(animate);
    };
    animate();
  };

  const handleViewDetails = () => {
    navigate('/product-detail'); // Chuyển hướng đến trang product
  };

  return (
    <CardContainer
      style={{
        outline: isHovered ? '4px solid #989696' : 'none', padding: 0, margin: 0
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card hoverable cover={<Image alt={name} src={image} />}>
        <Content>
          <Name>
            <Title
              style={{
                color: isHovered ? '#f70000' : '#000',
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {name}
              {discount && <DiscountTag>{discount}%</DiscountTag>}
            </Title>
            <Description>{description}</Description>
          </Name>
          <PriceaAndRate>
            <div>
              <Price className="original-price">{price} đ</Price> {/* Giá hiện tại */}
              {discount && price && (
                <DiscountedPrice>{discountedPrice} đ</DiscountedPrice> // Hiển thị giá sau giảm giá
              )}
            </div>
            <Rating>
              <Rate 
                disabled 
                defaultValue={rating} 
                character={<StarOutlined />} 
              />
            </Rating>
          </PriceaAndRate>
          {isHovered && (
            <HoverActions>
              <ActionButton ref={addToCartRef}>Thêm vào giỏ hàng</ActionButton>
              <ActionButton ref={viewDetailsRef} onClick={handleViewDetails}>Chi tiết sản phẩm</ActionButton>
            </HoverActions>
          )}
        </Content>
      </Card>
    </CardContainer>
  );
};

export default CardProduct;
