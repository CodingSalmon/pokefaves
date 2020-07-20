const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');

router.get('/', commentsCtrl.getAll);

router.post('/:pokemonName', commentsCtrl.create);

router.use(require('../config/auth'));


router.delete('/:id', commentsCtrl.deleteOne);

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
};

module.exports = router;