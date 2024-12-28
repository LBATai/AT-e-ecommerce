const PaymentTypeService = require("../services/PaymentTypeService");

// Create payment type
const createPaymentType = async (req, res) => {
    try {
        const { name, description, enabled } = req.body;
        if (!name) {
            return res.status(200).json({
                status: "Error",
                message: "Please provide all required fields of the payment type",
            });
        }
        const response = await PaymentTypeService.createPaymentType(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.error("Error creating payment type:", e);
        return res.status(500).json({
            message: e.message,
        });
    }
};
// Get all payment types
const getAllPaymentTypes = async (req, res) => {
    try {
        const response = await PaymentTypeService.getAllPaymentTypes();
        return res.status(200).json(response);
    } catch (e) {
        console.error("Error get all payment types:", e);
        return res.status(500).json({
            message: "Error occurred while fetching payment types",
        });
    }
};
// Get details of a payment type
const getDetailsPaymentType = async (req, res) => {
    try {
        const paymentTypeId = req.params.id;
        if (!paymentTypeId) {
            return res.status(200).json({
                status: "Error",
                message: "The paymentTypeId is required",
            });
        }
        const response = await PaymentTypeService.getDetailsPaymentType(paymentTypeId);
        return res.status(200).json(response);
    } catch (e) {
        console.error("Error get details payment type:", e);
        return res.status(500).json({
            message: "Error occurred while fetching payment type details",
        });
    }
};

// Update payment type
const updatePaymentType = async (req, res) => {
    try {
        const paymentTypeId = req.params.id;
        if (!paymentTypeId) {
            return res.status(200).json({
                status: "Error",
                message: "The paymentTypeId is required",
            });
        }
        const response = await PaymentTypeService.updatePaymentType(paymentTypeId, req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.error("Error updating payment type:", e);
        return res.status(500).json({
            message: "Error occurred while updating payment type",
        });
    }
};
// Delete payment type
const deletePaymentType = async (req, res) => {
    try {
        const paymentTypeId = req.params.id;
        if (!paymentTypeId) {
            return res.status(200).json({
                status: "Error",
                message: "The paymentTypeId is required",
            });
        }
        const response = await PaymentTypeService.deletePaymentType(paymentTypeId);
        return res.status(200).json(response);
    } catch (e) {
        console.error("Error deleting payment type:", e);
        return res.status(500).json({
            message: "Error occurred while deleting payment type",
        });
    }
};
// Delete multiple payment types
const deleteMultiplePaymentTypes = async (req, res) => {
    try {
        const { ids } = req.body;
        if (!ids) {
            return res.status(200).json({
                status: "Error",
                message: "Please provide ids of the payment types",
            });
        }
        const response = await PaymentTypeService.deleteMultiplePaymentTypes(ids);
        return res.status(200).json(response);
    } catch (e) {
        console.error("Error deleting multiple payment types:", e);
        return res.status(500).json({
            message: "Error occurred while deleting multiple payment types",
        });
    }
};


module.exports = {
    createPaymentType,
    getAllPaymentTypes,
    getDetailsPaymentType,
    updatePaymentType,
    deletePaymentType,
     deleteMultiplePaymentTypes
};