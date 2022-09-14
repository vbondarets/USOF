const Model = require('./model');
const pool = require('./db');

class User extends Model{
    constructor(fullName, login, email, password, role, profileImg, rating, id){
        super('user');
        this.fullName = fullName;
        this.login = login;
        this.email = email;
        this.password = password;
        this.role = role;
        this.profileImg = profileImg;
        this.rating = rating;
        this.id = id;
    }
    getAll(){
        return pool.execute(`SELECT * FROM user`)
            .then(res => {
                if (res[0].length > 0) {
                    return res[0];
                } else {
                    return "NOT FOUND";
                }
            })
            .catch(err => {
                console.error(err);
                return err;
            });
    }
    getUserById(id){
        return pool.execute(`SELECT * FROM user WHERE id=${id}`)
            .then(res =>{
                if(res[0].length > 0){
                    return super.find(res[0][0]['id']);
                }
                else{
                    return "NOT FOUND";
                }
            })
            .catch(err =>{
                console.log(err);
                return "NOT FOUND";
            });
    }
    createUser(){
        return pool.execute(`INSERT INTO user (fullName, login, email, password, role, profileImg, rating) VALUES (?, ?, ?, ?, ?, ?, ?)`, [this.fullName, this.login, this.email, this.password, this.role, this.profileImg, this.rating])
        .then(res =>{
            this.id = res[0].insertId;
            console.log("User Created");
            return "Created"; 
        })
        .catch(err=>{
            console.log(err);
            return err.message;
        });
    }
    changeAvatar(id, profileImg){
        return pool.execute(`UPDATE user SET profileImg=${profileImg} WHERE id=${id}`)
        .then(res =>{
            this.id = res[0].insertId;
            console.log("Img changed");
            return "Changed"; 
        })
        .catch(err=>{
            console.log(err);
            return err.message;
        });
    }
    changeUserById(id){
        return pool.execute(`UPDATE user SET fullName=${this.fullName} login=${this.login} email=${this.email} password=${this.password} role=${this.role} profileImg=${this.profileImg} rating=${this.rating} WHERE id=${id}`)
        .then(res =>{
            this.id = res[0].insertId;
            console.log("User changed");
            return "Changed"; 
        })
        .catch(err=>{
            console.log(err);
            return err.message;
        });
    }
    deleteUserById(id){
        return pool.execute(`DELETE FROM user WHERE id=${id}`)
        .then(res =>{
            this.id = res[0].insertId;
            console.log("User deleted");
            return "Deleted"; 
        })
        .catch(err=>{
            console.log(err);
            return err.message;
        });
    }
    find(id, login, email){
        if(id){
            return pool.execute(`SELECT * FROM user WHERE id=${id}`)
            .then(res =>{
                if(res[0].length > 0){
                    return super.find(res[0][0]['id']);
                }
                else{
                    return "NOT FOUND";
                }
            })
            .catch(err =>{
                console.log(err);
                return "NOT FOUND";
            });
        }
        else if(login){
            return pool.execute(`SELECT * FROM user WHERE login="${login}"`)
            .then(res =>{
                if(res[0].length > 0){
                    return super.find(res[0][0]['id']);
                }
                else{
                    return "NOT FOUND";
                }
            })
            .catch(err =>{
                console.log(err);
                return "NOT FOUND";
            });
        }
        else if(email){
            return pool.execute(`SELECT * FROM user WHERE email="${email}"`)
            .then(res =>{
                if(res[0].length > 0){
                    return super.find(res[0][0]['id']);
                }
                else{
                    return "NOT FOUND";
                }
            })
            .catch(err =>{
                console.log(err);
                return "NOT FOUND";
            });
        }
    }
}
module.exports = User;