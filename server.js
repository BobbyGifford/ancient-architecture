const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const mongoose = require('mongoose')
const keys = require("./config/keys");
const bodyParser = require("body-parser");
mongoose.Promise = global.Promise;
require("./services/passport")
require("./models/User");

const app = express();

// Middleware
mongoose.connect(keys.mongoURI);

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// Routes

app.get("/", (req, res) => {
  res.send({ message: "home page" });
});

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);