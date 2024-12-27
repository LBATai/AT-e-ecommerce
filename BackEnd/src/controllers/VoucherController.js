const VoucherService = require('../services/VoucherService');

// Tạo voucher mới
const createVoucher = async (req, res) => {
  try {
      const { code, discount, expiryDate, maxIssuance, maxUsage } = req.body;
      if (!code || !discount || !expiryDate || !maxIssuance || !maxUsage) {
          return res.status(200).json({
              status: 'Error',
              message: 'Please provide all required fields of the voucher',
          });
      }
    const response = await VoucherService.createVoucher(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.error('Error creating voucher:', e);
    return res.status(500).json({
      message: e.message,
    });
  }
};

// Lấy tất cả voucher
const getAllVoucher = async (req, res) => {
    try {
        const response = await VoucherService.getAllVoucher();
        return res.status(200).json(response);
    } catch (e) {
        console.error('Error get all voucher:', e);
        return res.status(500).json({
            message: 'Error occurred while fetching voucher',
        });
    }
};

// Lấy chi tiết voucher
const getDetailsVoucher = async (req, res) => {
    try {
        const voucherId = req.params.id;
        if (!voucherId) {
            return res.status(200).json({
                status: 'Error',
                message: 'The voucherId is required',
            });
        }
        const response = await VoucherService.getDetailsVoucher(voucherId);
        return res.status(200).json(response);
    } catch (e) {
        console.error('Error get details voucher:', e);
        return res.status(500).json({
            message: 'Error occurred while fetching voucher details',
        });
    }
};

// Cập nhật voucher
const updateVoucher = async (req, res) => {
    try {
        const voucherId = req.params.id;
        if (!voucherId) {
            return res.status(200).json({
                status: 'Error',
                message: 'The voucherId is required',
            });
        }
        const response = await VoucherService.updateVoucher(voucherId, req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.error('Error updating voucher:', e);
        return res.status(500).json({
            message: 'Error occurred while updating voucher',
        });
    }
};

// Xóa voucher
const deleteVoucher = async (req, res) => {
    try {
        const voucherId = req.params.id;
        if (!voucherId) {
            return res.status(200).json({
                status: 'Error',
                message: 'The voucherId is required',
            });
        }
        const response = await VoucherService.deleteVoucher(voucherId);
        return res.status(200).json(response);
    } catch (e) {
        console.error('Error deleting voucher:', e);
        return res.status(500).json({
            message: 'Error occurred while deleting voucher',
        });
    }
};

// Xóa nhiều voucher
const deleteMultipleVouchers = async (req, res) => {
    try {
        const { ids } = req.body
        if (!ids) {
            return res.status(200).json({
              status: "Error",
              message: "Please provide ids of the voucher",
            });
          }
        const response = await VoucherService.deleteMultipleVouchers(ids);
        return res.status(200).json(response);
    } catch (e) {
        console.error("Error deleting multiple vouchers:", e);
        return res.status(500).json({
            message: "Error occurred while deleting multiple vouchers",
        });
    }
};

module.exports = {
    createVoucher,
    getAllVoucher,
    getDetailsVoucher,
    updateVoucher,
    deleteVoucher,
    deleteMultipleVouchers,
};