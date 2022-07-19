const mongoose = require('mongoose');
const {Schema} = mongoose;

const recordSchema = new Schema({

    company: String,
    website: String,
    size: String,
    revenue: String,
    hq: String,
    sales: String,
    priority: String
});


const recorddbs =  mongoose.model('recorddbs', recordSchema);

module.exports = { recorddbs };