import * as ProductService from "../../Service/ProductService";

// fetch all type
export const fetchAllTypeProduct = async () => {
  try {
    const res = await ProductService.getAllType();
    return res.data; // Giả định API trả về một mảng dữ liệu trong `data`
  } catch (error) {
    console.error("Error fetching types:", error);
    return [];
  }
};
// fetch all products
export const fetchAllProduct = async () => {
  try {
    const res = await ProductService.getAllProduct();
    return res?.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Nếu có lỗi, trả về mảng trống
  }
};
// format time chat
export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };