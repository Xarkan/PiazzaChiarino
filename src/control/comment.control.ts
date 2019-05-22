import express from 'express';
const router = express.Router(),
    Comment = require('../model/comment'),
    auth = require('../middlewares/auth');

router.get('/:id', auth, async (req, res) => { //id del post del quale si vogliono i commenti
    const result = await Comment.list(req.params.id);
    res.send(result);
});

router.post('/', auth, async (req, res) => {
    req.body.post = { id: 3 }; //da togliere 
    const author = req.user;
    const post = req.body.post;
    const body = req.body.body;
    const saved = await Comment.create(author, post, body);
    if (saved) {
        res.sendStatus(201);
    } else {
        res.sendStatus(400);
    }

});

router.delete('/:id', auth, async (req, res) => {
    const deleted = await Comment.delete(req.params.id, req.user);
    if (deleted) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
})

module.exports = router