const Router = require('express');
const router = new Router();
const authController = require('../controllers/authController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/register', authController.registration);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/password-reset', authController.resetPassword);
router.post('/password-reset/:token', authController.resetPasswordAuntification);