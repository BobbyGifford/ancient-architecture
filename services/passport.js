const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const passport = require("passport");
const keys = require("../config/keys");

const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("profile", profile);
      const exsistingUser = await User.findOne({ googleId: profile.id });
      if (exsistingUser) {
        return done(null, exsistingUser);
      }

      const user = await new User({
        googleId: profile.id,
        displayName: profile.displayName,
        googleImg: profile.photos[0].value
      }).save();
      done(null, user);
    }
  )
);
