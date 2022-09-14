const ApiError = require("../error/ApiError");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const secureConfig = require('../secureConfig.json');

function jwtGenerator(id, login, email, role){
    const token = jwt.sign(
        {id: id, login: login, email: email, role: role}, 
        secureConfig.SECRET_KEY,
        {expiresIn: '12h'}
    );
    return token;
}

class UserController{
    async check(req, res, next){
        const token = jwtGenerator(req.user.id, req.user.login, req.user.email, req.user.role);
        return res.json({token: token});
    }
    async getAll(req, res, next){
        const user = new User();
        user.getAll().then(resp =>{
            if(resp == "NOT FOUND"){
                return next(ApiError.badRequest('Resp: '+ resp));
            }
            else{
                return res.json({users:resp});
            }
        });
    }
    async getUserById(req, res, next){
        let {id} = req.params;
        const user = new User();
        user.getUserById(id).then(resp =>{
            if(resp == "NOT FOUND"){
                return next(ApiError.badRequest('Resp: '+ resp));
            }
            else{
                return res.json({user:resp});
            }
        });
    }
    async createUser(req, res, next){
        let {login, email, password, role, fullName} = req.body;
        const {img} = req.files;
        let profileImg = uuid.v4()+ ".jpg";
        img.mv(path.resolve(__dirname, "..", "static", profileImg));
        if (!login || !email || !password || fullName){
            return next(ApiError.conflict('Missing Data'));
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User(fullName, login, email, hashedPassword, profileImg, role);
        user.create().then(resp =>{
            if(resp != "Created"){
                const error = resp.indexOf('login') != -1 ? 'login' : 'email';
                return next(ApiError.conflict(error + ' already exist'));
            }
            else if(resp == "Created"){
                const token = jwtGenerator(user.id, user.login, user.email, user.role);
                return res.json({token: token});
            }
            else{
                return next(ApiError.internal('Unknown err: '+ resp));
            }
        });
    }
    async changeAvatar(req, res, next){
        let {id} = req.body;
        const {img} = req.files;
        let profileImg = uuid.v4()+ ".jpg";
        img.mv(path.resolve(__dirname, "..", "static", profileImg));
        const user = new User();
        user.changeAvatar(id, profileImg).then(resp =>{
            if(resp == "NOT FOUND"){
                return next(ApiError.badRequest('Resp: '+ resp));
            }
            else{
                return res.json({user:resp});
            }
        });
    }
    async changeUserById(req, res, next){
        let {login, email, password, role, fullName, profileImg, rating} = req.body;
        let{id} = req.params;
        if (!login || !email || !fullName){
            return next(ApiError.conflict('Missing Data'));
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User(fullName, login, email, hashedPassword, profileImg, role, rating);
        user.changeUserById(id).then(resp =>{
            if(resp != "Changed"){
                return next(ApiError.badRequest("Err: " + resp));
            }
            else if(resp == "Changed"){
                const token = jwtGenerator(user.id, user.login, user.email, user.role);
                return res.json({token});
            }
            else{
                return next(ApiError.internal('Unknown err: '+ resp));
            }
        });
    }
    async deleteUserById(req, res, next){
        let{id} = req.params;
        const user = new User();
        user.deleteUserById(id).then(resp =>{
            if(resp != "OK"){
                return next(ApiError.conflict('Resp: '+ resp));
            }
            else{
                return res.json({resp: resp});
            }
        });
    }
}
module.exports = new UserController();