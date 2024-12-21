import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [], // Danh sách sản phẩm
    search: '',
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // Action cập nhật số lượng sản phẩm trong Redux
        updateStock: (state, action) => {
          const { productId, color, size, quantity } = action.payload;
          const product = state.products.find(p => p.id === productId);
        
          if (product) {
            // Giảm tổng số lượng hàng trong kho
            product.countAllInStock -= quantity;
        
            if (color && size) {
              // Tìm tùy chọn màu sắc trong danh sách options
              const option = product.options.find(opt => opt.color === color);
        
              if (option) {
                // Tìm tùy chọn kích thước trong màu sắc đã chọn
                const sizeOption = option.sizes.find(s => s.size === size);
        
                if (sizeOption) {
                  // Giảm số lượng theo size
                  sizeOption.countInStock -= quantity;
                } else {
                  console.log(`Kích thước ${size} không tìm thấy cho màu ${color}`);
                }
              } else {
                console.log(`Màu ${color} không tìm thấy trong sản phẩm`);
              }
            } else {
              // Nếu không có màu sắc hoặc kích thước, chỉ giảm tổng số lượng hàng
              console.log('Chưa chọn màu sắc hoặc kích thước');
            }
          } else {
            console.log(`Sản phẩm với ID ${productId} không tìm thấy`);
          }
        },
        
        // Thêm sản phẩm vào state Redux khi tải về từ server
        addProduct: (state, action) => {
            state.products.push(action.payload);
        },
        searchProduct: (state, action) => {
            state.search = action.payload
        },
    },
});

export const { updateStock, addProduct, searchProduct } = productSlice.actions;
export default productSlice.reducer;
