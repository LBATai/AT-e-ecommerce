import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MainContainer,
  CartItem,
  ItemDetails,
  ItemImage,
  ItemName,
  ItemPrice,
  QuantityContainer,
  RemoveButton,
  CheckoutContainer,
  TotalPrice,
  CheckoutButton,
  EmptyCartMessage,
  QuantityButton,
  ItemActions,
} from './style';

const CartPage = () => {
  const navigate = useNavigate();

  // Dữ liệu mẫu
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Product 1',
      price: 300000,
      quantity: 1,
      image: '/src/assets/images/product1.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 450000,
      quantity: 2,
      image: '/src/assets/images/product2.jpg',
    },
  ]);

  // Xóa sản phẩm khỏi giỏ hàng
  const handleRemove = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Tăng số lượng sản phẩm
  const handleIncreaseQuantity = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // Giảm số lượng sản phẩm
  const handleDecreaseQuantity = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  // Tính tổng tiền
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <MainContainer>
      {cartItems.length === 0 ? (
        <EmptyCartMessage>Giỏ hàng của bạn đang trống</EmptyCartMessage>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem key={item.id}>
              <ItemImage src={item.image} alt={item.name} />
              <ItemDetails>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>{item.price.toLocaleString()} VND</ItemPrice>
                <ItemActions>
                  <QuantityContainer>
                    <QuantityButton onClick={() => handleDecreaseQuantity(item.id)}>-</QuantityButton>
                    {item.quantity}
                    <QuantityButton onClick={() => handleIncreaseQuantity(item.id)}>+</QuantityButton>
                  </QuantityContainer>
                  <RemoveButton onClick={() => handleRemove(item.id)}>Xóa</RemoveButton>
                </ItemActions>
              </ItemDetails>
            </CartItem>
          ))}

          <CheckoutContainer>
            <TotalPrice>Tổng cộng: {getTotalPrice().toLocaleString()} VND</TotalPrice>
            <CheckoutButton onClick={() => navigate('/checkout')}>Tiến hành thanh toán</CheckoutButton>
          </CheckoutContainer>
        </>
      )}
    </MainContainer>
  );
};

export default CartPage;
