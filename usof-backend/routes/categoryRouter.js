const Router = require('express');
const router = new Router();
const CategoryController = require('../controllers/categoryController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.get('/categories', checkRole('ADMIN'), CategoryController.getAll);
router.get('/categories/:id', checkRole('ADMIN'), CategoryController.getCategoryById);
router.get('/categories/:id/posts', checkRole('ADMIN'), CategoryController.getCategoryPosts);
router.post('/categories', checkRole('ADMIN'), CategoryController.createCategory);
router.patch('/categories/:id', checkRole('ADMIN'), CategoryController.changeCategoryById);
router.delete('/categories/:id', checkRole('ADMIN'), CategoryController.deleteCategory);