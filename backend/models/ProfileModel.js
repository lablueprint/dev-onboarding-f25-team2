const mongoose = require("mongoose");

const Schema = mongoose.Schema; // just stores the function name to create Schemas, not called yet

const ProfileSchema = new Schema({
  firstName: { required: true, type: String },
  lastName: { required: true, type: String },
  username: { required: true, type: String },
});

module.exports = mongoose.model("Profile", ProfileSchema);
