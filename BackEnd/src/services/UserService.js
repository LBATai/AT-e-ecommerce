const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const { genneralAccessToken,genneralRefreshToken } = require("./JwtService")

// User Service
const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const {name, email, password, phone, address, age, avatar} = newUser
        try {
            const checkUser = await User.findOne(
                {
                    email: email, 
                }
            )
            if(checkUser != null){
                resolve({
                    status: 'ERR',
                    message: 'Email already exists'
                })
            }
            const hash = bcrypt.hashSync(password, 10)  // hash from password
            const createUser = await User.create({
                name, 
                email, 
                password: hash, 
                phone,
                address,
                age,
                avatar
            })    
            if (createUser){
                resolve({
                    status: 'Success',
                    message: 'User created successfully',
                    data: createUser
                })
            }
            } catch (e) {
                reject(e);
            }
        })
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin;
        try {
            const checkUser = await User.findOne({ email: email });

            if (checkUser === null) {
                // Nếu không tìm thấy người dùng
                resolve({
                    status: 'ERROR',
                    message: 'User not found',
                });
                return;
            }

            // Kiểm tra mật khẩu
            const isPasswordValid = await bcrypt.compare(password, checkUser.password);
            if (!isPasswordValid) {
                // Nếu mật khẩu không đúng
                resolve({
                    status: 'ERROR',
                    message: 'Incorrect password',
                });
                return;
            }

            // Tạo token nếu mật khẩu đúng
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            });

            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            });

            resolve({
                status: 'OK',
                message: 'Login successful',
                access_token,
                refresh_token,
            });

        } catch (e) {
            reject(e);
            console.log(e);
        }
    });
};

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id,
            })
            // console.log('checkUser', checkUser)
            if(checkUser === null){
                resolve({
                    status: 'ERR',
                    message: 'The user not found',
                })
            }
            const updatedUser = await User.findByIdAndUpdate(id, data, {new: true})
            resolve({
                status: 'OK',
                message: 'Update user successfully',
                data: updatedUser
            })

            } catch (e) {
                reject(e);
                console.log(e);
            }
        })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id,
            })
            console.log('checkUser', checkUser)
            if(checkUser === null){
                resolve({
                    status: 'ERR',
                    message: 'The user not found',
                })
            }
            await User.findByIdAndDelete(id)
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

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            resolve({
                status: 'OK',
                message: 'Get all is successful',
                data: allUser
            })

            } catch (e) {
                reject(e);
                console.log(e);
            }
        })
}

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id,
            })
            if(user === null){
                resolve({
                    status: 'OK',
                    message: 'Get  details User not found',
                })
            }
            resolve({
                status: 'OK',
                message: 'Get details User successfully',
                data: user
            })

        } catch (e) {
                reject(e);
                console.log(e);
            }
        })
}

const deleteMultipleUser = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!Array.isArray(ids) || ids.length === 0) {
                return resolve({
                    status: 'ERR',
                    message: 'Danh sách userIds là bắt buộc và phải là một mảng hợp lệ.',
                });
            }

            const results = [];
            for (const id of ids) {
                const checkUser = await User.findOne({ _id: id });
                if (checkUser === null) {
                    results.push({
                        id,
                        status: 'ERR',
                        message: 'Sản phẩm không tồn tại.',
                    });
                } else {
                    await User.findByIdAndDelete(id);
                    results.push({
                        id,
                        status: 'OK',
                        message: 'Đã xóa thành công.',
                    });
                }
            }

            resolve({
                status: 'OK',
                message: 'Xóa người dùng hoàn tất.',
                details: results,
            });
        } catch (e) {
            reject({
                status: 'ERR',
                message: 'Đã xảy ra lỗi khi xóa người dùng .',
                error: e,
            });
            console.error('Lỗi trong deleteMultipleUser:', e);
        }
    });
};
module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    deleteMultipleUser
}
