const mongoose = require('mongoose');
const {Schema} = mongoose;

const locationsSchema = Schema({
    
    company: String,
    india : String,
    canada : String,
    uk : String,
    usa : String
});

const locationsdbs = mongoose.model('locationsdbs', locationsSchema);

module.exports = {locationsdbs};