const express = require("express");
const {
  getProfile,
  createProfile,
  deleteProfile,
} = require("../controllers/profileController");

const router = express.Router();

// creating routes
router.get("/:id", getProfile);
router.post("/", createProfile);
router.delete("/:id", deleteProfile);

module.exports = router;
