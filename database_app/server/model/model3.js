const mongoose = require('mongoose');
const {Schema} = mongoose;

const locationsSchema = Schema({
    
    india : String,
    canada : String,
    uk : String,
    usa : String
});

const locationsdbs = mongoose.model('locationsdbs', locationsSchema);

module.exports = {locationsdbs};