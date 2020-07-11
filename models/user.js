const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const SALT_ROUNDS = 6;

const userSchema = new Schema({
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

module.exports = models.model('User', userSchema);