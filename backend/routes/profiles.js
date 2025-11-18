const express = require("express");
const {
  getProfile,
  createProfile,
  deleteProfile,
} = require("..controllers/profileController");

const router = express.Router();

// creating routes
router.get("/", getProfile);
router.post("/:id", createProfile);
router.delete("/:id", deleteProfile);

module.exports = router;
