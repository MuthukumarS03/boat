/**
 * Created by msudalaiyandi on 10/24/15.
 */


'use strict';
var customerModel = require('../models/customer-model'),
    middlewareUtils = require('./middleware/middleware-utils');

module.exports = {

    registerView: function (req, res, next) {

        // Set view name.
        req.model.viewName = 'register';


        //Get Client-Token
        middlewareUtils.generateBTClientToken(req, function (err, clientToken) {

            if(err || !clientToken) {
                req.model.viewName = 'errors/500';
                next();
            } else {

                //Set client Token in model
                req.model.clientToken = clientToken;

                //Load data required for customer registration form.
                customerModel.loadCustomerRegisterData(req, next);
            }
        });
    },

    onBoard: function (req, res, next) {
        customerModel.onBoardCustomer(req, next);
    }
}
