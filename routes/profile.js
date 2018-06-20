const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const requireLogin = require("../middleware/requireLogin");

// Load Profile model
const Profile = require("../models/Profile");

// Load User model
const User = require("../models/User");

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public

router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route   GET api/profile/testPrivate
// @desc    Tests profile route with auth
// @access  Private

router.get("/testprivate", requireLogin, (req, res) =>
  res.json({
    msg: "Profile with Auth Works",
    user: req.user
  })
);

// @route    POST api/profile
// @desc     Creates or edits new profile
// @access   Private

router.post("/", requireLogin, (req, res) => {
  console.log(req.body);
  
  // Get fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.fromWhere) profileFields.fromWhere = req.body.fromWhere;
  if (req.body.livingWhere) profileFields.livingWhere = req.body.livingWhere;
  if (req.body.description) profileFields.description = req.body.description;

  // Social
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      // Update
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then(profile => res.json(profile));
    } else {
      // Create

      // Save Profile
      new Profile(profileFields).save().then(profile => res.json(profile));
    }
  });
});

module.exports = router;
