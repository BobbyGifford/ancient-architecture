const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Post model
const Post = require("../models/Post");
// Profile model
const Profile = require("../models/Profile");

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public

router.get("/", (req, res) => {
  res.send({ message: "post router works" });
});

module.exports = router;
