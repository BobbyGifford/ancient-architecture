const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const requireLogin = require("../middleware/requireLogin");

// Load Profile model
const Profile = require("../models/Profile");

// Load User model
const User = require("../models/User");

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

// @route    POST api/profile/locationofinterest
// @desc     Adds locations of interest.
// @access   Private

router.post("/locationofinterest", requireLogin, (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newLocation = {
        name: req.body.name,
        location: req.body.location,
        description: req.body.description
      };

      profile.locationsOfInterest.unshift(newLocation);

      profile.save().then(profile => res.json(profile));
    })
    .catch(() => {
      res.status(404).json({ error: "No profile found" });
    });
});

// @route    GET api/profile
// @desc     Fetches all profiles.
// @access   Private

router.get("/all", requireLogin, (req, res) => {
  Profile.find()
    .populate("user", ["displayName", "googleImg"])
    .then(profiles => {
      if (!profiles) {
        res.status(404).json({ error: "No profiles found" });
      }
      res.json(profiles);
    })
    .catch(() => {
      res.status(404).json({ error: "No profiles found" });
    });
});

// @route    GET api/profile/user/user_id
// @desc     Fetches profile by user id.
// @access   Private

router.get("/user/:user_id", requireLogin, (req, res) => {
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["displayName"])
    .then(profile => {
      if (!profile) {
        res.status(404).json({ error: "No profile found" });
      }
      res.json(profile);
    })
    .catch(() => {
      res.status(404).json({ error: "No profile found for that user" });
    });
});

// @route    DELETE api/profile/locationofinterest/locationId
// @desc     Fetches profile by user id.
// @access   Private

router.delete("/locationofinterest/:locationId", requireLogin, (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    // Get remove index
    const removeIndex = profile.locationsOfInterest
      .map(item => item.id)
      .indexOf(req.params.locationId);

      // Slice of of locations array
      profile.locationsOfInterest.splice(removeIndex, 1);

      // Save
      profile.save().then(profile => {
        res.json(profile)
      })
  })
  .catch(error => {
    res.status(404).json(error)
  })
});

module.exports = router;
