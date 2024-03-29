const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/comments");

router.get("/:pokemonName", commentsCtrl.getForPokemon);

router.use(require("../config/auth"));

router.post("/:pokemonName", checkAuth, commentsCtrl.create);

router.put("/:id", checkAuth, commentsCtrl.update);

router.delete("/:id", checkAuth, commentsCtrl.deleteOne);

function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({ msg: "Not Authorized" });
}

module.exports = router;
