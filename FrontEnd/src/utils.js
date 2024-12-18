import * as ProductService from './Service/ProductService'

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


// all fetch
export const fetchAllTypeProduct = async () => {
    try {
      const res = await ProductService.getAllType();
      return res.data; // Giả định API trả về một mảng dữ liệu trong `data`
    } catch (error) {
      console.error('Error fetching types:', error);
      return [];
    }
};