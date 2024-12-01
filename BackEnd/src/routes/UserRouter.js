const express = require("express")
const router = express.Router()
const userController = require('../controllers/UserController')
const { authMiddleware, authUserMiddleware } = require("../middleware/authMiddleware")

router.post('/sign-up', userController.createUser)
router.post('/sign-in', userController.loginUser)
router.post('/sign-out', userController.signOutUser)
router.put('/update-user/:id', userController.updateUser)
router.delete('/delete-user/:id', userController.deleteUser)
router.get('/getAllUser', userController.getAllUser)
router.get('/get-detailsUser/:id', userController.getDetailsUser)
router.post('/refresh-token', userController.refreshToken)
router.post('/delete-multiple', userController.deleteMultipleUser);

module.exports = router