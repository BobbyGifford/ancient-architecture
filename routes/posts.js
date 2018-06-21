const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const requireLogin = require("../middleware/requireLogin");

// Post model
const Post = require("../models/Post");
// Profile model
const Profile = require("../models/Profile");

// @route   POST api/posts
// @desc    Creates a post
// @access  Private

router.post("/", requireLogin, (req, res) => {
  const newPost = {};

  newPost.user = req.user.id;
  if (req.body.title) newPost.title = req.body.title;
  if (req.body.location) newPost.location = req.body.location;
  if (req.body.description) newPost.description = req.body.description;

  if (typeof req.body.keyfeatures !== "undefined") {
    newPost.keyfeatures = req.body.keyfeatures.split(", ");
  }

  newPost.media = {};
  if (req.body.youtube) newPost.media.youtube = req.body.youtube;
  if (req.body.wikipedia) newPost.media.wikipedia = req.body.wikipedia;

  new Post(newPost).save().then(profile => {
      res.json(profile)
  })
});

module.exports = router;
