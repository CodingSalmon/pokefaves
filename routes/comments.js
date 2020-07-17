const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');

router.post('/', function(req, res) {
    commentsCtrl.create
});

router.delete('/:id', function(req, res) {
    commentsCtrl.deleteOne
});
router.use(require('../config/auth'));

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
};

module.exports = router;