const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');

router.get('/', commentsCtrl.getAll);

router.use(require('../config/auth'));

router.post('/:pokemonName', commentsCtrl.create);



router.delete('/:id', commentsCtrl.deleteOne);

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
};

module.exports = router;