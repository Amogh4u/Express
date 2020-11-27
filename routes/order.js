
require('dotenv/config')
const mongoose = require('mongoose');
const express =  require('express');
const router = express.Router()
const order = require('../models/order_model')
const UserProcess = require('../controllers/order_data');
const safePromise = promise => promise.then(data => ([null, data])).catch(error => ([error]));

router.get('/getAllOrders', async (req, res) => {
    try {
        let orders = await order.find();
        res.send(orders);
    } catch (error){ 
        res.status(500).json(error)
    }
})

router.post('/AddOneOrder', async (req, res) => {
    let orders = await new order({
        orderID: req.body.orderID,
        userID: req.body.userID,
        subTotal: req.body.subTotal,
        date: req.body.date
    })

    try {
        let newOrders = await orders.save()
        res.json(newOrders);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.route('/getAllOrders').post( async (req, res, next) => {
    let [error, response] = await safePromise(UserProcess.getAllOrders(req.body));
    if(error) {
        console.log('error error');
        return next(error);
    }
    res.json(response);
    next()
});


module.exports = router