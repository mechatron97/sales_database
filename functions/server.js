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

app.listen(PORT, () => {
  console.log("Server is running");
});

exports.app = functions.https.onRequest(app);
