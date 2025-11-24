const express = require("express");
const {
  getProfile,
  createProfile,
  deleteProfile,
  editProfile,
  getProfileByID,
} = require("../controllers/profileController");

const router = express.Router();

// creating routes
router.get("/:id", getProfile);
router.post("/", createProfile);
router.delete("/:id", deleteProfile);
router.post("/:id", editProfile);
router.get("/id/:id", getProfileByID);

module.exports = router;
