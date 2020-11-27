const user = require('../models/user_model')


module.exports.getAllUsers = async () => {
    try {
        let AllUsers = await user.find()
        return AllUsers
    } catch (error) {
        return Promise.reject(error);
    }
}