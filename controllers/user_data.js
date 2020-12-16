const user = require('../models/options_model')


module.exports.getAllUsers = async () => {
    try {
        let AllUsers = await user.find()
        return AllUsers
    } catch (error) {
        return Promise.reject(error);
    }
}