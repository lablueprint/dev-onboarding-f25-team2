const mongoose = require('mongoose')

const Schema = mongoose.Schema

const likedPostSchema = new Schema({
    postId: {
        type: String,
        unique: true,
    },
    title: {
        type: String,
    },
    description: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('LikedPost2', likedPostSchema)
