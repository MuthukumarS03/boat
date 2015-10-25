/**
 * Created by msudalaiyandi on 10/24/15.
 */

'use strict';

define([
    'backbone'
], function (Backbone) {

    var RegisterModel = Backbone.Model.extend({

        getCustomerValidationObj: function () {
            return {
                firstName: {
                    required: true
                },
                lastName: {
                    required: true
                },
                email: {
                    pattern: 'email',
                    required: true
                },
                street: {
                    required: true
                },
                city: {
                    required: true
                },
                state: {
                    required: true
                },
                zipcode: {
                    pattern: 'digits',
                    required: true
                },
                phone: {
                    pattern: 'digits',
                    required: true
                },
                ccNo: {
                    pattern: 'digits',
                    required: true
                },
                cvv: {
                    pattern: 'digits',
                    required: true
                },
                nameOnCard: {
                    required: true
                },
                deviceMac: {
                    required: true
                },
                itemId: {
                    required: true
                }
            };
        },


        validation: function (){
            var registrationType = this.get('type'),
                validationObj = this.getCustomerValidationObj();

            return validationObj;
        },





        url: function() {
            return Backbone.history.options.root + 'customer/onboard';
        },

        parse: function (response) {
            return response.data;
        }
    });


    return new RegisterModel();


});