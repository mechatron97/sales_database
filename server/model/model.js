const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactsSchema = new Schema({
    
    company: String,
    person : String,
    designation: String,
    email : String,
    phone : String,
    linkedin : String,
    comments: String,
    
});

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

const contactdbs = mongoose.model('contactdbs', contactsSchema);

module.exports = {recorddbs, contactdbs};