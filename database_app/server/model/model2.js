const mongoose = require('mongoose');
const {Schema} = mongoose;


const contactsSchema = Schema({
    
    company : String,
    person : String,
    designation: String,
    email : String,
    phone : String,
    linkedin : String,
    comments: String
});

const contactdbs = mongoose.model('contactdbs', contactsSchema);

module.exports = { contactdbs };