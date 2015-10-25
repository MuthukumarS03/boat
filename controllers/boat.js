/**
 * Created by msudalaiyandi on 10/24/15.
 */


'use strict';

var _ = require('underscore'),
    boatModel = require('../models/boat-model');

module.exports = {

    handleView: function (req, res, next) {

        var model = {
            viewName: 'index'
        };

        _.extend(req.model, model);

        next();
    },

    createOrder: function (req, res, next) {
        boatModel.createOrder(req, res, next);

    }

};