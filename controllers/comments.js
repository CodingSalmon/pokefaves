const Comment = require("../models/comment");

module.exports = {
  getForPokemon,
  create,
  update,
  deleteOne,
};

function getForPokemon(req, res) {
  Comment.find({ pokemonName: req.params.pokemonName })
    .then((comments) => {
      res.json(comments);
    })
    .catch((err) => console.log(err));
}

function create(req, res) {
  req.body.postedBy = req.user._id;
  req.body.posterName = req.user.name;
  Comment.create(req.body)
    .then((comment) => {
      res.json(comment);
    })
    .catch((err) => console.log(err));
}

function update(req, res) {
  Comment.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((comment) => {
      res.json(comment);
    })
    .catch((err) => console.log(err));
}

function deleteOne(req, res) {
  Comment.findByIdAndDelete(req.params.id)
    .then((comment) => {
      res.json(comment);
    })
    .catch((err) => {
      res.json(err);
    });
}
