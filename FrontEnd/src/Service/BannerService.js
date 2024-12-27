import axios from 'axios';

axios.defaults.withCredentials = true;
export const axiosJWT = axios.create({
    baseURL: 'http://localhost:3001', // Thay đổi nếu cần
    withCredentials: true,
});

// Tạo banner mới
export const createBanner = async (data) => {
  const res = await axiosJWT.post(`${import.meta.env.VITE_API_URL_BACKEND}/banner/create-banner`, data);
  return res.data;
};
// Lấy danh sách tất cả các banner
export const getAllBanner = async () => {
  const res = await axiosJWT.get(`${import.meta.env.VITE_API_URL_BACKEND}/banner/get-all-banner`);
    // console.log('response', res)
  return res.data;
};

// Lấy chi tiết banner
export const getDetailsBanner = async (id) => {
  const res = await axiosJWT.get(`${import.meta.env.VITE_API_URL_BACKEND}/banner/get-details-banner/${id}`);
  return res.data;
};

// Cập nhật banner
export const updateBanner = async (id, data) => {
  const res = await axiosJWT.put(`${import.meta.env.VITE_API_URL_BACKEND}/banner/update-banner/${id}`, data);
  return res.data;
};

// Xóa banner
export const deleteBanner = async (id) => {
  const res = await axiosJWT.delete(`${import.meta.env.VITE_API_URL_BACKEND}/banner/delete-banner/${id}`);
  return res.data;
};
// Xóa nhiều banner
export const deleteMultipleBanners = async (ids) => {
    const res = await axiosJWT.delete(`${import.meta.env.VITE_API_URL_BACKEND}/banner/delete-multiple-banners`,{data:{ids}});
    return res.data;
};