const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Profile schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 30
  },
  fromWhere: {
    type: String
  },
  livingWhere: {
    type: String
  },
  description: {
    type: String
  },
  locationsOfInterest: [
    {
      name: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
