
require('dotenv/config')
let mongoose = require('mongoose');

let optionSchema =  new mongoose.Schema({
   optionID: {
       type: Number,
       required: true
   },
   questionID: {
       type: Number,
       required: true
   },
   optionArray: {
       type: Array,
       required: false,
       default: 0
   }
});


let option = mongoose.model('options', optionSchema);

module.exports = option;