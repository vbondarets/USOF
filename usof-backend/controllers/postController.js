const ApiError = require("../error/ApiError");
const Post = require('../models/PostModel');
const Comment = require('../models/CommentModel');
const Category =  require('../models/CategoryModel');
const Like =  require('../models/LikeModel');

class PostController {
    async getAll(req, res, next) {
        let post = new Post();
        post.getAll().then(resp => {
            if (resp == "NOT FOUND") {
                return next(ApiError.badRequest(resp));
            }
            else {
                return res.json({ posts: resp })
            }
        });
    }
    async getById(req, res, next) {
        let { id } = req.params;
        let post = new Post();
        post.getById(id).then(resp => {
            if (resp == "NOT FOUND") {
                return next(ApiError.badRequest(resp));
            }
            else {
                return res.json({ post: resp })
            }
        });
    }
    async getPostComments(req, res, next) {
        let { id } = req.params;
        let comment = new Comment();
        comment.getComments(id).then(resp => {
            if (resp == "NOT FOUND") {
                return next(ApiError.badRequest(resp));
            }
            else {
                return res.json({ comments: resp })
            }
        });

    }
    async createPostComment(req, res, next) {
        let {authorId, publishDate, content} = req.body;
        let comment = new Comment(authorId, publishDate, content);
        comment.create().then(resp=>{
            if (resp == "Created"){
                return res.json({ resp: resp });
            }
            else {
                return next(ApiError.internal('Unknown err: '+ resp));
            }
        });
    }
    async getPostCategories(req, res, next) {
        let {id} = req.params;
        let category = new Category();
        category.getAll(id).then(resp => {
            if (resp == "NOT FOUND") {
                return next(ApiError.badRequest(resp));
            }
            else{
                return res.json({categories: resp})
            }
        });
    }
    async getPostLikes(req, res, next) {
        let {id} = req.params;
        let like = new Like();
        like.getAllPost(id).then(resp => {
            if (resp == "NOT FOUND") {
                return next(ApiError.badRequest(resp));
            }
            else{
                return res.json({likes: resp})
            }
        });
    }
    async createPost(req, res, next) {
        let {author_id, title, publishDate, content, category_id} = req.body
        let post = new Post(author_id, title, publishDate, content, category_id);
        post.create().then(resp => {
            if (resp == "Created") {
                return res.json({resp: resp});
            }
            else{
                return next(ApiError.internal('Unknown err: '+ resp));
            }
        });
    }
    async createPostLike(req, res, next) {
        let { id } = req.params;
        let {authorId, publishDate, commentId, type} = req.body;
        let like = new Like(authorId, publishDate, id, commentId, type);
        like.create().then(resp => {
            if (resp == "Created") {
                return res.json({resp: resp});
            }
            else{
                return next(ApiError.internal('Unknown err: '+ resp));
            }
        });
    }
    async changePostById(req, res, next) {
        let {id} = req.params;
        let {author_id, title, publishDate, content, category_id} = req.body
        let post = new Post(author_id, title, publishDate, content, category_id);
        post.change(id).then(resp => {
            if (resp == "Changed") {
                return res.json({resp: resp});
            }
            else{
                return next(ApiError.internal('Unknown err: '+ resp));
            }
        });
    }
    async deletePostById(req, res, next) {
        let {id} = req.params;
        let post = new Post();
        post.delete(id).then(resp => {
            if (resp == "Deleted") {
                return res.json({resp: resp});
            }
            else{
                return next(ApiError.conflict('Uncorrect id: '+ resp));
            }
        });
    }
    async deletePostLike(req, res, next) {
        let {id} = req.params;
        let {like_id} = req.body;
        let like = new Like();
        like.delete(post_id, like_id).then(resp => {
            if (resp == "Deleted") {
                return res.json({resp: resp});
            }
            else{
                return next(ApiError.conflict('Uncorrect id: '+ resp));
            }
        });

    }
}
module.exports = new PostController();