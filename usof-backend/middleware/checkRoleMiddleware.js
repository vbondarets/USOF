const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');
const secureConfig = require('../secureConfig.json');

module.exports = function (role){
    return function (req, res, next){
        if(req.method === "OPTIONS"){
            next();
        }
        try{
            const token = req.headers.authorization.split(' ')[1];
            if (!token){
                return next(ApiError.unauthorized('Token missing'));
            }
            const decoded = jwt.verify(token, secureConfig.SECRET_KEY);
            if(decoded.role != role){
                return next(ApiError.forbidden('Acces denied'));
            }
            req.user = decoded;
            next();
        } catch(err){
            return next(ApiError.unauthorized('Unauthorized'));
        }
    }
}

