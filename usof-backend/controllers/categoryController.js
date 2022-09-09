const ApiError = require("../error/ApiError");
const Category = require('../models/CategoryModel');
const Post = require('../models/PostModel');

class CategoryController{
    async getAll(req, res, next){
        let category = new Category();
        category.getAll().then(resp => {
            if (resp == "NOT FOUND") {
                return next(ApiError.badRequest(resp));
            }
            else {
                return res.json({ categories: resp });
            }
        });
    }
    async getCategoryById(req, res, next){
        let { id } = req.params;
        let category = new Category();
        category.getById(id).then(resp => {
            if (resp == "NOT FOUND") {
                return next(ApiError.badRequest(resp));
            }
            else {
                return res.json({ category: resp });
            }
        });
        
    }
    async getCategoryPosts(req, res, next){
        let { id } = req.params;
        let post = new Post();
        post.getByCategory(id).then(resp =>{
            if (resp == "NOT FOUND") {
                return next(ApiError.badRequest(resp));
            }
            else {
                return res.json({ posts: resp });
            }
        });
    }
    async createCategory(req, res, next){
        let {title, description} = req.body;
        let category = new Category(title, description);
        category.create().then(resp =>{
            if (resp == "Created") {
                return res.json({ resp: resp });
            }
            else {
                return next(ApiError.internal('Unknown err: '+ resp));
            }
        });
        
    }
    async changeCategoryById(req, res, next){
        let { id } = req.params;
        let {title, description} = req.body;
        let category = new Category(title, description);
        category.changeById(id).then(resp =>{
            if (resp == "Err") {
                return next(ApiError.conflict('Unknown err: '+ resp));
            }
            else {
                return res.json({ resp: resp });
            }
        });
        
    }
    async deleteCategory(req, res, next){
        let { id } = req.params;
        let category = new Category();
        category.deleteById(id).then(resp =>{
            if (resp == "Err") {
                return next(ApiError.badRequest('Uncorrect Id: '+ resp));
            }
            else {
                return res.json({ resp: resp });
            }
        });
    }
}
module.exports = new CategoryController();