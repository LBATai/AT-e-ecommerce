import axios from 'axios';

axios.defaults.withCredentials = true;

export const getAllProduct  = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL_BACKEND}/product/getAll-product`)
    return res.data;
}
export const createProduct  = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL_BACKEND}/product/create-product`,data)
    return res.data;
}