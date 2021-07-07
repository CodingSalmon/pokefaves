const User = require('../models/user');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  show,
  favorite,
  unFavorite
};

function createJWT(user) {
  return jwt.sign(
    {user},
    SECRET,
    {expiresIn: '24h'}
  );
}

async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(401).json({err: 'Bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

function show(req, res) {
  User.findById(req.params.id)
  .then(user => res.json(user))
  .catch(err => res.json(err))
}

function favorite(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(newUser => {
    const token = createJWT(newUser);
    res.json({newUser, token})
  })
}

function unFavorite(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(newUser => {
    const token = createJWT(newUser);
    res.json({newUser, token})
  })
}