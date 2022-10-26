const mongoose = require('mongoose');
const {Schema} = mongoose;

const recordSchema = new Schema({

    company: {
    type: String,
    required: true
    },
    website: String,
    size: String,
    revenue: String,
    hq: String,
    sales: String,
    priority: String,
    first: String,
    second: String,
    third: String,
    fourth: String,
    comments: String
});


const recorddbs =  mongoose.model('recorddbs', recordSchema);

module.exports = {recorddbs};