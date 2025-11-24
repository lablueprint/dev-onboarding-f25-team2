const mongoose = require('mongoose')

const Schema = mongoose.Schema

const likedPostSchema = new Schema({
    title: {
        type: String,
        unique: true,
    },
    description: {
        type: String
    },
    userId: {
        type: [String]
    }
}, { timestamps: true })

module.exports = mongoose.model('LikedPost2', likedPostSchema)
