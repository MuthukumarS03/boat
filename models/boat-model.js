/**
 * Created by msudalaiyandi on 10/24/15.
 */

'use script';

var request = require('request');

module.exports = {


    //TODO: Handle all error scenarios.
    createOrder: function (req, res, next) {

        var macId = req.body.mac_id,
            getCustomerAndDeviceByMacIdUrl = req.app.kraken.get('urls').getCustomerAndDeviceByMacIdUrl + '/' + macId;

        console.log('macID : ' + macId);

        // Get Customer and Device info by mac_id.
        request.get({
            url: getCustomerAndDeviceByMacIdUrl
        }, function(err, res, body) {

            console.log('Customer and Device body : ' + JSON.stringify(body));

            body = JSON.parse(body);

            console.log('Customer : ' + JSON.stringify(body.customer));

            var customer = body && body.customer,
                bt_customer_id = customer && customer.bt_customer_id,
                paymentMethodToken = customer && customer.payment_method_token,
                itemId = body && body.device && body.device.item_id;

            if(itemId) {

                // Get item info by itemId.
                var getItemByItemIdUrl = req.app.kraken.get('urls').getItemByItemIdUrl + '/' + itemId;
                request.get({
                    url: getItemByItemIdUrl
                }, function (err, res, body) {

                    console.log('Item - body : ' + JSON.stringify(body));

                    body = JSON.parse(body);

                    var item_upc = body && body.item_upc;

                    //Post customer and item details to create order.
                    var createOrderUrl = req.app.kraken.get('urls').createOrderUrl;

                    request.post({
                        url: createOrderUrl,
                        body: JSON.stringify({
                            bt_customer_id: bt_customer_id,
                            payment_method_token: paymentMethodToken,
                            item_upc: item_upc
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }, function (err, res, body) {
                       console.log('Error : ' + err);
                        console.log('Error : ' + res);
                        console.log('Error : ' + body);
                        next();
                    });
                });

            }









        });







    }

};