const mongoose = require('mongoose');
const {Schema} = mongoose;
const recorddbs = require('./model');

const locationsSchema = Schema({
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

const locationsdbs = mongoose.model('locationsdbs', locationsSchema);

module.exports = {locationsdbs};