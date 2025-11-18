//Maps a user to their saved
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const saveSchema = new Schema(
  {
    userID: {
      type: String,
    },
    postID: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Save", saveSchema);
