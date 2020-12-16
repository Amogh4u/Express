
require('dotenv/config')
const mongoose = require('mongoose');
const express =  require('express');
const router = express.Router()
const questions = require('../models/question_model')
const questionAnswer = require('../controllers/question_answer');
const safePromise = promise => promise.then(data => ([null, data])).catch(error => ([error]));

router.get('/getAllQuestions', async (req, res) => {
    try {
        let allquestion = await questions.find();
        // res.render('index', {question: allquestion});
        res.send(allquestion);
    } catch (error){ 
        res.status(500).json(error)
    }
});

router.route('/getSourceQuestions').post( async (req, res, next) => {
    let [error, response] = await safePromise(questionAnswer.getSourceQuestions(req.body));
    if(error) {
        console.log('error error');
        return next(error);
    }
    res.json(response);
    next()
});

router.route('/getFirstSourceQuestions').get( async (req, res, next) => {
    let [error, response] = await safePromise(questionAnswer.getFirstSourceQuestions(req.body));
    if(error) {
        console.log('error error');
        return next(error);
    }
    res.render('question')
    res.json(response);
    next()
});

router.route('/getQuestionAndOptions').get( async (req, res, next) => {
    let [questionError,questionResponse] = await safePromise(questionAnswer.getFirstSourceQuestions(req.body));
    let [optionError, optionResponse] = await safePromise(questionAnswer.getOptionsByQuestionID(questionResponse));
    if(questionError||optionError) {
        console.log('error error');
        return next(questionError||optionError);
    }
    res.render('question', {question: questionResponse, options: optionResponse})
    let response = [...questionResponse, ...optionResponse]
    res.json(response);
    next()
});

router.route('/getNextQuestionAndOptions').post( async (req, res, next) => {
    console.log('erq res',JSON.stringify(req.body))
    let body = JSON.stringify(req.body.option);
    console.log('type of body', body[0]);
    if(body[0] === '[') {
        res.render('invalid_value');
        next()
    } else if(req.body && req.body.option && req.body.option !== '')  {
        let reqObj = {
            questionID: JSON.parse(req.body.option)
        }
        let [questionError,questionResponse] = await safePromise(questionAnswer.getQuestionByQuestionID(reqObj));
        let [optionError, optionResponse] = await safePromise(questionAnswer.getOptionsByQuestionID(questionResponse));
        if(questionError||optionError) {
            console.log('error error');
            return next(questionError||optionError);
        }
        res.render('question', {question:questionResponse, options: optionResponse})
        let response = [...questionResponse, ...optionResponse]
        res.json(response);
        next()
    } else {
        res.render('final');
        next()
    }
});


router.route('/getNextSourceQuestion/:questionID').get( async (req, res, next) => {
    console.log('value of data',JSON.stringify(req.params))
    let reqObj = {
        questionID: req.params.questionID
    }
    let [questionError,questionResponse] = await safePromise(questionAnswer.getSourceQuestionBySkip(reqObj));
    let [optionError, optionResponse] = await safePromise(questionAnswer.getOptionsByQuestionID(questionResponse));
    if(questionError||optionError) {
        console.log('error error');
        return next(questionError||optionError);
    }
    res.render('question', {question:questionResponse, options: optionResponse})
    let response = [...questionResponse, ...optionResponse]
    res.json(response);
    next()
});


module.exports = router