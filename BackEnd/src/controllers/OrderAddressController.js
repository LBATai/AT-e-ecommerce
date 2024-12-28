const OrderAddressService = require("../services/OrderAddressService");

const createOrderAddress = async (req, res) => {
  try {
    const { user, name, address, phone, isDefault } = req.body;
    if (!user || !name || !address || !phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const response = await OrderAddressService.createOrderAddress(req.body);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllOrderAddresses = async (req, res) => {
  try {
    const userId = req.query.user;
    const response = await OrderAddressService.getAllOrderAddresses(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOrderAddressById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        status: "Error",
        message: "Require id",
      });
    }
    const response = await OrderAddressService.getOrderAddressById(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateOrderAddress = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await OrderAddressService.updateOrderAddress(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteOrderAddress = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await OrderAddressService.deleteOrderAddress(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrderAddress,
  getAllOrderAddresses,
  getOrderAddressById,
  updateOrderAddress,
  deleteOrderAddress,
};
