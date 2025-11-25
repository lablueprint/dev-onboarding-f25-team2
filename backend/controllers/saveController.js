const Save = require("../models/SaveModel");
const Post = require("../models/PostModel");
const mongoose = require("mongoose");

// save a post to user's saved list
const savePost = async (req, res) => {
  try {
    const { userID, postID } = req.body;

    if (!userID || !postID) {
      return res.status(400).json({ error: "userID and postID are required" });
    }

    // Validate postID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(postID)) {
      return res.status(400).json({ error: "Invalid postID format" });
    }

    // Check if post exists
    const post = await Post.findById(postID);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if already saved
    const existingSave = await Save.findOne({ userID, postID });
    if (existingSave) {
      return res.status(400).json({ error: "Post already saved" });
    }

    // Create save
    const save = await Save.create({ userID, postID });
    res.status(200).json(save);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// unsave a post
const unsavePost = async (req, res) => {
  try {
    const { userID, postID } = req.body;

    if (!userID || !postID) {
      return res.status(400).json({ error: "userID and postID are required" });
    }

    // Validate postID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(postID)) {
      return res.status(400).json({ error: "Invalid postID format" });
    }

    // Find and delete the save
    const save = await Save.findOneAndDelete({ userID, postID });

    if (!save) {
      return res.status(404).json({ error: "Saved post not found" });
    }

    res.status(200).json(save);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all saved posts for a user
const getSavedPosts = async (req, res) => {
  try {
    const { userID } = req.params;

    if (!userID) {
      return res.status(400).json({ error: "userID is required" });
    }

    // Find all saves for the user and populate the post details
    const saves = await Save.find({ userID })
      .populate("postID")
      .sort({ createdAt: -1 });

    res.status(200).json(saves);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  savePost,
  unsavePost,
  getSavedPosts,
};
