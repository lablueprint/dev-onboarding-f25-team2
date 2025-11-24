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

const getProfileByID = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Profile not found" });
  }

  const profile = await Profile.findById(id);
  if (!profile) {
    return res.status(404).json({ error: "Profile not found" });
  }

  res.status(200).json(profile);
};

// request is the frontend info, response is what the frontend is getting back
const getProfile = async (req, res) => {
  const { id } = req.params;

  // find the profile and store it into the response
  const profile = await Profile.findOne({ username: id });
  if (!profile) {
    return res.status(400).json({ error: "Profile not found" });
  }

  res.status(200).json(profile);
};

const editProfile = async (req, res) => {
  const { id } = req.params;

  try {
    // takes information from frontend
    console.log("Request Body: ", req.body);
    const profile = await Profile.findOneAndUpdate({ username: id }, req.body, {
      new: true,
    });
    if (!profile) {
      return res.status(400).json({ error: "Profile not found" });
    }
    // success
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProfile = async (req, res) => {
  const { id } = req.params;

  const profile = await Profile.findOneAndDelete({ username: id });

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
  editProfile,
  getProfileByID,
};
