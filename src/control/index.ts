import express from 'express';
const router = express.Router();
const auth = require('../middlewares/auth');
const Post = require('../model/post')

router.use('/user', require('./user.control'));
router.use('/comment', require('./comment.control'));
router.use('/post', require('./post.control'));
router.use('/reaction', require('./reaction.control'));

router.get('/:latitude/:longitude/:range', auth, async (req, res, next) => {
    const result = await Post.list(req.params.latitude, 
                                    req.params.longitude,
                                    req.params.range,
                                    req.user);
    res.send(result);
});

module.exports = router