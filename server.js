const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
mongoose.Promise = global.Promise;
require("./services/passport");

require("./models/User");
const profile = require("./routes/profile");
const post = require("./routes/posts");

const app = express();

// Middleware
mongoose.connect(keys.mongoURI);

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// app.get("/", (req, res) => {
//   res.send({ message: "home page" });
// });

// Routes
require("./routes/authRoutes")(app);
app.use("/api/profile", profile);
app.use("/api/posts", post);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  `Server running on port ${PORT}`;
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
