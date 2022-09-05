const Router = require('express');
const router = new Router();

const authRouter = require('./authRouter');
const usersRouter = require('./usersRouter');
const postsRouter = require('./postsRouter');
const categoriesRouter = require('./categoriesRouter');
const commentsRouter = require('./commentsRouter');

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/posts', postsRouter);
router.use('/categories', categoriesRouter);
router.use('/comments', commentsRouter);


module.exports = router;