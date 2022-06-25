const mongoose = require('mongoose');
const {Schema} = mongoose;
const recorddbs = require('./model');

const contactsSchema = Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: 'recorddbs'
    },
    person : String,
    email : String,
    phone : String,
    linkedin : String,
    comments: String
});

const contactdbs = mongoose.model('contactdbs', contactsSchema);

module.exports = {contactdbs};