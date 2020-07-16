const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    msg: {
        type: String,
        max_length: 20
    },
    postedBy: mongoose.Schema.Types.ObjectId,
    
})

module.exports = mongoose.model('Comment', commentSchema);