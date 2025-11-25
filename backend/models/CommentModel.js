const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        commentText: { // text content of the comment
            type: String,
            trim: true,
            required: true,
            default: '',
        },
        userID: { // user who created the comment
            type: String,
        },
        postID: { // post that the comment belongs to
            type: Schema.Types.ObjectId,
            ref: 'Post',
        },
    }, 
    { 
        timestamps: true,
    },
);

module.exports = mongoose.model('Comment', commentSchema);