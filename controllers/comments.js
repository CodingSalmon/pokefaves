const Comment = require('../models/comment');

module.exports = {
    getAll,
    create,
    deleteOne
};

function getAll(req, res) {
    Comment.find({})
    .then(comments => {res.json(comments)})
    .catch(err => console.log(err));
};

function create(req, res) {
    req.body.postedBy = req.user._id;
    req.body.posterName = req.user.name;
    Comment.create(req.body)
    .then(comment => {res.json(comment)})
    .catch(err => console.log(err));
};

function deleteOne(req, res) {
    Comment.findByIdAndDelete(req.params.id)
    .then(comment => {res.json(comment)})
    .catch(err => {res.json(err)});
};