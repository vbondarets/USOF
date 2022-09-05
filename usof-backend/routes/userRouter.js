const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.get('/users', checkRole('ADMIN'), userController.getAll);
router.get('/users/:id', checkRole('ADMIN'), userController.getUserById);
router.post('/users', checkRole('ADMIN'), userController.createUser);
router.patch('/users/avatar', checkRole('ADMIN'), userController.changeAvatar);
router.patch('/users/:id', checkRole('ADMIN'), userController.changeUserById);
router.delete('/users/:id', checkRole('ADMIN'), userController.deleteUserById);