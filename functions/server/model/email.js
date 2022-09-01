/* eslint-disable new-cap */
const mongoose = require("mongoose");
const {Schema} = mongoose;

const emailsSchema = Schema({

  email: {
    type: String,
    required: true},
  name: String,
  company: String,
  designation: String,
  country: String,
  source: String,
  status: String,
  ab: String,
  ao: String,
});

const emailsdbs = mongoose.model("emailsdbs", emailsSchema);

module.exports = {emailsdbs};
