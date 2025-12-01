require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const postRoutes = require("./routes/posts");
const profileRoutes = require("./routes/profiles");
const saveRoutes = require("./routes/saves");
const likedPostsRoutes = require("./routes/likedPosts");

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(
  cors({
    // Replace 3000 with the actual port your React frontend is running on
    origin: "http://localhost:8081",
  })
);

// routes
app.use("/api/posts", postRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/saves", saveRoutes);
app.use("/api/likedPosts", likedPostsRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
