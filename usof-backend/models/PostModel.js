const Model = require('./model');
const pool = require('./db');

class Post extends Model{
    constructor(author_id, title, publishDate, status, content, category_id, id){
        super('post');
        this.author_id = author_id;
        this.title = title;
        this.publishDate = publishDate;
        this.status = status;
        this.content = content;
        this.category_id = category_id;
        this.id = id;
    }
    getAll(){
        return pool.execute(`SELECT * FROM post`)
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
        return pool.execute(`SELECT * FROM post WHERE id=${id}`)
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
    createPost(){
        return pool.execute(`INSERT INTO post (author_id, title, publishDate, status, content, category_id) VALUES (?, ?, ?, ?, ?, ?)`, [this.author_id, this.title, this.publishDate, this.status, this.content, this.category_id])
        .then(res =>{
            this.id = res[0].insertId;
            console.log("Post Created");
            return "Created"; 
        })
        .catch(err=>{
            console.log(err);
            return err.message;
        });
    }
    changePostById(id){
        return pool.execute(`UPDATE post SET author_id=${this.author_id} title=${this.title} publishDate=${this.publishDate} status=${this.status} content=${this.content} category_id=${this.category_id} WHERE id=${id}`)
        .then(res =>{
            this.id = res[0].insertId;
            console.log("Post changed");
            return "Changed"; 
        })
        .catch(err=>{
            console.log(err);
            return err.message;
        });
    }
    deletePostById(id){
        return pool.execute(`DELETE FROM post WHERE id=${id}`)
        .then(res =>{
            this.id = res[0].insertId;
            console.log("Post deleted");
            return "Deleted"; 
        })
        .catch(err=>{
            console.log(err);
            return err.message;
        });
    }
    getByCategory(id){
        return pool.execute(`SELECT * FROM post WHERE category_id=${id}`)
            .then(res =>{
                if(res[0].length > 0){
                    return res[0];
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

module.exports = Post;