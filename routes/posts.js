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

// @route   GET api/posts/:id
// @desc    Fetch post by id
// @access  Private

router.get('/:id', requireLogin, (req, res) => {
  Post.findById(req.params.id)
    .populate("user", ["displayName", "googleImg"])
    .populate("comments.user", ["displayName", "googleImg"])
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

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private

router.post('/like/:id', requireLogin, (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (
        post.likes.filter(like => like.user.toString() === req.user.id)
          .length > 0
      ) {
        return res
          .status(400)
          .json({ alreadyliked: 'User already liked this post' });
      }

      // Add user id to likes array
      post.likes.unshift({ user: req.user.id });

      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
})

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private

router.delete('/like/:id', requireLogin, (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (
        post.likes.filter(like => like.user.toString() === req.user.id)
          .length === 0
      ) {
        return res
          .status(400)
          .json({ notliked: 'You have not yet liked this post' });
      }

      // Get remove index
      const removeIndex = post.likes
        .map(item => item.user.toString())
        .indexOf(req.user.id);

      // Splice out of array
      post.likes.splice(removeIndex, 1);

      // Save
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
});

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private

router.post('/comment/:id', requireLogin, (req, res) => {
  Post.findById(req.params.id)
    .then(post => {

      const newComment = {
        user: req.user.id,
        text: req.body.text
      }

      post.comments.unshift(newComment)
      post.save().then(post => { res.json({ post }) })
    })
    .catch(() => { res.status(404).json({ error: "no post found" }) })
})

// @route   GET api/posts/byuser/:id
// @desc    Gets posts by user
// @access  Private

router.get('/byuser/:id', requireLogin, (req, res) => {
  Post.find({user: req.params.id})
    .then((posts) => {
      res.json(posts)
    })
    .catch((err) => {
      res.status(404).json({message: "bad"})
    })
})



module.exports = router;
