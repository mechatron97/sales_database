const mongoose = require('mongoose');
const {Schema} = mongoose;

const recordSchema = Schema({
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
    priority: String,
    // locations: [{type: Schema.Types.ObjectId, ref: 'locationsdbs'}],
    // contacts: [{type: Schema.Types.ObjectId, ref: 'contactdbs'}]
});

const recorddbs =  mongoose.model('recorddbs', recordSchema);

// var schema = new mongoose.Schema({
//     name : {
//         type : String,
//         required: true,
//         unique: true
//     },
//     website : {
//         type: String,
//         required: true,
//         unique: true
//     },
//     size : String,
//     revenue : String,
//     hq: String,
//     sales: String,
//     priority: Number,
//     locations: [{type: Schema.Types.ObjectId, ref: 'locations'}],
//     contacts: [{type: Schema.Types.ObjectId, ref: 'contacts'}]
// })

// const Recorddb = mongoose.model('recorddb', schema);

module.exports = {
    recorddbs
}