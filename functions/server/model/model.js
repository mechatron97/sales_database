const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordSchema = new Schema({

  company: {
    type: String,
    required: true},
  website: String,
  size: String,
  revenue: String,
  hq: String,
  sales: String,
  first: String,
  second: String,
  third: String,
  fourth: String,
  priority: String,
  comments: String,
});


const recorddbs = mongoose.model("recorddbs", recordSchema);

module.exports = {recorddbs};
