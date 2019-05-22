import express from 'express';
const router = express.Router(),
    Reaction = require('../model/reaction'),
    auth = require('../middlewares/auth');


router.get('/:id', auth, async (req, res) => {
    const result = await Reaction.list(req.params.id);
    res.send(result);
});

router.post('/', auth, async (req, res) => {
    req.body.post = { id: 2 }; //da togliere 
    const author = req.user;
    const post = req.body.post;
    const saved = await Reaction.create(author, post);
    if (saved) {
        res.sendStatus(201);
    } else {
        res.sendStatus(400);
    }

});

router.delete('/:id', auth, async (req, res) => {
    const deleted = await Reaction.delete(req.params.id, req.user);
    if (deleted) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }

})

module.exports = router