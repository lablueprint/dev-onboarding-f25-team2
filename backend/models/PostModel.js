const mongoose = require('mongoose')
const commentSchema = require('./CommentModel')

const Schema = mongoose.Schema

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
