const JwtService = require('../services/JwtService');
const ProductService = require('../services/ProductService');

const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock,rating,description, discount, selled } = req.body
        console.log(req.body)
        if (!name || !image || !type || !price || !countInStock || !rating ) {
            return res.status(200).json({
                status: 'Error',
                message: 'Please provide all required fields'
            });  
        } 
        const response = await ProductService.createProduct(req.body)
        return res.status(200).json(response)
    } catch (e) {    
        return res.status(404).json({
            message: e 
        });
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body
        if(!productId) {
            return res.status(200).json({
                status: 'Error',
                message: 'The productId is required'
            });
        }
        const response = await ProductService.updateProduct(productId, data)
        return res.status(200).json(response)
    } catch (e) {    
        return res.status(404).json({
            message: e 
        });
    }
}

const getDetailProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if(!productId) {
            return res.status(200).json({
                status: 'Ok',
                message: 'Require is productId'
            });
        } 
        const response = await ProductService.getDetailProduct(productId)
        return res.status(200).json(response)
    }catch (e) {
        console.error('Error Details:', {
            name: e.name,
            message: e.message,
            stack: e.stack
        });
    }
}

const getAllProduct = async (req, res) => {
    try {
        const {limit, page, sort, filter} = req.query
        const response = await ProductService.getAllProduct(Number(limit) || 8, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {    
        return res.status(404).json({
            message: e 
        });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if(!productId) {
            return res.status(200).json({
                status: 'Error',
                message: 'The productId is required'
            });
        }
        const response = await ProductService.deleteProduct(productId)
        return res.status(200).json(response)
    } catch (e) {    
        return res.status(404).json({
            message: e 
        });
    }
}

const deleteMultipleProduct = async (req, res) => {
    try {
        const productIds = req.body.ids; // Lấy danh sách ID từ body
        if (!Array.isArray(productIds) || productIds.length === 0) {
            return res.status(200).json({
                status: 'Error',
                message: 'Danh sách productIds là bắt buộc và phải là một mảng hợp lệ.',
            });
        }

        const response = await ProductService.deleteMultipleProduct(productIds); // Đổi tên gọi service
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};
const getAllType = async (req, res) => {
    try {
        const response = await ProductService.getAllType();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
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