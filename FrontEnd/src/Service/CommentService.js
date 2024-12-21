import axios from 'axios';

axios.defaults.withCredentials = true;
export const axiosJWT = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true, // Bắt buộc để gửi và nhận cookies
});

// Tạo bình luận mới
export const createComment  = async (data) => {
  const res = await axios.post(`${import.meta.env.VITE_API_URL_BACKEND}/comment/create-comment`,data)
  return res.data;
}

export const getCommentsByProduct = async (productId) => {
  let res = {};
  if (productId) {
    // Gửi filter theo đúng định dạng
    res = await axios.get(`${import.meta.env.VITE_API_URL_BACKEND}/comment/getCommentsByProduct?filter=productId:${productId}`);
  } 
  // console.log('res.datadata', res.data)
  return res.data;
};
