import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderItems: [],
  shippingAddress: {},
  paymentMethod: '',
  totalPrice: 0,
  createdAt: '',
  isPaid: false,
  paidAt: '',
  deliveredAt: '',
  isDelivered: false,
  itemPrice: 0,
  shippingPrice: 0,
  user: '',
  stock: {}, // Thêm stock để lưu trữ số lượng sản phẩm còn lại
};

const orderSlide = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      const { orderItem } = action.payload;
      const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product);
      if (itemOrder) {
        itemOrder.amount += orderItem?.amount;
      } else {
        state.orderItems.push(orderItem);
      }
    },
    removeOrderProduct: (state, action) => {
      const { idProduct } = action.payload;
      state.orderItems = state.orderItems.filter((item) => item.product !== idProduct);
    },
    increaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItems.find((item) => item?.product === idProduct);
      itemOrder.amount++;
    },
    decreaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItems.find((item) => item?.product === idProduct);
      itemOrder.amount--;
    },
    removeOrderAllProduct: (state, action) => {
      const { idProducts } = action.payload;
      state.orderItems = state.orderItems.filter((item) => !idProducts.includes(item.product));
    },
    removePaidProducts: (state, action) => {
      const { selectedItemIds } = action.payload || [];
      state.orderItems = state.orderItems.filter((item) => !selectedItemIds.includes(item.product));
    },
    markProductsAsPaid: (state, action) => {
      const { selectedItemIds } = action.payload || [];
      state.orderItems = state.orderItems.map((item) =>
        selectedItemIds.includes(item.product) ? { ...item, isPaid: true } : item
      );
    },
    updateStock: (state, action) => {
      const { productId, color, size, quantity, increase } = action.payload;
      const stockKey = `${productId}-${color}-${size}`;
      if (!state.stock[stockKey]) {
        state.stock[stockKey] = 0;
      }
      if (increase) {
        state.stock[stockKey] += quantity;
      } else {
        state.stock[stockKey] -= quantity;
      }
    },
  },
});

export const {
  addOrderProduct,
  removeOrderProduct,
  increaseAmount,
  decreaseAmount,
  removeOrderAllProduct,
  removePaidProducts,
  markProductsAsPaid,
  updateStock,
} = orderSlide.actions;

export default orderSlide.reducer;