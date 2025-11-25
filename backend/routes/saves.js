const express = require("express");
const {
  savePost,
  unsavePost,
  getSavedPosts,
} = require("../controllers/saveController");

const router = express.Router();

// routes
router.post("/", savePost);
router.delete("/", unsavePost);
router.get("/:userID", getSavedPosts);

module.exports = router;
