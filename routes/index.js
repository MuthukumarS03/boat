/**
 * Created by msudalaiyandi on 10/24/15.
 */

'use strict';

var boatController = require('../controllers/boat'),
    customerController = require('../controllers/customer'),
    responses = require('../lib/responses');

module.exports = function (router) {



    router.get('/register/customer', customerController.registerView, responses.renderHTMLandJSON);

    // TODO: add function to check logged-in and decide dashboard page or login page.
    //router.get('/customer', )

    router.get('/', boatController.handleView, responses.renderHTMLandJSON) ;

};