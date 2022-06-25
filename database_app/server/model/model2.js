const mongoose = require('mongoose');
const {Schema} = mongoose;

const contactsSchema = Schema({
    
    person : String,
    email : String,
    phone : String,
    linkedin : String,
    comments: String
});

const contactdbs = mongoose.model('contactdbs', contactsSchema);

module.exports = {contactdbs};