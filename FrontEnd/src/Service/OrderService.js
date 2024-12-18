import axios from 'axios';

axios.defaults.withCredentials = true;
export const axiosJWT = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true, // Bắt buộc để gửi và nhận cookies
});

export const createOrder  = async (id,access_token, data) => {
  console.log('data', data)
    const res = await axiosJWT.post(`${import.meta.env.VITE_API_URL_BACKEND}/order/create-order/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data; 
}
export const getAllOrder = async (userId) => {
    let res = {};
    // console.log('first',userId)
    if (userId) {
      // Gửi filter theo đúng định dạng
      res = await axios.get(`${import.meta.env.VITE_API_URL_BACKEND}/order/getAll-order?filter=user:${userId}`);
    } else {
      res = await axios.get(`${import.meta.env.VITE_API_URL_BACKEND}/order/getAll-order`);
    }
    // console.log('res.datadata', res.data)
    return res.data;
  };

export const deleteOrder  = async (id) => {
  // console.log('id', id)
    const res = await axios.delete(`${import.meta.env.VITE_API_URL_BACKEND}/order/delete-order/${id}`,)
    return res.data;
}

export const getDetailsOrder = async (id) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL_BACKEND}/order/detail-order/${id}`,)
  // console.log('res.data', res.data)
  return res.data;
}