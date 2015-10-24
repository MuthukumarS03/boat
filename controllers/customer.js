/**
 * Created by msudalaiyandi on 10/24/15.
 */


'use strict';
var customerModel = require('../models/customer-model');

module.exports = {

    registerView: function (req, res, next) {


        customerModel.loadCustomerRegisterData(req);

        // Set view name.
        req.model.viewName = 'register';

        next();

    }

}
