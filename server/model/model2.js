const mongoose = require('mongoose');
const {Schema} = mongoose;


const contactsSchema = Schema({
    
    company: {
        type: Schema.Types.ObjectId,
        ref: 'recorddbs'
    },
    person : String,
    designation: String,
    email : String,
    phone : String,
    linkedin : String,
    comments: String,
    
});

const contactdbs = mongoose.model('contactdbs', contactsSchema);

module.exports = { contactdbs };