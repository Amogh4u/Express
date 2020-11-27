
require('dotenv/config')
let mongoose = require('mongoose');

let userSchema =  new mongoose.Schema({
   userID: {
       type: Number,
       required: true
   },
   name: {
       type: String,
       required: true
   },
   noOfOrders: {
       type: Number,
       required: false,
       default: 0
   }
});


let user = mongoose.model('users', userSchema);

module.exports = user;