/**
 * Created by msudalaiyandi on 10/24/15.
 */


'use strict';

var _ = require('underscore');

module.exports = {

    handleView: function (req, res, next) {

        var model = {
            viewName: 'index'
        };

        _.extend(req.model, model);

        next();
    }

};