const OrderAddress = require("../models/OrderAddressModel");

const createOrderAddress = (newAddress) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createdAddress = await OrderAddress.create(newAddress);
      if (createdAddress) {
        resolve({
          status: "success",
          message: "Address created successfully",
          data: createdAddress,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllOrderAddresses = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let addresses;
      if (userId) {
        addresses = await OrderAddress.find({ user: userId });
      } else {
        addresses = await OrderAddress.find();
      }
      resolve({
        status: "OK",
        message: "Get all order addresses successfully",
        data: addresses,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const getOrderAddressById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const address = await OrderAddress.findOne({ _id: id });
      if (address === null) {
        resolve({
          status: "Ok",
          message: "Order address not found",
        });
      }
      resolve({
        status: "OK",
        message: "Get detail address successfully",
        data: address,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateOrderAddress = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkAddress = await OrderAddress.findOne({ _id: id });
      if (checkAddress === null) {
        resolve({
          status: "Error",
          message: "Order address not found",
        });
      }
      const updatedAddress = await OrderAddress.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "OK",
        message: "Update order address successfully",
        data: updatedAddress,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteOrderAddress = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkAddress = await OrderAddress.findOne({ _id: id });
      if (checkAddress === null) {
        resolve({
          status: "Error",
          message: "Order address not found",
        });
      }
      await OrderAddress.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete order address successfully",
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createOrderAddress,
  getAllOrderAddresses,
  getOrderAddressById,
  updateOrderAddress,
  deleteOrderAddress,
};
