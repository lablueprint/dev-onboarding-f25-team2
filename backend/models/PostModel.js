const mongoose = require('mongoose')

const Schema = mongoose.Schema

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
    }, 
    { 
        timestamps: true,
    },
);

const postSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    userID: {
        type: String
    },
    postID: { 
        type: String, 
        unique: true,
        default: function() {
            return new mongoose.Types.ObjectId().toString();
        }
    },
    likedId: {
        type: [String],
        unique: true,
    },
    comments: [commentSchema],
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)
