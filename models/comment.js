const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    msg: {
        type: String,
        max_length: 20
    },
    // postedBy: String,
    pokemonName: String
}, {
    timestamps:true
})

module.exports = mongoose.model('Comment', commentSchema);