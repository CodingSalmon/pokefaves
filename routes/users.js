const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');

router.get('/:id', usersCtrl.show);
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);

router.use(require('../config/auth'));

router.put('/:id/:type/:pokemonName', checkAuth, usersCtrl.favorite);

router.put('/un/:id/:type/:pokemonName', checkAuth, usersCtrl.unFavorite);

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;