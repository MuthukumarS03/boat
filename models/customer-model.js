/**
 * Created by msudalaiyandi on 10/24/15.
 */


'use strict;'

var _ = require('underscore');



function getItems(req, callback) {

    //TODO: Make api call to get items.
    var itemsList = [
        {
            "item_id": "1",
            "item_upc": "123",
            "item_name": "COKE",
            "item_desc": "BLACK"
        },
        {
            "item_id": "2",
            "item_upc": "1234",
            "item_name": "FANTA",
            "item_desc": "ORANGE"
        },
        {
            "item_id": "3",
            "item_upc": "12345",
            "item_name": "SPRITE",
            "item_desc": "GREEN"
        }
    ];

    callback(itemsList);
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



    }


};
