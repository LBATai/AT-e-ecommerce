import axios from 'axios';

axios.defaults.withCredentials = true;
export const axiosJWT = axios.create({
    baseURL: 'http://localhost:3001', // Thay đổi nếu cần
    withCredentials: true,
});

// Tạo voucher mới
export const createVoucher = async (data) => {
  const res = await axiosJWT.post(`${import.meta.env.VITE_API_URL_BACKEND}/voucher/create-voucher`, data);
  return res.data;
};

// Lấy danh sách tất cả các voucher
export const getAllVoucher = async () => {
  const res = await axiosJWT.get(`${import.meta.env.VITE_API_URL_BACKEND}/voucher/get-all-voucher`);
  return res.data;
};

// Lấy chi tiết voucher
export const getDetailsVoucher = async (id) => {
  const res = await axiosJWT.get(`${import.meta.env.VITE_API_URL_BACKEND}/voucher/get-details-voucher/${id}`);
  return res.data;
};

// Cập nhật voucher
export const updateVoucher = async (id, data) => {
  const res = await axiosJWT.put(`${import.meta.env.VITE_API_URL_BACKEND}/voucher/update-voucher/${id}`, data);
  return res.data;
};

// Xóa voucher
export const deleteVoucher = async (id) => {
  const res = await axiosJWT.delete(`${import.meta.env.VITE_API_URL_BACKEND}/voucher/delete-voucher/${id}`);
  return res.data;
};
// Xóa nhiều voucher
export const deleteMultipleVouchers = async (ids) => {
    const res = await axiosJWT.delete(`${import.meta.env.VITE_API_URL_BACKEND}/voucher/delete-multiple-vouchers`,{data:{ids}});
    return res.data;
};