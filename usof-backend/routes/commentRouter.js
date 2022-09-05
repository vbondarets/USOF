const Router = require('express');
const router = new Router();
const commentController = require('../controllers/commentController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.get('/comments/:id', commentController.getCommentById);
router.get('/comments/:id/like', commentController.getCommentLikes);
router.post('/comments/:id/like', commentController.createCommentLike);
router.patch('/comments/:id', commentController.changeCommentById);
router.delete('/comments/:id', commentController.deleteCommentById);
router.delete('/comments/:id/like', commentController.deleteCommentLike);