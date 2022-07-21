const mongoose = require('mongoose');
const {Schema} = mongoose;

const emailsSchema = Schema({
    
    email : String,
    name : String,
    company : String,
    designation : String,
    country: String,
    source: String,
    status: String,
    ab: String,
    ao: String
});

const emailsdbs = mongoose.model('emailsdbs', emailsSchema);

module.exports = {emailsdbs};