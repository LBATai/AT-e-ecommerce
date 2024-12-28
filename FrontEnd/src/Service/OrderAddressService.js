import axios from 'axios';

export const axiosJWT = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true,
});

export const createOrderAddress = async (data, access_token) => {
  const res = await axiosJWT.post(`${import.meta.env.VITE_API_URL_BACKEND}/order-address/create`, data, {
    headers: {
        token: `Bearer ${access_token}`,
      },
  });
  return res.data;
};

export const getAllOrderAddresses = async (userId, access_token) => {
    let res = {}
  if (userId) {
        res = await axiosJWT.get(`${import.meta.env.VITE_API_URL_BACKEND}/order-address/get-all?user=${userId}`, {
            headers: {
              token: `Bearer ${access_token}`,
            },
        });
    } else {
        res = await axiosJWT.get(`${import.meta.env.VITE_API_URL_BACKEND}/order-address/get-all`, {
            headers: {
                token: `Bearer ${access_token}`,
            },
        });
    }
  return res.data;
};

export const getOrderAddressById = async (id, access_token) => {
  const res = await axiosJWT.get(`${import.meta.env.VITE_API_URL_BACKEND}/order-address/get-address/${id}`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const updateOrderAddress = async (id, data, access_token) => {
  const res = await axiosJWT.put(`${import.meta.env.VITE_API_URL_BACKEND}/order-address/update/${id}`, data, {
    headers: {
        token: `Bearer ${access_token}`,
      },
  });
  return res.data;
};

export const deleteOrderAddress = async (id, access_token) => {
  const res = await axiosJWT.delete(`${import.meta.env.VITE_API_URL_BACKEND}/order-address/delete/${id}`, {
    headers: {
        token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};