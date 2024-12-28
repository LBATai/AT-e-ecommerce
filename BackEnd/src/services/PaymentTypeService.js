const PaymentType = require("../models/PaymentTypeModel");

// Create a new payment type
const createPaymentType = (paymentTypeData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newPaymentType = await PaymentType.create(paymentTypeData);
      if (newPaymentType) {
        resolve({
          status: "OK",
          message: "Create payment type successfully",
          data: newPaymentType,
        });
      }
    } catch (e) {
      console.error("Error creating payment type:", e.message);
      console.error("Error stack:", e.stack);
      reject(e);
    }
  });
};
// Get all payment types
const getAllPaymentTypes = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const paymentTypes = await PaymentType.find();
      resolve({
        status: "OK",
        message: "Get all payment types successfully",
        data: paymentTypes,
      });
    } catch (error) {
      console.error("Error getting all payment types:", error);
      reject(error);
    }
  });
};
// Get details of a payment type
const getDetailsPaymentType = (paymentTypeId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const paymentType = await PaymentType.findById(paymentTypeId);
      if (paymentType) {
        resolve({
          status: "OK",
          message: "Get payment type details successfully",
          data: paymentType,
        });
      } else {
        resolve({
          status: "Error",
          message: "Payment type not found",
        });
      }
    } catch (error) {
      console.error("Error getting payment type details:", error);
      reject(error);
    }
  });
};
// Update a payment type
const updatePaymentType = (paymentTypeId, paymentTypeData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatedPaymentType = await PaymentType.findByIdAndUpdate(
        paymentTypeId,
        paymentTypeData,
        {
          new: true,
        }
      );
      if (updatedPaymentType) {
        resolve({
          status: "OK",
          message: "Update payment type successfully",
          data: updatedPaymentType,
        });
      }
    } catch (error) {
      console.error("Error updating payment type:", error);
      reject(error);
    }
  });
};
// Delete a payment type
const deletePaymentType = (paymentTypeId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deletedPaymentType = await PaymentType.findByIdAndDelete(
        paymentTypeId
      );
      if (deletedPaymentType) {
        resolve({
          status: "OK",
          message: "Delete payment type successfully",
          data: deletedPaymentType,
        });
      } else {
        resolve({
          status: "Error",
          message: "Payment type not found",
        });
      }
    } catch (error) {
      console.error("Error deleting payment type:", error);
      reject(error);
    }
  });
};

// Delete multiple payment types
const deleteMultiplePaymentTypes = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deletedPaymentTypes = await PaymentType.deleteMany({
        _id: { $in: ids },
      });
      if (deletedPaymentTypes) {
        resolve({
          status: "OK",
          message: "Delete multiple payment types successfully",
          data: deletedPaymentTypes,
        });
      } else {
        resolve({
          status: "Error",
          message: "Payment types not found",
        });
      }
    } catch (error) {
      console.error("Error deleting multiple payment types:", error);
      reject(error);
    }
  });
};
module.exports = {
  createPaymentType,
  getAllPaymentTypes,
  getDetailsPaymentType,
  updatePaymentType,
  deletePaymentType,
  deleteMultiplePaymentTypes,
};
