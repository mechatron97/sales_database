/* eslint-disable new-cap */
const mongoose = require("mongoose");
const {Schema} = mongoose;

const detailsSchema = Schema({

  company: {
    type: String,
    required: true},
  india: String,
  canada: String,
  uk: String,
  usa: String,
  person: String,
  designation: String,
  email: String,
  phone: String,
  linkedin: String,
  comments: String,
});

const detailsdbs = mongoose.model("detailsdbs", detailsSchema);

module.exports = {detailsdbs};
