const LikedPost2 = require('../models/LikedPostModel');

const likePost = async (req, res) => {
    const { postId, title, description } = req.body;
    
    try {
        // See if this post exists in DB
        let likedPost = await LikedPost2.findOne({ postId });

        if(!likedPost) {
            const response = await LikedPost2.create({
                postId, title, description
            });
            return res.status(200).json({ message: 'Post liked successfully. New document created.', response});
        } else {
            return res.status(200).json({ message: 'Post liked successfully.'});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const unlikePost = async (req, res) => {
    const { postId } = req.body;

    try {
        await LikedPost2.findOne({ postId });
        await LikedPost2.findOneAndDelete({ postId })
        return res.status(200).json({ message: 'Post unliked successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getLikedPosts = async (req, res) => {
    try {
        // Find all posts where userId is included in userId array
        const likedPosts = await LikedPost2.find();
        res.status(200).json(likedPosts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const isLiked = async (req, res) => {
    const {id: postId} = req.params;

    try {
        const post = await LikedPost2.exists({ postId });
        if (post) 
            res.status(200).json({ isLiked: true, message: "Post found" });
        else
            res.status(401).json({ isLiked: false, message: "Post not found" });
    } catch {
        res.status(500).json({ message: "Post not found" });
    }
}

module.exports = {
    likePost, unlikePost, getLikedPosts, isLiked
};