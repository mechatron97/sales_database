/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const functions = require("firebase-functions");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const connectDB = require("./server/database/connection");
const app = express();
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./server/model/user");

dotenv.config( {path: "../config.env"} );

const PORT = 3000;

// log requests
app.use(morgan("tiny"));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({type: "*/*"}));
app.use(express.json());
app.use(cors());

app.use(require("express-session")({
  secret: "Rusty is a dog",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/assets")));

// load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));

app.use("/css", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js")));
app.use("/js", express.static(path.join(__dirname, "/node_modules/jquery/dist")));

// load routers
app.use("/", require("./server/routes/router"));

app.get("/app/home", function(req, res) {
  res.render("home");
});

// Showing dashboard page
app.get("/", isLoggedIn, function(req, res) {
  res.render("index");
});

// Showing register form
app.get("/app/register", function(req, res) {
  res.render("register");
});

// Handling user signup
app.post("/app/register", function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  User.register(new User({username: username}),
      password, function(err, user) {
        if (err) {
          console.log(err);
          return res.render("register");
        }

        passport.authenticate("local")(
            req, res, function() {
              res.render("login");
            });
      });
});

// Showing login form
app.get("/app/login", function(req, res) {
  res.render("login");
});

app.post("/app/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failWithError: true,
    }),
    function(req, res, next) {
    // Handle success
      return res.send({success: true, message: "Logged in"});
    },
    function(err, req, res, next) {
    // Handle error
      return res.send({success: false, message: "wrong credentials"});
    }
);

// Handling user logout
app.get("/app/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/app/login");
}

app.listen(PORT, () => {
  console.log("Server is running");
});

exports.app = functions.https.onRequest(app);
