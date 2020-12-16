
// require('dotenv').config()
let mongoose = require('mongoose');


let questionSchema =  new mongoose.Schema({
    questionID: {
        type: Number,
        required: true
    },
    optionID: {
        type: Number,
        required: true
    },
    questionName: {
        type: String,
        required: true
    },
    sourceQuestion: {
        type: Boolean,
        required: false
    }
});

let question = mongoose.model('questions', questionSchema);

module.exports = question;