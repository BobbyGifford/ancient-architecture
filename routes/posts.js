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

// @route   GET api/posts/all
// @desc    Fetches all posts
// @access  Private

router.get('/', requireLogin, (req, res) => {
  Post.find()
    .populate("user", ["displayName", "googleImg"])
    .sort({ date: -1 })
    .then((posts) => {
      if (!posts) {
        res.status(404).json("No posts found")
      }
      res.status(200).json(posts)
    })
})

// @route   GET api/posts/all
// @desc    Fetches all posts
// @access  Private

router.get('/:id', requireLogin, (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      res.json(post)
    })
    .catch((error) => res.status(404).json({ postnotfound: "No post found" }))
})

// @route   GET api/posts/all
// @desc    Fetches all posts
// @access  Private

router.delete('/:id', requireLogin, (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      // Check for creator of post
      if (post.user.toString() !== req.user.id) {
        res.status(401).json({ Unauthorized: "You're not the post's author" })
      }
      post.remove().then(() => res.json({ message: "Post was removed" }))
    })
    .catch(() => { res.json({ error: "No post found" }) })
})

module.exports = router;
