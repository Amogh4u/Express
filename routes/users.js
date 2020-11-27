
require('dotenv/config')
const express =  require('express');
const router = express.Router()
const user = require('../models/user_model')
const UserProcess = require('../controllers/user_data');
const userOrderProcess = require('../controllers/user_order_data');
const safePromise = promise => promise.then(data => ([null, data])).catch(error => ([error]));

//get mthod getAllUsers
router.get('/getAllUsers', async (req, res) => {
    try {
        let users = await user.find();
        res.send(users);
    } catch (error){ 
        res.status(500).json(error)
    }
})

//findOne method to get by userID (used middlewear)
router.get('/:userID', getUser, async (req, res) => {
    res.send(res.usr)
})

//post method to add new user
router.post('/AddOneUser', async (req, res) => {
    let users = await new user({
        userID: req.body.userID,
        name: req.body.name
    })

    try {
        let newUsers = await users.save()
        res.json(newUsers);
    } catch (error) {
        res.status(400).json(error);
    }
});

//post method to getAllUsers
router.route('/getAllUsers').post( async (req, res, next) => {
    let [error, response] = await safePromise(UserProcess.getAllUsers(req.body));
    if(error) {
        console.log('error error');
        return next(error);
    }
    res.json(response);
    next()
})




router.route('/userOrderProcessedData').post( async (req, res, next) => {
    let [error, response] = await safePromise(userOrderProcess.userOrderProcessedData(req.body));
    if(error) {
        console.log('error error');
        return next(error);
    }
    res.json(response);
    next()
})

router.route('/updateUserOrders').post( async (req, res, next) => {
    let [error, response] = await safePromise(userOrderProcess.updateUserOrders(req.body));
    if(error) {
        console.log('error error');
        return next(error);
    }
    res.json(response);
    next()
})


async function getUser(req, res, next) {
    let usr;
    try {
        usr = await user.findOne({
            userID: req.params.userID
        })
        if(usr == null) {
            return res.status(404).json({msg: 'cannot find user'});
        }
    } catch(error) {
        res.status(500).json(error);
    }
    res.usr = usr;
    next()
}
module.exports = router