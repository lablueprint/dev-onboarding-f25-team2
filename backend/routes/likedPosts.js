const express = require('express');
const {
    likePost,
    unlikePost,
    getLikedPosts
} = require('../controllers/likedPostController');

const router = express.Router();

router.post('/likePost', likePost);
router.post('/unlikePost', unlikePost);
router.get('/getLikedPosts/:id', getLikedPosts);

module.exports = router;