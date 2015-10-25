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

        getMerchantValidationObj: function () {
            return {
                businessName: {
                    required: true
                },
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
                dob: {
                    pattern: '^\\d{4}-\\d{1,2}-\\d{1,4}$',
                        required: true
                },
                ssn: {
                    pattern: 'digits',
                        required: true
                },
                taxId: {
                    pattern: 'digits',
                        required: true
                },
                bankName: {
                    required: true
                },
                bankAcctNo: {
                    pattern: 'digits',
                        required: true
                },
                bankRoutingNo: {
                    pattern: 'digits',
                        required: true
                }

            };
        },

        validation: function (){
            var registrationType = this.get('type'),
                validationObj = this.getCustomerValidationObj();

            if(registrationType === 'merchant') {
                validationObj = this.getMerchantValidationObj();
            }

            return validationObj;
        },

        url: function() {
            if(this.get('type') === 'customer') {
                return Backbone.history.options.root + 'customer/onboard';
            }
            return Backbone.history.options.root + 'merchant/onboard';
        },

        parse: function (response) {
            return response.data;
        }
    });


    return new RegisterModel();


});