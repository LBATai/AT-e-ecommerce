const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const genneralAccessToken = async (payload) => {
    const access_token = jwt.sign({
        ...payload
    },process.env.ACCESS_TOKEN , { expiresIn: '1h' });
    return access_token;
}

const genneralRefreshToken = async (payload) => {
    const refresh_token = jwt.sign({
        ...payload
    },process.env.REFRESH_TOKEN , { expiresIn: '7d' });
    return refresh_token;
}

const refreshTokenJwtService = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log('token', token);
            jwt.verify(token,process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    return reject(new Error('Invalid token'));
                }
                const access_token = await genneralAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin 
                });
                resolve({
                    status: 'OK',
                    message: 'Successfully',
                    access_token
                })
            })

        }catch (e) {
            console.error('Error Details:', { name: e.name, message: e.message, stack: e.stack });
            return res.status(500).json({
                status: 'ERROR',
                message: 'Internal server error'
            });
        }
        })
}

module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJwtService,
};