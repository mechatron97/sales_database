/* eslint-disable max-len */
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// eslint-disable-next-line no-unused-vars
const functions = require("firebase-functions");

const express = require("express");
// const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");
const connectDB = require("../server/database/connection");
const app = express();

dotenv.config( {path: "../config.env"});
// var port = process.env.PORT || 8080

// log requests
app.use(morgan("tiny"));


// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({extended: true}));

app.use(express.json());


// set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.static(path.join(__dirname, "../public")));
app.engine("html", require("ejs").renderFile);

// const data = {};
// var ejs = require('ejs');
// var fs = require('fs');

// ejs.renderFile(path.join(__dirname, '/views/index.ejs'),
//  data, (err, result) => {
//     if (err) {
//         console.log('info', 'error encountered: ' + err);
//         // throw err;
//     }
//     else {
//         try {
//             fs.writeFileSync('./public/index.html', result, 'utf8');
//         } catch(err) {
//             if (err) {
//                 throw err;
//             }
//         }

//     }
// });

// load assets
app.use("/css", express.static(path.resolve(__dirname, "../assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "../assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "../assets/js")));

app.use("/css", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use("/js", express.static(path.join(__dirname, "../node_modules/jquery/dist")));

// load routers
app.use("/", require("../server/routes/router"));

// app.get('/', function(req, res){
//     res.render('views/index');
// })

app.listen(process.env.PORT || 8080, () => {
  console.log("Server is running");
});

exports.app = functions.https.onRequest(app);
