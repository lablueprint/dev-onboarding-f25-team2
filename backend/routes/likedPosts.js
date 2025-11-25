const express = require('express');
const {
    likePost,
    unlikePost,
    getLikedPosts,
    isLiked
} = require('../controllers/likedPostController');

const router = express.Router();

router.post('/likePost', likePost);
router.post('/unlikePost', unlikePost);
router.get('/getLikedPosts', getLikedPosts);
router.get('/isLiked/:id', isLiked);


module.exports = router;