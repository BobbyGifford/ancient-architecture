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
// @access  Public

router.get("/testprivate", requireLogin, (req, res) =>
  res.json({
    msg: "Profile with Auth Works",
    user: req.user
  })
);

module.exports = router;
