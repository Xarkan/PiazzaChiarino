import express from 'express';
const router = express.Router(),
    User = require('../model/user'),
    auth = require('../middlewares/auth');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + req.session.user.id)
    }
});

const upload = multer({ storage: storage })

router.get('/:id', auth, async (req, res) => {
    const user = await User.get(req.params.id);
    res.send(user);
});

router.post('/login', async (req, res) => {
    const user = await User.authenticate(req.body.mail, req.body.password);
    if (user) {
        req.session.user = user;
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }

});

router.post('/signin', async (req, res) => {
    const mail = req.body.mail;
    const password = req.body.password;
    const username = req.body.username;
    const user = await User.create(mail, password, username);
    if (user) {
        delete user.password;
        req.session.user = user;
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

router.post('/logout', auth, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            res.sendStatus(200);
            console.log('session:' + req.session);
        }
    })

});

router.post('/avatar', auth, upload.single('avatar'), (req, res) => {
    res.sendStatus(200);
})

module.exports = router