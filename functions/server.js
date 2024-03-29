/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const functions = require("firebase-functions");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");
const connectDB = require("./server/database/connection");
const app = express();
const cookieParser = require("cookie-parser");
const {requireAuth, checkUser} = require("./middleware/authMiddleware");
const authRoutes = require("./server/routes/router");

dotenv.config( {path: "../config.env"} );

const PORT = 3000;

// log requests
app.use(morgan("tiny"));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({extended: true}));

app.use(express.json());
app.use(cookieParser());
app.set("etag", false);

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

// set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));

// load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));

app.use("/css", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js")));
app.use("/js", express.static(path.join(__dirname, "/node_modules/jquery/dist")));

// load routers
app.use("/", require("./server/routes/router"));

app.get("*", checkUser);
app.get("/", (req, res) => res.render("index"));
app.get("/home", requireAuth, (req, res) => res.render("home"));
app.use(authRoutes);

app.listen(PORT, () => {
  console.log("Server is running");
});

exports.app = functions.https.onRequest(app);
