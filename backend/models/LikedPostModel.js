const mongoose = require('mongoose')

const Schema = mongoose.Schema

const likedPostSchema = new Schema({
    postID: {
        type: String,
        unique: true
    },
    userId: {
        type: [String]
    }
}, { timestamps: true })

module.exports = mongoose.model('LikedPost', likedPostSchema)
