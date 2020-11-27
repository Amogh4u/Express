const UserData = require('../controllers/user_data');
const OrderData = require('../controllers/order_data');
const user = require('../models/user_model')
const safePromise = promise => promise.then(data => ([null, data])).catch(error => ([error]));

module.exports.userOrderProcessedData = async (data) => {;
    let [userError, allUserData] = await safePromise(UserData.getAllUsers(data));
    let [orderError, allOrderData] = await safePromise(OrderData.getAllOrders(data));
    if(userError || orderError) {
        console.log('error error');
        return next(userError || orderError);
    } else {
        let customArray = [];
        allUserData.forEach(eachUser => {
            let customObj = {};
            customObj.averageBillValue = 0;
            allOrderData.forEach(eachOrder => {
                customObj.userID = eachUser.userID;
                customObj.name = eachUser.name;
                if(eachUser.userID === eachOrder.userID) {
                    customObj.averageBillValue += eachOrder.subTotal; 
                }
            });
            customArray.push(customObj);
        })
        console.log(customArray);
        return customArray;
    }
};

module.exports.updateUserOrders = async (data) => {;
    let [userError, allUserData] = await safePromise(UserData.getAllUsers(data));
    let [orderError, allOrderData] = await safePromise(OrderData.getAllOrders(data));
    if(userError || orderError) {
        console.log('error error');
        return next(userError || orderError);
    } else {
        allUserData.forEach(async eachUser => {
            let customObj = {};
            customObj.noOfOrders = 0;
            allOrderData.forEach(eachOrder => {
                if(eachUser.userID === eachOrder.userID) {
                    customObj.noOfOrders += 1; 
                }
            });
            await user.findOneAndUpdate({userID: eachUser.userID }, {noOfOrders:customObj.noOfOrders}, {new: true});
        })
        let responseObj = {success: true, msg: 'Document updated'}
        return responseObj;
    }
};