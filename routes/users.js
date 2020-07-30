const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');

router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.get('/user/:id', usersCtrl.show);

router.use(require('../config/auth'));

router.post('/user/:id/:pokemonName', checkAuth, usersCtrl.favorite);

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;