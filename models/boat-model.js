/**
 * Created by msudalaiyandi on 10/24/15.
 */

'use script';

var request = require('request');

module.exports = {


    //TODO: Handle all error scenarios.
    createOrder: function (req, res, next) {

        console.log('req.body : '+ JSON.stringify(req.body));

        var macId = req.body.mac_id,
            getCustomerAndDeviceByMacIdUrl = req.app.kraken.get('urls').getCustomerAndDeviceByMacIdUrl + '/' + macId;

        console.log('macID : ' + macId);

        // Get Customer and Device info by mac_id.
        request.get({
            url: getCustomerAndDeviceByMacIdUrl
        }, function(err, res, custInfoBody) {

            console.log('Customer and Device body : ' + JSON.stringify(custInfoBody));

            // Customer-Device Error scenario.
            if(err || !res || res.statusCode>=300) {
                req.model = {
                    status: 'failed',
                    reason: 'Unable to fetch customer and device info.'
                }
                next();
            } else {
                custInfoBody = JSON.parse(custInfoBody);
                console.log('Customer : ' + JSON.stringify(custInfoBody.customer));
                var customer = body && body.customer,
                    bt_customer_id = customer && customer.bt_customer_id,
                    paymentMethodToken = customer && customer.payment_method_token,
                    itemId = custInfoBody && custInfoBody.device && custInfoBody.device.item_id;

                console.log('Item Id : ' + itemId);

                if(itemId) {

                    // Get item info by itemId.
                    var getItemByItemIdUrl = req.app.kraken.get('urls').getItemByItemIdUrl + '/' + itemId;

                    request.get({
                        url: getItemByItemIdUrl
                    }, function (err, res, itemBody) {

                        console.log('Item - body : ' + JSON.stringify(itemBody));

                        if(err || !res || res.statusCode>=300 || !itemBody) {

                            req.model = {
                                status: 'failed',
                                reason: 'Unable to fetch item info.'
                            }
                            next();
                        } else {
                            itemBody = JSON.parse(itemBody);

                            var item_upc = itemBody && itemBody.item_upc;

                            console.log('item_upc : ' + item_upc);

                            if(item_upc) {

                                //Post customer and item details to create order.
                                var createOrderUrl = req.app.kraken.get('urls').createOrderUrl,
                                    payload = {
                                        bt_customer_id: bt_customer_id,
                                        payment_method_token: paymentMethodToken,
                                        item_upc: item_upc
                                    };
                                console.log('Create Order - Payload : ' + JSON.stringify(payload));

                                request.post({
                                    url: createOrderUrl,
                                    body: JSON.stringify(payload),
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }, function (err, res, orderBody) {
                                    if(err || !res || res.statusCode>=300 || !orderBody) {
                                        req.model = {
                                            status: 'failed',
                                            reason: 'Unable to fetch item info.'
                                        }
                                    } else {
                                        req.model = {
                                            status: 'success',
                                            reason: 'Order placed successfully'
                                        }
                                    }
                                    next();
                                });
                            }
                        }
                    });
                } else {
                    req.model = {
                        status: 'failed',
                        reason: 'Item Id is not available.'
                    }
                    next();
                }
            }
        });
    }
};