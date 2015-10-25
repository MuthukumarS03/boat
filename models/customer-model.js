/**
 * Created by msudalaiyandi on 10/24/15.
 */


'use strict;'

var _ = require('underscore'),
    request = require('request');



function getItems(req, callback) {

    //TODO: Make api call to get items.
    //var itemsList = [
    //    {
    //        "item_id": "1",
    //        "item_upc": "123",
    //        "item_name": "COKE",
    //        "item_desc": "BLACK"
    //    },
    //    {
    //        "item_id": "2",
    //        "item_upc": "1234",
    //        "item_name": "FANTA",
    //        "item_desc": "ORANGE"
    //    },
    //    {
    //        "item_id": "3",
    //        "item_upc": "12345",
    //        "item_name": "SPRITE",
    //        "item_desc": "GREEN"
    //    }
    //];
    //callback(itemsList);

    var itemsUrl = req.app.kraken.get('urls').getItemsUrl;

    console.log('itemsUrl : ' + itemsUrl);

    request.get({
        url: itemsUrl
    }, function (err, res, body){
        var jsonBody = JSON.parse(body);
        callback(jsonBody.item_list);
    });
}



module.exports = {

    loadCustomerRegisterData: function (req, next) {

        var registrationData,
            states=['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'],
            months = [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ],
            expMonths = [],
            expYears = ['2015', '2016', '2017', '2018', '2019', '2020'];

        // Expiration Months
        _.each(months, function (month, index) {
            expMonths.push({
                month: index+1,
                name: month
            });
        });

        registrationData = {
            regType: 'customer',
            states: states,
            expMonths: expMonths,
            expYears: expYears
        };


        //Set items list.
        getItems(req, function (items){
            if(items && items.length > 0) {
                _.extend(registrationData, {items:items})
            }

            // Set model data.
            _.extend(req.model, {data: registrationData});

            next();
        });
    },

    onBoardCustomer: function(req, next) {
        var onBoardCustomerUrl = req.app.kraken.get('urls').onBoardCustomerUrl,
            customer = req.body;

        console.log('Customer : ' + JSON.stringify(customer.firstName));


        var payload = {
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            phone: customer.phone,
            macId: customer.deviceMac,
            itemId: customer.itemId,
            paymentMethodNonce: customer.paymentMethodNonce,
            addresses: [ {
                streetAddress: customer.street,
                extendedAddress: '',
                locality: customer.city,
                region: customer.state,
                postalCode: customer.zipcode
            }]
        };

        console.log('Customer on-board payload : ' + JSON.stringify(payload));

        request.post({
            url: onBoardCustomerUrl,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        }, function (err, res, body) {
            console.log('Customer-onboard  response : ' + body);
            if(err || !res || res.statusCode >= 300) {
                req.model.error = {
                    message: 'Sorry, we are unable to process the request.'
                }
            } else {
                body = JSON.parse(body);
                if(body && body.status !== 'success') {
                    req.model.error = {
                        message: "Registration failed. Please try again later."
                    }
                }
            }
            next();
        });
    }
};
