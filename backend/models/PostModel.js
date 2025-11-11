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

module.exports = mongoose.model('Post', postSchema)
