const axios = require("axios");
// eslint-disable-next-line no-unused-vars
const {response} = require("express");


exports.homeRoutes = (req, res) => {
  // Make a get request to /api/users
  axios.get("http://localhost:3000/api/")
      .then(function(response) {
        res.render("index", {index: response.data});
      })
      .catch((err) => {
        res.send(err);
      });
};

exports.add_record = (req, res) =>{
  res.render("add_record");
};

exports.add_email = (req, res) =>{
  res.render("add_email");
};

exports.add_details = (req, res) =>{
  res.render("add_details");
};

exports.records = (req, res) => {
  // Make a get request to /api/users
  axios.get("http://localhost:3000/api/records")
      .then(function(response) {
        res.render("records", {records: response.data});
      })
      .catch((err) => {
        res.send(err);
      });
};

exports.emails = (req, res) => {
  // Make a get request to /api/users
  axios.get("http://localhost:3000/api/emails")
      .then(function(response) {
        res.render("emails", {emails: response.data});
      })
      .catch((err) => {
        res.send(err);
      });
};

exports.details = (req, res) => {
  // Make a get request to /api/users
  axios.get("http://localhost:3000/api/details")
      .then(function(response) {
        res.render("details", {details: response.data});
      })
      .catch((err) => {
        res.send(err);
      });
};

exports.update_record = (req, res) =>{
  axios.get("http://localhost:3000/api/records", {params: {id: req.query.id}})
      .then(function(recorddata) {
        res.render("update_record", {record: recorddata.data});
      })
      .catch((err) =>{
        res.send(err);
      });
};

exports.update_email = (req, res) =>{
  axios.get("http://localhost:3000/api/emails", {params: {id: req.query.id}})
      .then(function(emaildata) {
        res.render("update_email", {email: emaildata.data});
      })
      .catch((err) =>{
        res.send(err);
      });
};

exports.update_details = (req, res) =>{
  axios.get("http://localhost:3000/api/details", {params: {id: req.query.id}})
      .then(function(detailsdata) {
        res.render("update_details", {details: detailsdata.data});
      })
      .catch((err) =>{
        res.send(err);
      });
};
