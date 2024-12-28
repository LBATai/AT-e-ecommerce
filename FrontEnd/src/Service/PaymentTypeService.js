import axios from "axios";

axios.defaults.withCredentials = true;
export const axiosJWT = axios.create({
  baseURL: "http://localhost:3001", // Thay đổi nếu cần
  withCredentials: true,
});

// Create a new payment type
export const createPaymentType = async (data) => {
  const res = await axiosJWT.post(
    `${import.meta.env.VITE_API_URL_BACKEND}/payment-type/create-payment-type`,
    data
  );
  return res.data;
};
// Get all payment types
export const getAllPaymentTypes = async () => {
  const res = await axiosJWT.get(
    `${import.meta.env.VITE_API_URL_BACKEND}/payment-type/get-all-payment-types`
  );
  return res.data;
};

// Get a single payment type details
export const getDetailsPaymentType = async (id) => {
  const res = await axiosJWT.get(
    `${
      import.meta.env.VITE_API_URL_BACKEND
    }/payment-type/get-details-payment-type/${id}`
  );
  return res.data;
};

// Update a payment type
export const updatePaymentType = async (id, data) => {
  const res = await axiosJWT.put(
    `${
      import.meta.env.VITE_API_URL_BACKEND
    }/payment-type/update-payment-type/${id}`,
    data
  );
  return res.data;
};

// Delete a payment type
export const deletePaymentType = async (id) => {
  const res = await axiosJWT.delete(
    `${
      import.meta.env.VITE_API_URL_BACKEND
    }/payment-type/delete-payment-type/${id}`
  );
  return res.data;
};

// Delete multiple payment types
export const deleteMultiplePaymentTypes = async (ids) => {
  const res = await axiosJWT.delete(
    `${
      import.meta.env.VITE_API_URL_BACKEND
    }/payment-type/delete-multiple-payment-types`,
    { data: { ids } }
  );
  return res.data;
};
