const ApiError = require("../error/ApiError");
const User = require('../models/UserModel');

function jwtGenerator(id, login, email, role){
    const token = jwt.sign(
        {id: id, login: login, email: email, role: role}, 
        secureConfig.SECRET_KEY,
        {expiresIn: '12h'}
    );
    return token;
}

class AuthController{
    async registration(req, res, next){
        let {login, email, password, role, fullName, profileImg} = req.body;
        if (!login || !email || !password || fullName){
            return next(ApiError.conflict('Missing Data'));
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User(login, email, fullName, hashedPassword, role, profileImg);
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
    async login(req, res, next){
        const {id, login, email, password} = req.body;
        const user = new User();
        user.find(id, login, email).then(resp =>{
            if(resp == 'NOT FOUND'){
                return next(ApiError.badRequest(resp));
            }
            else if(user){
                let comparePassword = bcrypt.compareSync(password, user.password)
                if(!comparePassword){
                    return next(ApiError.conflict('Incorrect password'));
                }
                const token = jwtGenerator(user.id, user.login, user.email, user.role);
                return res.json({token: token});
            }
            else{
                console.log(resp);
                return next(ApiError.internal('Unknown error'));
            }
        });
    }
    async logout(req, res, next){
        let token = "aboba";
        return res.json({token: token});
    };
    async resetPassword(req, res, next){
        let {id, login, email} = req.body;
        const user = new User();
        user.find(id, login, email).then(resp =>{
            if(resp == 'NOT FOUND'){
                return next(ApiError.badRequest(resp));
            }
            else{
                //otravka email po sgenerirovannoy ssilke
            }
        });
    };
    async resetPasswordAuntification(req, res, next){
        let {token} = req.params; 
        let {password} = req.body; 
        const decoded = jwt.verify(token, secureConfig.SECRET_KEY_FOR_EMAIL);
        const user = new User();
        let {id, login, email} = decoded;
        user.find(id, login, email).then(resp =>{
            if(resp == 'NOT FOUND'){
                return next(ApiError.badRequest(resp));
            }
            else{
                const hashedPassword = await bcrypt.hash(password, 10);
                user.resetPassword(id, hashedPassword).then(resp => {
                    if(resp == 'OK'){
                        return res.json({res: "OK"});;
                    }
                    else{
                        console.log(resp);
                        return next(ApiError.internal('Unknown error'));
                    }
                });
            }
        });

    };

}

module.exports = new AuthController();