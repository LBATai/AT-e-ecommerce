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
import image from '../../assets/images/Shoes/Ridge Grey Leather Ankle Boots.jpg';

const CardProduct = () => {
  const [isHovered, setIsHovered] = useState(false);
  const addToCartRef = useRef(null);
  const viewDetailsRef = useRef(null);

  const product = {
    name: 'Shoe new',
    price: '799.000',
    discountedPrice: '639.200', // Giá sau giảm giá
    rating: 4,
    image: image,
    description: 'Smart TV with a 4K resolution that provides stunning visuals, vibrant colors, and enhanced contrast. Perfect for watching movies, playing games, and much more in high quality.',
    discount: '20%', // Thông tin giảm giá
  };

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
  const navigate = useNavigate();
  const handleViewDetails = () => {
    navigate('/product-detail'); // Chuyển hướng đến trang product
  };

  return (
    <CardContainer
      style={{
        outline: isHovered ? '4px solid #989696' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card hoverable cover={<Image alt={product.name} src={product.image} />}>
        <Content>
          <Name>
            <Title
                    style={{
                      color: isHovered ? '#f70000' : '#000',
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
            >
              {product.name}
              <DiscountTag>{product.discount}</DiscountTag>
            </Title>
            <Description>{product.description}</Description>
          </Name>
          <PriceaAndRate>
            <div>
              <Price className="original-price">{product.price} đ</Price> {/* Giá hiện tại */}
              <DiscountedPrice>{product.discountedPrice} đ</DiscountedPrice> {/* Giá sau giảm giá */}
            </div>
            <Rating>
              <Rate 
                disabled 
                defaultValue={product.rating} 
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
