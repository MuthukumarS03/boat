/**
 * Created by msudalaiyandi on 10/24/15.
 */

'use strict';

var boatController = require('../controllers/boat'),
    customerController = require('../controllers/customer'),
    merchantController = require('../controllers/merchant'),
    responses = require('../lib/responses');

module.exports = function (router) {



    router.get('/register/customer', customerController.registerView, responses.renderHTMLandJSON);
    router.get('/register/merchant', merchantController.registerView, responses.renderHTMLandJSON);

    //router.post('/customer/onboard', function (req, res) {
    //    console.log('Customer : ' + JSON.stringify(req.body));
    //    res.json({});
    //});

    router.post('/customer/onboard', customerController.onBoard, responses.renderJSON);
    router.post('/merchant/onboard', merchantController.onBoard, responses.renderJSON);


    router.post('/order/create', boatController.createOrder, responses.renderJSON);

    // TODO: add function to check logged-in and decide dashboard page or login page.
    //router.get('/customer', )

    router.get('/', boatController.handleView, responses.renderHTMLandJSON) ;

};