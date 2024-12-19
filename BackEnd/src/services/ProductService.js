const Product = require("../models/ProductModel")
const bcrypt = require("bcrypt")

// User Service
const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
      const { name, images, type, price, countInStock, rating, description, discount, selled, options, sex } = newProduct;
  
      try {
        // Kiểm tra sản phẩm đã tồn tại chưa
        const checkProduct = await Product.findOne({ where: { name } });
        if (checkProduct) {
          return resolve({
            status: 'error',
            message: 'The name of the product already exists',
          });
        }
  
        // Tạo sản phẩm mới với các trường dữ liệu đầy đủ
        const productData = {
          name,
          images,
          type,
          price,
          countInStock,
          rating,
          description,
          discount,
          selled,
          sex
        };
  
        // Nếu có `options`, thêm vào dữ liệu sản phẩm
        if (options && Array.isArray(options)) {
          productData.options = options;
        }
  
        // Lưu sản phẩm vào database
        const newProduct = await Product.create(productData);
  
        if (newProduct) {
          resolve({
            status: 'success',
            message: 'Product created successfully',
            data: newProduct,
          });
        } else {
          resolve({
            status: 'error',
            message: 'Failed to create product',
          });
        }
      } catch (e) {
        console.error('Error occurred while creating the product:', e);

        // Kiểm tra lỗi trùng lặp tên sản phẩm
        if (e.code === 11000) {
            reject({
                status: 'error',
                message: 'The name of the product already exists',
                error: e.message,
            });
        } else {
            reject({
                status: 'error',
                message: 'An error occurred while creating the product',
                error: e.message,
            });
        }
    }
    });
  };

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id,
            })
            // console.log('checkProduct', checkProduct)
            if(checkProduct === null){
                resolve({
                    status: 'OK',
                    message: 'The product not found',
                })
            }
            const newProduct = await Product.findByIdAndUpdate(id, data, {new: true})
            resolve({
                status: 'OK',
                message: 'Update product successfully',
                data: newProduct
            })

            } catch (e) {
                reject(e);
                console.log(e);
            }
        })
}

const getDetailProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id,
            })
            if(product === null){
                resolve({
                    status: 'OK',
                    message: 'Get  details product not found',
                })
            }
            resolve({
                status: 'OK',
                message: 'Get details product successfully',
                data: product
            })

        } catch (e) {
                reject(e);
                console.log(e);
            }
        })
}

const getAllProduct = async (filter) => {
    try {
      let products;
  
      if (filter) {
        // Lọc sản phẩm dựa trên trường và giá trị của filter
        const [label, value] = filter; // Ví dụ: ['name', 'iPhone']
        products = await Product.find({ [label]: { '$regex': value, '$options': 'i' } });
      } else {
        // Nếu không có filter, lấy tất cả sản phẩm
        products = await Product.find();
      }
  
      return {
        status: 'OK',
        message: 'Get products successful',
        data: products,
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Error occurred while fetching products');
    }
  };
  
const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Product.distinct('type')
            resolve({
                status: 'OK',
                message: 'Get all type is successful',
                data: allType,
            })
            } catch (e) {
                reject(e);
                console.log(e);
            }
        })
}
const getAllSex = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allSex = await Product.distinct('sex')
            resolve({
                status: 'OK',
                message: 'Get all sex is successful',
                data: allSex,
            })
            } catch (e) {
                reject(e);
                console.log(e);
            }
        })
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id,
            })
            // console.log('checkProduct', checkProduct)
            if(checkProduct === null){
                resolve({
                    status: 'OK',
                    message: 'The product not found',
                })
            }
            await Product.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete is successful',
            })

            } catch (e) {
                reject(e);
                console.log(e);
            }
        })
}

const deleteMultipleProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!Array.isArray(ids) || ids.length === 0) {
                return resolve({
                    status: 'ERR',
                    message: 'Danh sách productIds là bắt buộc và phải là một mảng hợp lệ.',
                });
            }

            const results = [];
            for (const id of ids) {
                const checkProduct = await Product.findOne({ _id: id });
                if (checkProduct === null) {
                    results.push({
                        id,
                        status: 'ERR',
                        message: 'Sản phẩm không tồn tại.',
                    });
                } else {
                    await Product.findByIdAndDelete(id);
                    results.push({
                        id,
                        status: 'OK',
                        message: 'Đã xóa thành công.',
                    });
                }
            }

            resolve({
                status: 'OK',
                message: 'Xóa sản phẩm hoàn tất.',
                details: results,
            });
        } catch (e) {
            reject({
                status: 'ERR',
                message: 'Đã xảy ra lỗi khi xóa sản phẩm.',
                error: e,
            });
            console.error('Lỗi trong deleteMultipleProduct:', e);
        }
    });
};



module.exports = {
    createProduct,
    updateProduct,
    getDetailProduct,
    getAllProduct,
    deleteProduct,
    deleteMultipleProduct,
    getAllType,
    getAllSex
}