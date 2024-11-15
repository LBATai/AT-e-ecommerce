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
    },process.env.REFRESH_TOKEN , { expiresIn: '365d' });
    return refresh_token;
}

const refreshTokenJwtService = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('token', token);
            jwt.verify(token,process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    return reject(new Error('Invalid token'));
                }
                const { payload } = user;
                const access_token = await genneralAccessToken({
                    id: token?.id,
                    isAdmin: payload?.isAdmin 
                });
                resolve({
                    status: 'OK',
                    message: 'Successfully',
                    access_token
                })
            })

        } catch (e) {
                reject(e);
                console.log(e);
            }
        })
}

module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJwtService,
};