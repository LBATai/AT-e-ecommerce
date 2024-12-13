import axios from 'axios';

axios.defaults.withCredentials = true;
export const axiosJWT = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true, // Bắt buộc để gửi và nhận cookies
});

export const getAllProduct = async (search, type, typeHeader) => {
    let res = {};
    if (search) {
      // Gửi filter theo đúng định dạng
      res = await axios.get(`${import.meta.env.VITE_API_URL_BACKEND}/product/getAll-product?filter=name:${search}`);
    } else if (type){
        res = await axios.get(`${import.meta.env.VITE_API_URL_BACKEND}/product/getAll-product?filter=type:${type}`);
    } else {
      res = await axios.get(`${import.meta.env.VITE_API_URL_BACKEND}/product/getAll-product`);
    }
    return res.data;
  };

export const createProduct  = async (data) => {
    console.log('data', data)
    const res = await axios.post(`${import.meta.env.VITE_API_URL_BACKEND}/product/create-product`,data)
    return res.data;
}
export const getDetailsProduct  = async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL_BACKEND}/product/detail-product/${id}`,)
    // console.log('res.data', res.data)
    return res.data;
}

export const updateProduct  = async (id, access_token, data) => {
        console.log('userservicadsdasdae acctoken:', access_token)
        const res = await axiosJWT.put(`${import.meta.env.VITE_API_URL_BACKEND}/product/update-product/${id}`,data,{
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data;
}

export const deleteProduct  = async (id) => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL_BACKEND}/product/delete-product/${id}`,)
    return res.data;
}

export const deleteMultipleProducts = async (ids) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL_BACKEND}/product/delete-multiple`, {
            ids, // Gửi danh sách ID qua body
        });
        return res.data;
    } catch (error) {
        console.error('Error deleting products:', error);
        throw error;
    }
};
export const getAllType = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL_BACKEND}/product/getAll-type`);
        return res.data;
    } catch (error) {
        console.error('Error deleting products:', error);
        throw error;
    }
};