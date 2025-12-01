const express = require('express');
const {
    getAllPosts, 
    getPost,
    createPost,
    deletePost,
    addComment,
} = require('../controllers/postController');

const router = express.Router();

// general routes
router.get('/', getAllPosts);
router.get('/:id', getPost);
router.post('/', createPost);
router.delete('/:id', deletePost);
router.patch('/:id', addComment);

module.exports = router;
