const LikedPost2 = require('../models/LikedPostModel');

const likePost = async (req, res) => {
    const { title, description, userId } = req.body;
    
    try {
        // See if this post exists in DB
        let likedPost = await LikedPost2.findOne({ title });

        if(!likedPost) {
            // This post has never been liked yet
            // Create in database
            const response = await LikedPost2.create({
                title, description, userId: [userId]
            });
            return res.status(200).json({ message: 'Post liked successfully. New document created.', response});
        } else {
            // This post has been liked before
            // Add current userId to the array
            const response = await LikedPost2.findOneAndUpdate(
                { title }, { $addToSet: { userId } }, {new: true}
            )
            return res.status(200).json({ message: 'Post liked successfully.', response});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const unlikePost = async (req, res) => {
    const { title, userId } = req.body;

    try {
        await LikedPost2.findOne({ title });
        await LikedPost2.findOneAndUpdate(
            {title}, { $pull: { userId: userId }}, {new: true}
        )
        return res.status(200).json({ message: 'Post unliked successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getLikedPosts = async (req, res) => {
    const {id: userId} = req.params;
    console.log("Querying with ID:", userId, "Type:", typeof userId);

    if(!userId) {
        return res.status(401).json({ error: 'User is not authenticated'} );
    }

    try {
        // Find all posts where userId is included in userId array
        const likedPosts = await LikedPost2.find({ userId: userId }).sort({ createdAt: -1 })
        res.status(200).json(likedPosts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    likePost, unlikePost, getLikedPosts
};