const Model = require('./model');
const pool = require('./db');

class Category extends Model{
    constructor(title, description, id){
        super('category');
        this.title = title;
        this.description = description;
        this.id = id;
    }
    getAll(id){
        return pool.execute(`SELECT * FROM category`)
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
    getById(id){
        return pool.execute(`SELECT * FROM category WHERE id=${id}`)
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
    create(){
        return pool.execute(`INSERT INTO category (title, description) VALUES (?, ?)`, [this.title, this.description])
        .then(res =>{
            this.id = res[0].insertId;
            console.log("Category Created");
            return "Created"; 
        })
        .catch(err=>{
            console.log(err);
            return err.message;
        });
    }
    changeById(id){
        return pool.execute(`UPDATE category SET title=${this.title} description=${this.description} WHERE id=${id}`)
        .then(res =>{
            this.id = res[0].insertId;
            console.log("Category changed");
            return "Changed"; 
        })
        .catch(err=>{
            console.log(err);
            return err.message;
        });
    }
    deleteById(id){
        return pool.execute(`DELETE FROM category WHERE id=${id}`)
        .then(res =>{
            this.id = res[0].insertId;
            console.log("Category deleted");
            return "Deleted"; 
        })
        .catch(err=>{
            console.log(err);
            return err.message;
        });
    }
}
module.exports = Category;