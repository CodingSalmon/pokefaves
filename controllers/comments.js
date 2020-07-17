const Comment = require('../models/comment');

module.exports = [
    create,
    deleteOne
];

function create(req, res) {
    // req.body.postedBy = req.user.id
    Comment.create(req.body)
    .then(comment => {res.json(comment)})
    .catch(err => {res.json(err)});
};

function deleteOne(req, res) {
    Comment.findByIdAndDelete(req.params.id)
    .then(comment => {res.json(comment)})
    .catch(err => {res.json(err)});
};