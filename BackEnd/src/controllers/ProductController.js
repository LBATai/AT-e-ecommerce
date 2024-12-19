const Product = require("../models/ProductModel");
const JwtService = require("../services/JwtService");
const ProductService = require("../services/ProductService");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      images,
      type,
      price,
      countInStock,
      rating,
      description,
      discount,
      selled,
      options,
      sex
    } = req.body;
    // Kiểm tra nếu thiếu `images` hoặc `images` là một mảng trống
    if (!images || images.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Images are required",
      });
    }
    // Gọi service để tạo sản phẩm
    const result = await ProductService.createProduct(req.body);

    // Kiểm tra kết quả trả về từ service
    if (result.status === "error") {
      return res.status(400).json({
        status: result.status,
        message: result.message, // Trả về thông điệp chi tiết lỗi từ service
      });
    }

    // Nếu thành công
    return res.status(201).json({
      status: result.status,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({
      status: "Error",
      message: error.message || "Something went wrong", // Trả về thông điệp lỗi chi tiết nếu có
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    if (!productId) {
      return res.status(200).json({
        status: "Error",
        message: "The productId is required",
      });
    }
    const response = await ProductService.updateProduct(productId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(200).json({
        status: "Ok",
        message: "Require is productId",
      });
    }
    const response = await ProductService.getDetailProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    console.error("Error Details:", {
      name: e.name,
      message: e.message,
      stack: e.stack,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const { filter } = req.query; // Nhận giá trị filter từ query string
    let parsedFilter = null;
    if (filter) {
      parsedFilter = filter.split(":"); // Chuyển chuỗi 'name:iPhone' thành mảng ['name', 'iPhone']
    }
    const response = await ProductService.getAllProduct(parsedFilter);
    return res.status(200).json(response);
  } catch (e) {
    console.error("Error in getAllProduct:", e);
    return res.status(500).json({
      message: "Error occurred while fetching products",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(200).json({
        status: "Error",
        message: "The productId is required",
      });
    }
    const response = await ProductService.deleteProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteMultipleProduct = async (req, res) => {
  try {
    const productIds = req.body.ids; // Lấy danh sách ID từ body
    if (!Array.isArray(productIds) || productIds.length === 0) {
      return res.status(200).json({
        status: "Error",
        message: "Danh sách productIds là bắt buộc và phải là một mảng hợp lệ.",
      });
    }

    const response = await ProductService.deleteMultipleProduct(productIds); // Đổi tên gọi service
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const getAllType = async (req, res) => {
  try {
    const response = await ProductService.getAllType();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const getAllSex = async (req, res) => {
  try {
    const response = await ProductService.getAllSex();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailProduct,
  getAllProduct,
  deleteProduct,
  deleteMultipleProduct,
  getAllType,
  getAllSex
};
