import axios from 'axios';

axios.defaults.withCredentials = true;

export const axiosJWT = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true, // Bắt buộc để gửi và nhận cookies
});

// Lấy tất cả bình luận của sản phẩm
export const getCommentsByProduct = async (productId) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL_BACKEND}/comment/getAll-comments/${productId}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};

// Tạo bình luận mới
export const createComment = async (productId, data) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL_BACKEND}/comment/create-comment:${productId}`,data)
    return res.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};
// Cập nhật bình luận
export const updateComment = async (commentId, commentData) => {
  try {
    const res = await axios.put(`${import.meta.env.VITE_API_URL_BACKEND}/comment/update-comment/${commentId}`, commentData);
    return res.data;
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

// Xóa bình luận
export const deleteComment = async (commentId) => {
  try {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL_BACKEND}/comment/delete-comment/${commentId}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};
