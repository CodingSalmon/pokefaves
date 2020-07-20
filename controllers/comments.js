const Comment = require('../models/comment');

module.exports = {
    getAll,
    create,
    deleteOne
};

function getAll(req, res) {
    console.log('we are here')
    Comment.find({})
    .then(comments => {res.json(comments)})
    .catch(err => {res.json(err)});
};

function create(req, res) {
    // req.body.postedBy = req.user.id
    req.body.pokemonName = req.params.pokemonName
    Comment.create(req.body)
    .then(comment => {res.json(comment)})
    .catch(err => {res.json(err)});
};

function deleteOne(req, res) {
    Comment.findByIdAndDelete(req.params.id)
    .then(comment => {res.json(comment)})
    .catch(err => {res.json(err)});
};