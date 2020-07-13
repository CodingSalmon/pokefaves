const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 6;

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    favPokes: {
        bug: String,
        dark: String,
        dragon: String,
        electric: String,
        fairy: String,
        fighting: String,
        fire: String,
        flying: String,
        ghost: String,
        grass: String,
        ground: String,
        ice: String,
        normal: String,
        poison: String,
        psychic: String,
        rock: String,
        steel: String,
        water: String
    }
}, {
    timestamps:true
});

userSchema.set('toJSON', {
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  });

userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
        if(err) return next(err);
        user.pasword = hash;
        next();
    });
});

userSchema.methods.comparePassword = function(tryPassword, cb) {
    bcrypt.compare(tryPassword, this.password, cb);
  };

module.exports = mongoose.model('User', userSchema);