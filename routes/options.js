
require('dotenv/config')
const express =  require('express');
const router = express.Router()
const options = require('../models/options_model')
const UserProcess = require('../controllers/user_data');
const questionAnswer = require('../controllers/question_answer');
const safePromise = promise => promise.then(data => ([null, data])).catch(error => ([error]));

//get mthod getAllUsers
router.get('/getAllOptions', async (req, res) => {
    try {
        let Alloption = await options.find();
        res.send(Alloption);
    } catch (error){ 
        res.status(500).json(error)
    }
})

//post method to getAllUsers
router.route('/getOptionsByQuestionID').post( async (req, res, next) => {
    let [error, response] = await safePromise(questionAnswer.getOptionsByQuestionID(req.body));
    if(error) {
        console.log('error error');
        return next(error);
    }
    res.json(response);
    next()
})
module.exports = router