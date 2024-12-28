const express = require("express");
const router = express.Router();
const PaymentTypeController = require("../controllers/PaymentTypeController");

// Create a new payment type
router.post('/create-payment-type', PaymentTypeController.createPaymentType);

// Get all payment types
router.get('/get-all-payment-types', PaymentTypeController.getAllPaymentTypes);

// Get details of a payment type
router.get('/get-details-payment-type/:id', PaymentTypeController.getDetailsPaymentType);

// Update a payment type
router.put('/update-payment-type/:id', PaymentTypeController.updatePaymentType);

// Delete a payment type
router.delete('/delete-payment-type/:id', PaymentTypeController.deletePaymentType);

  // Delete multiple payment types
router.delete('/delete-multiple-payment-types', PaymentTypeController.deleteMultiplePaymentTypes);


module.exports = router;