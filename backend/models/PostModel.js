const mongoose = require('mongoose')

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
    }
}, { timestamps: true })

const likedPostSchema = new Schema({
    userID: {
        type: String
    },
    postId: {
        type:String,
        unique: true,
        default: function() {
            return new mongoose.Types.ObjectId().toString();
        }
    }
})

module.exports = mongoose.model('Post', postSchema)
module.exports = mongoose.model('Liked Post', likedPostSchema)
