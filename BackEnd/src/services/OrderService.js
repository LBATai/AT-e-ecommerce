const Order = require("../models/OrderProduct")
const bcrypt = require("bcrypt")

// User Service
const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, name, address, phone, paymentMethod, totalPrice ,shippingPrice, itemsPrice, user} = newOrder
        try {
            const createNewOrder = await Order.create({
                orderItems,
                shippingAddress: {
                    name,
                    address,
                    phone,
                },
                paymentMethod,
                totalPrice,
                shippingPrice,
                itemsPrice,
                user: user
            })    
            if (createNewOrder){
                resolve({
                    status: 'success',
                    message: 'Order created successfully',
                    data: createNewOrder
                })
            }
            } catch (e) {
                console.log('err message:', e.message); // Thông báo lỗi
                console.log('err stack:', e.stack); // Vị trí stack trace
                reject(e);
            }
        })
}
const getAllOrder = async (userId) => {
  try {
    let orders;
    if (userId) {
      // Lọc đơn hàng theo trường 'user' với giá trị userId
      orders = await Order.find({ user: userId });
    } else {
      orders = await Order.find(); // Nếu không có userId, lấy tất cả đơn hàng
    }

    return {
      status: 'OK',
      message: 'Get orders successful',
      data: orders,
    };
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Error occurred while fetching orders');
  }
};

const deleteOrder = (id) => {
  return new Promise(async (resolve, reject) => {
      try {
          const checkOrder = await Order.findOne({
              _id: id,
          })
          console.log('checkOrder', checkOrder)
          if(checkOrder === null){
              resolve({
                  status: 'OK',
                  message: 'The order not found',
              })
          }
          await Order.findByIdAndDelete(id)
          resolve({
              status: 'OK',
              message: 'Delete order is successful',
          })

          } catch (e) {
              reject(e);
              console.log(e);
          }
      })
}
const getDetailOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findOne({
                _id: id,
            })
            if(order === null){
                resolve({
                    status: 'OK',
                    message: 'Get  details order not found',
                })
            }
            resolve({
                status: 'OK',
                message: 'Get details order successfully',
                data: order
            })

        } catch (e) {
                reject(e);
                console.log(e);
            }
        })
}
module.exports = {
    createOrder,
    getAllOrder,
    deleteOrder,
    getDetailOrder
}