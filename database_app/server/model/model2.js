const mongoose = require('mongoose');
const {Schema} = mongoose;
const recorddbs = require('./model');
const { ObjectId } = require('mongodb');


const contactsSchema = Schema({
    
    company: String,
    person : String,
    designation: String,
    email : String,
    phone : String,
    linkedin : String,
    comments: String,
    
});

const contactdbs = mongoose.model('contactdbs', contactsSchema);

module.exports = { contactdbs };