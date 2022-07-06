const mongoose = require('mongoose');
const {Schema} = mongoose;

const reviewsSchema = Schema({
    
    name : String,
    website : String,
    first : String,
    second: String,
    third: String,
    comments: String,
    notes: String
});

const reviewsdbs = mongoose.model('reviewsdbs', reviewsSchema);

module.exports = {reviewsdbs};