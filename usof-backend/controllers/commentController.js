const ApiError = require("../error/ApiError");
const Comment = require('../models/CommentModel');
const Post = require('../models/PostModel');
const Like =  require('../models/LikeModel');

class CommentController{
    async getCommentById(req, res, next){
        let { id } = req.params;
        let comment = new Comment();
        comment.getById(id).then(resp =>{
            if (resp == "NOT FOUND") {
                return next(ApiError.badRequest(resp));
            }
            else{
                return res.json({comments: resp})
            }
        });
    }
    async getCommentLikes(req, res, next){
        let { id } = req.params;
        let like = new Like();
        like.getAllComment(id).then(resp =>{
            if (resp == "NOT FOUND") {
                return next(ApiError.badRequest(resp));
            }
            else{
                return res.json({likes: resp})
            }
        });
    }
    async createCommentLike(req, res, next){
        let {id} = req.params;
        let {authorId, publishDate, commentId, type} = req.body
        let like = new Like(authorId, publishDate, id, commentId, type);
        like.create().then(resp =>{
            if (resp == "Created") {
                return res.json({ resp: resp });
            }
            else {
                return next(ApiError.internal('Unknown err: '+ resp));
            }
        });
    }
    async createComment(req, res, next){
        let {postId, authorId, publishDate, content}= req.body;
        let comment = new Comment(postId, authorId, publishDate, content);
        comment.create().then(resp =>{
            if (resp == "Created") {
                return res.json({ resp: resp });
            }
            else {
                return next(ApiError.internal('Unknown err: '+ resp));
            }
        });
    }
    async changeCommentById(req, res, next){
        let { id } = req.params;
        let {authorId, publishDate, content}= req.body;
        let comment = new Comment(authorId, publishDate, content);
        comment.changeById(id).then(resp =>{
            if (resp == "Changed") {
                return res.json({ resp: resp });
            }
            else {
                return next(ApiError.internal('Unknown err: '+ resp));
            }
        });
    }
    async deleteCommentById(req, res, next){
        let { id } = req.params;
        let comment = new Comment();
        comment.deleteById(id).then(resp =>{
            if (resp == "Err") {
                return next(ApiError.badRequest('Uncorrect Id: '+ resp));
            }
            else {
                return res.json({ resp: resp });
            }
        });
    }
    async deleteCommentLike(req, res, next){
        let { id } = req.params;
        let {like_id} = req.body;
        let comment = new Comment();
        comment.delete(like_id).then(resp =>{
            if (resp == "Err") {
                return next(ApiError.badRequest('Uncorrect Id: '+ resp));
            }
            else {
                return res.json({ resp: resp });
            }
        });
    }

}
module.exports = new CommentController();