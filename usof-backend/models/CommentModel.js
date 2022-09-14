const Model = require('./model');
const pool = require('./db');

class Comment extends Model{
    constructor(postId, authotId, publishDate, id){
        super('comment');
        this.postId = postId;
        this.authotId = authotId;
        this.publishDate = publishDate;
        this.content = content;
        this.id = id;
    }
    getAll(id){
        return pool.execute(`SELECT * FROM comment WHERE postId=${id}`)
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
        return pool.execute(`SELECT * FROM comment WHERE id=${id}`)
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
        return pool.execute(`INSERT INTO comment (postId, authorId, publishDate, context) VALUES (?, ?, ?, ?)`, [this.postId, this.authorId, this.publishDate, this.context])
        .then(res =>{
            this.id = res[0].insertId;
            console.log("Comment Created");
            return "Created"; 
        })
        .catch(err=>{
            console.log(err);
            return err.message;
        });

    }
    changeById(id){
        return pool.execute(`UPDATE comment SET postId=${this.postId} authorId=${this.authorId} publishDate=${this.publishDate} context=${this.context} WHERE id=${id}`)
        .then(res =>{
            this.id = res[0].insertId;
            console.log("Comment changed");
            return "Changed"; 
        })
        .catch(err=>{
            console.log(err);
            return err.message;
        });
    }
    deleteById(id){
        return pool.execute(`DELETE FROM comment WHERE id=${id}`)
        .then(res =>{
            this.id = res[0].insertId;
            console.log("Comment deleted");
            return "Deleted"; 
        })
        .catch(err=>{
            console.log(err);
            return err.message;
        });
    }
}

module.exports = Comment;