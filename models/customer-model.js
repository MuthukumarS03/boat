/**
 * Created by msudalaiyandi on 10/24/15.
 */


'use strict;'

var _ = require('underscore');

module.exports = {

    loadCustomerRegisterData: function (req) {

        // Set model data.
        _.extend(req.model.data, {
           registerType: 'customer'
        });
    }


};
