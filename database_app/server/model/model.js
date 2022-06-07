const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
        unique: true
    },
    website : {
        type: String,
        required: true,
        unique: true
    },
    size : String,
    revenue : String,
    hq: {
        type: String,
        required: false
    },
    sales: {
        type: String,
        required: false
    },
    india: String,
    canada: String,
    uk: String,
    usa: String,
    contacts: {
        type: String,
        required: false
    },
    priority: Number
})

const Recorddb = mongoose.model('recorddb', schema);

module.exports = Recorddb;