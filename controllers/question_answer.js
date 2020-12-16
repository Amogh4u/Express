const UserData = require('./user_data');
const OrderData = require('./order_data');
const options = require('../models/options_model')
const questions = require('../models/question_model')
const safePromise = promise => promise.then(data => ([null, data])).catch(error => ([error]));

module.exports.getOptionsByQuestionID = async (data) => {
    try {
        let optionData =  await options.findOne({questionID: data.questionID});
        return optionData
    } catch (err) {
        return Promise.reject(err);
    }
};

module.exports.getSourceQuestions = async () => {
    try {
        let questionData = await questions.find({sourceQuestion: true});
        return questionData
    } catch (err) {
        return Promise.reject(err);
    }
};


module.exports.getFirstSourceQuestions = async () => {
    try {
        let questionData = await questions.findOne({sourceQuestion: true});
        return questionData
    } catch (err) {
        return Promise.reject(err);
    }
};


module.exports.getSourceQuestionBySkip = async (data) => {
    try {
        let questionData = await questions.findOne({sourceQuestion: true, questionID: {$ne: data.questionID}});
        console.log('datatta',questionData);
        return questionData
    } catch (err) {
        return Promise.reject(err);
    }
};


module.exports.getQuestionByQuestionID = async (data) => {
    try {
        let questionData = await questions.findOne({questionID: data.questionID});
        return questionData
    } catch (err) {
        return Promise.reject(err);
    }
};