import {createSlice} from '@reduxjs/toolkit'
const initialState = {
    orderItems: [],
    shippingAddress: {
    },
    paymentMethod: '',
    totalPrice: 0,
    createdAt: '',
    isPaid: false,
    paidAt: '',
    deliveredAt: '',
    isDelivered: false,
    itemPrice: 0,
    shippingPrice: 0,
    user: ''
}

export const orderSlide = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
           const {orderItem} = action.payload;
           const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product)
           if (itemOrder) {
            itemOrder.amount +=orderItem?.amount
           } else {
            state.orderItems.push(orderItem) 
           }
        },
        increaseAmount: (state, action) => {
            const {idProduct} = action.payload
            const itemOrder = state?.orderItems.find((item) => item?.product === idProduct)
            itemOrder.amount ++
        },
        decreaseAmount: (state, action) => {
            const {idProduct} = action.payload
            const itemOrder = state?.orderItems.find((item) => item?.product === idProduct)
            itemOrder.amount --
        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload;
            state.orderItems = state.orderItems.filter(
              (item) => item.product !== idProduct
            );
        },
        removeOrderAllProduct: (state, action) => {
            const { idProducts } = action.payload; // Nhận danh sách ID sản phẩm cần xóa
            state.orderItems = state.orderItems.filter(
                (item) => !idProducts.includes(item.product) // Giữ lại những sản phẩm không có trong danh sách idProducts
            );
        },
        markProductsAsPaid: (state, action) => {
            const { selectedItemIds } = action.payload || [];
            // console.log("Marking as Paid - Selected IDs:", selectedItemIds);
            state.orderItems = state.orderItems.map(item =>
                selectedItemIds.includes(item.product) ? { ...item, isPaid: true } : item
            );
        },
        removePaidProducts: (state, action) => {
            const { selectedItemIds } = action.payload || [];
            // console.log("Removing Paid Products - Selected IDs:", selectedItemIds);
            state.orderItems = state.orderItems.filter(item => !selectedItemIds.includes(item.product));
        },
        
        
    },
})

export const { 
    addOrderProduct, 
    removeOrderProduct, 
    increaseAmount, 
    decreaseAmount, 
    removeOrderAllProduct ,
    removePaidProducts,
    markProductsAsPaid,
} = orderSlide.actions

export default orderSlide.reducer