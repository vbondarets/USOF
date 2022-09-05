const Router = require('express');
const router = new Router();
const postController = require('../controllers/postController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.get('/posts', postController.getAll);
router.get('/posts/:id', postController.getById);
router.get('/posts/:id/comments', postController.getPostComments);
router.post('/posts/:id/comments', postController.createPostComment);
router.get('/posts/:id/categories', postController.getPostCategories);
router.get('/posts/:id/like', postController.getPostLikes);
router.post('/', postController.createPost);
router.post('/posts/:id/like', postController.createPostLike);
router.patch('/posts/:id', postController.changePostById);
router.delete('/posts/:id', postController.deletePostById);
router.delete('/posts/:id/like', postController.deletePostLike);