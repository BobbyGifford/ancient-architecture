const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Profile model
const Profile = require('../models/Profile')

// Load User model
const User = require('../models/User')

router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

module.exports = router;