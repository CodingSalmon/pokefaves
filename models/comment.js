const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    postedBy: mongoose.Schema.Types.ObjectId,
    msg: {
        type: String,
        max_length: 20
    },
    
})

module.exports = mongoose.model('Comment', commentSchema);