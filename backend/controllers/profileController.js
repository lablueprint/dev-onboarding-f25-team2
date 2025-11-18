const Profile = require("../models/ProfileModel");
const mongoose = require("mongoose");

const createProfile = async (req, res) => {
  try {
    // takes information from frontend
    console.log("Request Body: ", req.body);
    const profile = await Profile.create(req.body);
    // success
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// request is the frontend info, response is what the frontend is getting back
const getProfile = async (req, res) => {
  const { username } = req.params;

  if (!mongoose.Types.ObjectId(id).isValid(username)) {
    return res.status(400).json({ error: "Profile not found" });
  }

  // find the profile and store it into the response
  const profile = await Profile.findById(username);
  if (!profile) {
    return res.status(400).json({ error: "Profile not found" });
  }

  res.status(200).json(username);
};

const deleteProfile = async (req, res) => {
  const { username } = req.params;

  if (!mongoose.Types.ObjectId(username).isValid(username)) {
    return res.status(400).json({ error: "Profile not found" });
  }

  // attribute to find by username and delete
  const profile = Profile.findOneAndDelete(username);

  if (!profile) {
    return res.status(400).json({ error: "Profile not found" });
  }

  res.status(200).json(profile);
};

// exporting this module's functions
module.exports = {
  createProfile,
  getProfile,
  deleteProfile,
};
