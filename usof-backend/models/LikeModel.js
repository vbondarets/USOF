const Model = require('./model');
const pool = require('./db');

class Like extends Model{
    constructor(author_id, publishDate, postId, commentId, type, id){
        super('like');
        this.author_id = author_id;
        this.publishDate = publishDate;
        this.postId = postId;
        this.commentId = commentId;
        this.type = type;
        this.id = id;
    }
    getAllPost(id){
        return pool.execute(`SELECT * FROM like WHERE postId=${id}`)
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
    getAllComment(id){
        return pool.execute(`SELECT * FROM like WHERE commentId=${id}`)
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
    create(){
        return pool.execute(`INSERT INTO like (author_id, publishDate, postId, commentId, type) VALUES (?, ?, ?, ?, ?)`, [this.author_id, this.publishDate, this.postId, this.commentId, this.type])
        .then(res =>{
            this.id = res[0].insertId;
            console.log("Like Created");
            return "Created"; 
        })
        .catch(err=>{
            console.log(err);
            return err.message;
        });

    }
    deletePostLike(id){
        return pool.execute(`DELETE FROM like WHERE id=${id}`)
        .then(res =>{
            this.id = res[0].insertId;
            console.log("Like deleted");
            return "Deleted"; 
        })
        .catch(err=>{
            console.log(err);
            return err.message;
        });
    }
}
module.exports = Like;