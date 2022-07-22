const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordSchema = new Schema({

    company: String,
    website: String,
    size: String,
    revenue: String,
    hq: String,
    sales: String,
    priority: String,
    contacts:[contactsSchema]
});


const recorddbs =  mongoose.model('recorddbs', recordSchema);

module.exports = {recorddbs};