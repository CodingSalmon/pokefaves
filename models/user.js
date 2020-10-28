const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const userSchema = new mongoose.Schema({
  name: String,
  email: {type: String, required: true, lowercase: true, unique: true},
  password: String,
  favorites: {
    bug: {type: String, default:''},
    dark: {type: String, default:''},
    dragon: {type: String, default:''},
    electric: {type: String, default:''},
    fairy: {type: String, default:''},
    fighting: {type: String, default:''},
    fire: {type: String, default:''},
    flying: {type: String, default:''},
    ghost: {type: String, default:''},
    grass: {type: String, default:''},
    ground: {type: String, default:''},
    ice: {type: String, default:''},
    normal: {type: String, default:''},
    poison: {type: String, default:''},
    psychic: {type: String, default:''},
    rock: {type: String, default:''},
    steel: {type: String, default:''},
    water: {type: String, default:''},
  },
}, {
  timestamps: true
});

userSchema.set('toJSON', {
  transform: function(doc, ret) {
    // remove the password property when serializing doc to JSON
    delete ret.password;
    return ret;
  }
});

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  // password has been changed - salt and hash it
  bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
    if (err) return next(err);
    // replace the user provided password with the hash
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(tryPassword, cb) {
  bcrypt.compare(tryPassword, this.password, cb);
};

module.exports = mongoose.model('User', userSchema);