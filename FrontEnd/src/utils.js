import * as ProductService from './Service/ProductService'
import * as UserService from './Service/UserService'
import * as OrderService from './Service/OrderService'

export const isJsonString = (data) => {
    try {
        JSON.parse(data);
    }
    catch (e) {
        return false;
    }
    return true;

}

export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

export const renderOptions = (arr) => {
        let results = [];
      
        if (arr && arr.length > 0) {
          results = arr.map((opt) => ({
            value: opt,
            label: opt,
          }));
        }
      
        // Thêm tùy chọn "Thêm type"
        results.push({
          label: 'Thêm loại sản phẩm mới',
          value: 'add_type',
        });
      
        return results;
};
      
//format money
export const formatCurrencyVND = (value) => {
  // Làm tròn giá trị lên 1000 (đơn vị tiền tệ trong VND)
  const roundedValue = Math.ceil(value / 1000) * 1000;

  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(roundedValue);
};
//format date
export const formatDate = (isoDate) => {
  const date = new Date(isoDate);

  // Thêm 7 giờ để chuyển sang giờ Việt Nam
  const vietnamTime = new Date(date.getTime() + 7 );

  const day = vietnamTime.getDate().toString().padStart(2, '0'); // Ngày
  const month = (vietnamTime.getMonth() + 1).toString().padStart(2, '0'); // Tháng
  const year = vietnamTime.getFullYear(); // Năm
  const hours = vietnamTime.getHours().toString().padStart(2, '0'); // Giờ
  const minutes = vietnamTime.getMinutes().toString().padStart(2, '0'); // Phút
  const seconds = vietnamTime.getSeconds().toString().padStart(2, '0'); // Giây

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};



// fetch all types product
export const fetchAllTypeProduct = async () => {
    try {
      const res = await ProductService.getAllType();
      return res.data; // Giả định API trả về một mảng dữ liệu trong `data`
    } catch (error) {
      console.error('Error fetching types:', error);
      return [];
    }
};

// fetch all users
export const fetchAllUser = async () => {
  try {
    const response = await UserService.getAllUser();
    return response.data;
  } catch (error) {
    console.error('Error fetching types:', error);
    return [];
  }
};

//fetch all products
export const fetchAllProducts = async () => {
  try {
    const response = await ProductService.getAllProduct();
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
    message.error("Không thể lấy danh sách sản phẩm");
  }
};

// fetch all orders
export const fetchAllOrders = async () => {
  try {
    const response = await OrderService.getAllOrder();
    return response.data;
  } catch (error) {
    message.error('Không thể lấy danh sách đơn hàng');
  }
};