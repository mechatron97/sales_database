/* eslint-disable max-len */
const functions = require("firebase-functions");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");
const connectDB = require("../server/database/connection");
const app = express();

dotenv.config( {path: "../config.env"} );
const port = process.env.PORT || 8080;

// log requests
app.use(morgan("tiny"));


// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({extended: true}));

app.use(express.json());


// set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));

// load assets
app.use("/css", express.static(path.resolve(__dirname, "../assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "../assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "../assets/js")));

app.use("/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));
app.use("/js", express.static(path.join(__dirname, "node_modules/jquery/dist")));

// load routers
app.use("/", require("../server/routes/router"));

app.listen(port, () => {
  console.log("Server is running");
});

exports.app = functions.https.onRequest(app);
