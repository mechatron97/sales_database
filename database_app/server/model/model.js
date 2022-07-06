const mongoose = require('mongoose');
const {Schema} = mongoose;

const recordSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    website: {
        type: String,
        required: true,
        unique: true
    },
    size: String,
    revenue: String,
    hq: String,
    sales: String,
    priority: String
});


const recorddbs =  mongoose.model('recorddbs', recordSchema);

module.exports = { recorddbs };