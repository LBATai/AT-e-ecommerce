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
  DiscountedPrice,
  Rating,
  HoverActions,
  ActionButton,
  PriceaAndRate,
  DiscountTag,
  Name,
} from './style';
import { formatCurrencyVND } from '../../utils'

const CardProduct = (props) => {
  const navigate = useNavigate();
  const { description, images, name, price, rating, discount, id, type } = props;
  const [isHovered, setIsHovered] = useState(false);
  const similarProduct = useRef(null);
  const viewDetailsRef = useRef(null);
  const discountedPrice = price - (price * discount) / 100;
  const resetButtonPosition = () => {
    if (similarProduct.current) similarProduct.current.style.transform = 'translateX(100%)';
    if (viewDetailsRef.current) viewDetailsRef.current.style.transform = 'translateX(100%)';
  };

  const animateButton = (button, direction) => {
    let position = direction === 'in' ? 100 : 0;
    const step = direction === 'in' ? -5 : 5;

    const animate = () => {
      position += step;
      button.style.transform = `translateX(${position}%)`;

      if ((direction === 'in' && position > 0) || (direction === 'out' && position < 100)) {
        requestAnimationFrame(animate);
      }
    };
    animate();
  };

  useEffect(() => {
    if (isHovered) {
      animateButton(similarProduct.current, 'in');
      animateButton(viewDetailsRef.current, 'in');
    } else {
      animateButton(similarProduct.current, 'out');
      animateButton(viewDetailsRef.current, 'out');
    }
  }, [isHovered]);

  return (
    <CardContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        resetButtonPosition();
      }}
    >{/* Lấy giá trị đầu tiên của mảng images để hiển thị */}
      <Card cover={<Image alt={name} src={images[0]} />}>
        {discount > 0 && <DiscountTag>{discount}%</DiscountTag>}
        <Content>
          <Name>
            <Title style={{ color: isHovered ? '#f70000' : '#000' }}>
              {name}
            </Title>
          </Name>
          <Description>{description}</Description>
          <PriceaAndRate>
            <div>
              <Price discount={discount}>{formatCurrencyVND(price)}</Price>
              {discount > 0 ? (
                <DiscountedPrice>{formatCurrencyVND(discountedPrice)}</DiscountedPrice>
              ) : (
                <DiscountedPrice style={{ visibility: 'hidden' }} /> // Ẩn discountedPrice nếu discount = 0
              )}
            </div>
            <Rating>
              <Rate disabled defaultValue={rating} character={<StarOutlined />} />
            </Rating>
          </PriceaAndRate>
        </Content>
      </Card>
      <HoverActions>
        <ActionButton ref={similarProduct}
            onClick={() => {
            navigate(`/type/${type}`);
          }}
          >Sản phẩm tương tự</ActionButton>
        <ActionButton ref={viewDetailsRef}
          onClick={() => {
            navigate(`/product-detail/${id}`);
          }}>
          Chi tiết sản phẩm
        </ActionButton>
      </HoverActions>
    </CardContainer>
  );
};

export default CardProduct;
