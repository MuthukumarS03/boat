/**
 * Created by msudalaiyandi on 10/24/15.
 */

'use strict';

var braintree = require('braintree');

module.exports = {

    generateBTClientToken: function (req, next) {
        var config = req.app.kraken,
            gateway = braintree.connect({
            environment: braintree.Environment.Sandbox,
            merchantId: config.get('btMerchantId'),
            publicKey: config.get('btPublicKey'),
            privateKey: config.get('btPrivateKey')
        });
        gateway.clientToken.generate({}, function (err, res) {
            next(err, (res && res.clientToken));
        });
    }
}