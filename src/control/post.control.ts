import express from 'express';
const router = express.Router();
const Post = require('../model/post');
const auth = require('../middlewares/auth');

router.get('/:id', auth, async(req, res) => {
    const post = await Post.get(req.params.id);
    res.send(post);
});

router.post('/', auth, async(req, res) => {
    const author = req.user;
    const lat = req.body.latitude;
    const long = req.body.longitude;
    const body = req.body.body;
    const type = req.body.type;
    const saved = await Post.create(author,lat,long,body,type);
    if(saved) {
        res.sendStatus(201);
    } else {
        res.sendStatus(400);
    }
});

module.exports = router