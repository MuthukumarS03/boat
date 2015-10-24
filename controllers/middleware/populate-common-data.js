/**
 * Created by msudalaiyandi on 10/24/15.
 */


'use strict';

module.exports = function (config) {

    return function (req, res, next) {

        //Create model object in req.
        req.model = req.model || {};

        //Create model-data object in req
        req.model.data = req.model.data || {};

        //Set context path for client.
        req.model.contextPath = req.app.kraken && req.app.kraken.get('requestURI');

        next();
    };
};
