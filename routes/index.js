/**
 * Created by msudalaiyandi on 10/24/15.
 */

'use strict';

var boatController = require('../controllers/boat'),
    responses = require('../lib/responses');

module.exports = function (router) {

    router.get('/', boatController.handleView, responses.renderHTMLandJSON) ;

};