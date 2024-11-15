const UserService = require('../services/UserService');
const JwtService = require('../services/JwtService');

const createUser = async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, password, phone } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!name || !email || !password || !phone ) {
            return res.status(200).json({
                status: 'Error',
                message: 'Please provide all required fields'
            });  
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'Error',
                message: 'The input is email'
            });
        } 
        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)
    } catch (e) {    
        return res.status(404).json({
            message: e 
        });
    }
}

const loginUser = async (req, res) => {
    try {
        // console.log(req.body)
        const {email, password } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if ( !email || !password  ) {
            return res.status(200).json({
                status: 'Error',
                message: 'Please provide all required fields'
            });  
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'Error',
                message: 'The input is email'
            });
        // } else if (password !== confirmPassword){
        //     return res.status(200).json({
        //         status: 'Error',
        //         message: 'Password and confirm password do not match'
        //     });
        }
        // console.log('isCheckEmail', isCheckEmail)
        const response = await UserService.loginUser(req.body)
        const {refresh_token, ...newResponse} = response
        res.cookie('refresh_token', refresh_token, {
            HttpOnly: true,
            Secure: true,
        })
        // console.log('respone', respone)
        return res.status(200).json(newResponse)
    } catch (e) {    
        return res.status(404).json({
            message: e 
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if(!userId) {
            return res.status(200).json({
                status: 'Error',
                message: 'The userId is required'
            });
        }
        const response = await UserService.updateUser(userId, data)
        return res.status(200).json(response)
    } catch (e) {    
        return res.status(404).json({
            message: e 
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        if(!userId) {
            return res.status(200).json({
                status: 'Error',
                message: 'The userId is required'
            });
        }
        const response = await UserService.deleteUser(userId)
        return res.status(200).json(response)
    } catch (e) {    
        return res.status(404).json({
            message: e 
        });
    }
}

const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser()
        return res.status(200).json(response)
    } catch (e) {    
        return res.status(404).json({
            message: e 
        });
    }
}

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id
        if(!userId) {
            return res.status(200).json({
                status: 'Ok',
                message: 'Req is id'
            });
        } 
        const response = await UserService.getDetailsUser(userId)
        return res.status(200).json(response)
    }catch (e) {
        console.error('Error Details:', {
            name: e.name,
            message: e.message,
            stack: e.stack
        });
    }
}

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refresh_token
        if(!token) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The token is required'
            });
        } 
        const response = await JwtService.refreshTokenJwtService(token)
        return res.status(200).json(response)
    }catch (e) {
        console.error('Error Details:', {
            name: e.name,
            message: e.message,
            stack: e.stack
        });
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken
}