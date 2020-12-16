const order = require('../models/question_model')


module.exports.getAllOrders = async () => {
    try {
        let AllOrders = await order.find()
        return AllOrders
    } catch (error) {
        return Promise.reject(error);
    }
}