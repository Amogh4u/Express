
// require('dotenv').config()
let mongoose = require('mongoose');


let orderSchema =  new mongoose.Schema({
    orderID: {
        type: Number,
        required: true
    },
    userID: {
        type: Number,
        required: true
    },
    subTotal: {
        type: Number,
        required: true
    },
    date: {
        date: String,
        required: false
    }
});

let order = mongoose.model('order', orderSchema);

module.exports = order;