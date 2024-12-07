const Product = require("../models/ProductModel")
const bcrypt = require("bcrypt")

// User Service
const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock,rating,description, discount, selled } = newProduct
        try {
            const checkProduct = await Product.findOne(
                {
                    name: name, 
                }
            )
            if(checkProduct != null){
                resolve({
                    status: 'error',
                    message: 'The name of product is already'
                })
            }
            const newProduct = await Product.create({
                name, 
                image, 
                type, 
                price, 
                countInStock,
                rating,
                description,
                discount,
                selled
            })    
            if (newProduct){
                resolve({
                    status: 'success',
                    message: 'Product created successfully',
                    data: newProduct
                })
            }
            } catch (e) {
                reject(e);
            }
        })
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id,
            })
            console.log('checkProduct', checkProduct)
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

const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments()
            if(filter){
                const label = filter[0]
                const allProductFilter = await Product.find({[label]: {'$regex': filter[1]}})
                resolve({
                    status: 'OK',
                    message: 'Get filter is successful',
                    data: allProductFilter,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if(sort){
                const objectSort = {}
                objectSort[sort[1]] = sort[0] 
                // console.log('objectSort', objectSort);
                const allProductSort = await Product.find().limit(limit).skip(page  * limit).sort(objectSort)
                resolve({
                    status: 'OK',
                    message: 'Get sort is successful',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            const allProduct = await Product.find().limit(limit).skip(page  * limit)
            resolve({
                status: 'OK',
                message: 'Get all is successful',
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            })

            } catch (e) {
                reject(e);
                console.log(e);
            }
        })
}
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

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id,
            })
            console.log('checkProduct', checkProduct)
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
    getAllType
}