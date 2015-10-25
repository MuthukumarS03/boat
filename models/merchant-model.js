/**
 * Created by msudalaiyandi on 10/24/15.
 */


'use strict;'

var _ = require('underscore'),
    request = require('request');


module.exports = {

    loadMerchantRegisterData: function (req) {
        var states=['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

        _.extend(req.model, {
            data: {
                states: states,
                regType: 'merchant'
            }
        });
    },

    onBoardMerchant: function(req, next) {
        var onBoardMerchantUrl = req.app.kraken.get('urls').onBoardMerchantUrl,
            merchant = req.body;

        console.log('merchant : ' + JSON.stringify(merchant));


        var payload = {

            individual: {
                first_name: merchant.firstName,
                last_name: merchant.lastName,
                email: merchant.email,
                phone_number: merchant.phone,
                date_of_birth: merchant.dob,
                ssn: merchant.ssn,
                street_address: merchant.street,
                locality: merchant.city,
                region: merchant.state,
                postal_code: merchant.zipcode

            },
            business: {
                legal_name: merchant.businessName,
                dba_name: merchant.businessName,
                tax_id: merchant.taxId,
                street_address: merchant.street,
                locality: merchant.city,
                region: merchant.state,
                postal_code: merchant.zipcode
            },
            funding: {
                descriptor: merchant.bankName,
                destination: 'bank',
                account_number:merchant.bankAcctNo,
                routing_number:merchant.bankRoutingNo
            }

        };

        console.log('Merchant on-board payload : ' + JSON.stringify(payload, null, '\t'));

        request.post({
            url: onBoardMerchantUrl,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        }, function (err, res, body) {

            console.log('Merchant-onboard  response : ' + body);

            if(err || !res || res.statusCode >= 300) {
                if (err || !res || res.statusCode >= 300) {
                    req.model.error = {
                        message: 'Sorry, we are unable to process the request.'
                    }
                } else {
                    body = JSON.parse(body);
                    if (body && body.status !== 'success') {
                        req.model.error = {
                            message: "Registration failed. Please try again later."
                        }
                    }
                }
                next();
            }
        });
    }
};
