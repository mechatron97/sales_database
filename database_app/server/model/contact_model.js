const mongoose = require('mongoose');

var contacts = new mongoose.Schema({
    person: {
        type: String,
        required: false
    }
})

const Contactsdb = mongoose.model('Contactsdb', contacts);

module.exports = Contactsdb;