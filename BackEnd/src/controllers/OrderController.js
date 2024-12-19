const Order = require("../models/OrderProduct");
const JwtService = require("../services/JwtService");
const OrderService = require("../services/OrderService");

const createOrder = async (req, res) => {
  // console.log('req.body: ' , req.body);
  try {
    const {
      name,
      address,
      phone,
      paymentMethod,
      totalPrice,
      shippingPrice,
      itemsPrice,
      user
    } = req.body;
    if (
      !name ||
      !address ||
      !phone ||
      !paymentMethod ||
      !totalPrice ||
      !shippingPrice ||
      !itemsPrice
    ) {
      return res.status(200).json({
        status: "Error",
        message: "Please provide all required fields",
      });
    }
    const response = await OrderService.createOrder(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log("err message:", e.message); // Thông báo lỗi
    console.log("err stack:", e.stack); // Vị trí stack trace
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const { filter } = req.query; // Lấy giá trị filter từ query string
    let userId = null;

    // Kiểm tra nếu filter có giá trị và chứa userId
    if (filter) {
      const parsedFilter = filter.split(":");
      if (parsedFilter[0] === "user") {
        userId = parsedFilter[1]; // Lấy userId từ filter
      }
    }

    // Truyền userId vào hàm getAllOrder của Service
    const response = await OrderService.getAllOrder(userId);
    return res.status(200).json(response);
  } catch (e) {
    console.error("Error in get all order:", e);
    return res.status(500).json({
      message: "Error occurred while fetching orders",
    });
  }
};
const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({
        status: "Error",
        message: "The id is required",
      });
    }
    const response = await OrderService.deleteOrder(id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(200).json({
        status: "Ok",
        message: "Require is orderId",
      });
    }
    const response = await OrderService.getDetailOrder(orderId);
    return res.status(200).json(response);
  } catch (e) {
    console.error("Error Details:", {
      name: e.name,
      message: e.message,
      stack: e.stack,
    });
  }
};
const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const data = req.body;

    if (!orderId) {
      return res.status(400).json({
        status: "Error",
        message: "Order ID is required",
      });
    }

    const response = await OrderService.updateOrder(orderId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "Error",
      message: e.message || "Internal Server Error",
    });
  }
};

module.exports = {
  createOrder,
  getAllOrder,
  deleteOrder,
  getDetailOrder,
  updateOrder
};
