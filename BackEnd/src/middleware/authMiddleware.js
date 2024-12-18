const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const authMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1];
    console.log('user?.isAdmin',user?.isAdmin)

    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) { 
        if (err) {
            return res.status(401).json({ 
                message: 'Unauthorized' ,
                status: "Error authenticating"
            });
        }
        if (user?.isAdmin) {
            next();
        } else {
            return res.status(404).json({
                message: 'Unauthorized' ,
                status: "Error authenticating"
            });
        }
    
});
}

const authUserMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1];
    const userId = req.params.id  
    // console.log(' req.params._id', req.params) 
    
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) { 
        if (err) {
            return res.status(401).json({ 
                message: 'Unauthorized' ,
                status: "Error 401 authenticating"
            });
        } 
        if (user?.isAdmin || user?.id === userId) {
            next();
        } else {
            return res.status(404).json({
                message: 'Unauthorized' ,
                status: "Error 404 authenticating"
            });
        }
    
});
}

module.exports = {
    authMiddleware,
    authUserMiddleware
}