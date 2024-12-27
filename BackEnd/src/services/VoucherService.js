const Voucher = require('../models/VoucherModel');

// Tạo voucher mới
const createVoucher = (voucherData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newVoucher = await Voucher.create(voucherData);
            if (newVoucher) {
                resolve({
                    status: 'OK',
                    message: 'Create voucher successfully',
                    data: newVoucher,
                });
            }
        } catch (e) {
            console.error('Error creating voucher:', e.message);
            console.error('Error stack:', e.stack);
            reject(e);
        }
    });
};

// Lấy tất cả voucher
const getAllVoucher = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const vouchers = await Voucher.find();
            resolve({
                status: 'OK',
                message: 'Get all vouchers successfully',
                data: vouchers,
            });
        } catch (error) {
            console.error('Error getting all vouchers:', error);
            reject(error);
        }
    });
};

// Lấy chi tiết voucher
const getDetailsVoucher = (voucherId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const voucher = await Voucher.findById(voucherId);
            if (voucher) {
                resolve({
                    status: 'OK',
                    message: 'Get voucher details successfully',
                    data: voucher,
                });
            } else {
                resolve({
                    status: 'Error',
                    message: 'Voucher not found'
                })
            }
        } catch (error) {
            console.error('Error getting voucher details:', error);
            reject(error);
        }
    });
};

// Cập nhật voucher
const updateVoucher = (voucherId, voucherData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updatedVoucher = await Voucher.findByIdAndUpdate(voucherId, voucherData, {
                new: true,
            });
            if (updatedVoucher) {
                resolve({
                    status: 'OK',
                    message: 'Update voucher successfully',
                    data: updatedVoucher,
                });
            }
        } catch (error) {
            console.error('Error updating voucher:', error);
            reject(error);
        }
    });
};

// Xóa voucher
const deleteVoucher = (voucherId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const deletedVoucher = await Voucher.findByIdAndDelete(voucherId);
             if (deletedVoucher) {
                resolve({
                  status: 'OK',
                  message: 'Delete voucher successfully',
                  data: deletedVoucher,
                });
              } else {
                resolve({
                  status: "Error",
                  message: "Voucher not found",
                })
              }
        } catch (error) {
            console.error('Error deleting voucher:', error);
            reject(error);
        }
    });
};
// Xóa nhiều voucher
const deleteMultipleVouchers = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            const deletedVouchers = await Voucher.deleteMany({ _id: { $in: ids } });
            if (deletedVouchers) {
                resolve({
                  status: "OK",
                  message: "Delete multiple vouchers successfully",
                  data: deletedVouchers,
                });
              }else {
                resolve({
                  status: "Error",
                  message: "Voucher not found",
                })
              }
        } catch (error) {
            console.error("Error deleting multiple vouchers:", error);
            reject(error);
        }
    });
};

module.exports = {
    createVoucher,
    getAllVoucher,
    getDetailsVoucher,
    updateVoucher,
    deleteVoucher,
    deleteMultipleVouchers,
};