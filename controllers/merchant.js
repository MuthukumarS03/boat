/**
 * Created by msudalaiyandi on 10/24/15.
 */


'use strict';
var merchantModel = require('../models/merchant-model');

module.exports = {

    registerView: function (req, res, next) {

        // Set view name.
        req.model.viewName = 'register';

        merchantModel.loadMerchantRegisterData(req);

        next();

    },

    onBoard: function (req, res, next) {
        merchantModel.onBoardMerchant(req, next);
    }
}
