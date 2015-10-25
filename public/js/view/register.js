/**
 * Created by msudalaiyandi on 10/24/15.
 */

'use strict';

define([
    'jquery',
    'underscore',
    'BaseView',
    'model/register',
    'braintree',
    'backboneValidation'
], function ($, _, BaseView, registerModel, Braintree) {

    var RegisterView = BaseView.extend({

        el: '#register',

        events: {
            'click #submit': 'submit',

            'focusout #firstName': 'validateErrorField',
            'focusout #lastName': 'validateErrorField',
            'focusout #email': 'validateErrorField',
            'focusout #street': 'validateErrorField',
            'focusout #city': 'validateErrorField',
            'focusout #zipcode': 'validateErrorField',
            'focusout #phone': 'validateErrorField',
            'focusout #ccNo': 'validateErrorField',
            'focusout #cvv': 'validateErrorField',
            'focusout #nameOnCard': 'validateErrorField',
            'focusout #deviceMac': 'validateErrorField',
            'focusout #itemId': 'validateErrorField'

        },

        initialize: function () {
            this.clientToken = this.$el.data('clientToken');
            this.model = registerModel;

            // Set register type.
            this.model.set({
                type: this.$el.data('regType')
            });

        },

        validateErrorField: function (event) {
            var currentTarget = this.$(event.currentTarget);
            if(currentTarget.val().length !== 0) {
                currentTarget.removeClass('hasError');
            }

        },

        getPaymentMethodNonce: function (callback) {
            var client = new Braintree.api.Client({clientToken: this.clientToken});
            console.log('ccNo : ' + this.model.get('ccNo'));
            console.log('ccNo : ' + (this.model.get('ccExpMonth') +  '/' + this.model.get('ccExpYear').substring(this.model.get('ccExpYear').length-2)));
            client.tokenizeCard({
                number: this.model.get('ccNo'),
                expirationDate: this.model.get('ccExpMonth') +  '/' + this.model.get('ccExpYear').substring(this.model.get('ccExpYear').length-2)
            }, function (err, nonce) {
                callback(nonce);
            });
        },

        loadModel: function () {
            this.model.set({
                firstName: this.$('#firstName').val(),
                lastName: this.$('#lastName').val(),
                email: this.$('#email').val(),
                street: this.$('#street').val(),
                city: this.$('#city').val(),
                state: this.$('#state').val(),
                zipcode: this.$('#zipcode').val(),
                phone: this.$('#phone').val(),
                ccNo: this.$('#ccNo').val(),
                ccExpMonth: this.$('#ccExpMonth').val(),
                ccExpYear: this.$('#ccExpYear').val(),
                cvv: this.$('#cvv').val(),
                nameOnCard: this.$('#nameOnCard').val(),
                deviceMac: this.$('#deviceMac').val(),
                itemId: this.$('#itemId').val()
            });
        },

        maskCCDetails: function () {
            this.model.set({
                ccNo: '00000000000000000',
                ccExpMonth: '00',
                ccExpYear: '00',
                cvv: '000'
            });
        },

        onSubmitError: function (model, response, message) {
            this.$('#feedback').addClass('show errorMsg').removeClass('hide').text(message);
        },

        onSubmitSuccess: function () {
            this.$('#feedback').addClass('show successMsg').removeClass('hide').text('Registration Successful.');
        },

        submit: function () {

            // Remove feedback message if any.
            this.$('#feedback').addClass('hide').removeClass('show').text('');


            // load form values to model.
            this.loadModel();


            // Validate Form values
            var validationError = this.model.validate();
            if(validationError) {

                //Show error on Validation error.
                _.each(_.keys(validationError), function(errorField) {
                    this.$('#'+errorField).addClass('hasError');
                }.bind(this));
                //this.$('#feedback').addClass('show errorMsg').removeClass('hide').text('Please enter all required values.');
                return;
            }

            // listen to response of form submission.
            this.listenToOnce(this.model, 'error', this.onSubmitError);
            this.listenToOnce(this.model, 'sync', this.onSubmitSuccess);

            this.getPaymentMethodNonce(function (nonce) {

                //Set nonce in the model
                this.model.set('paymentMethodNonce',nonce);

                //Mask CC details from model after nonce is created. This is for security reason.
                this.maskCCDetails();

                console.log('Model : ' + JSON.stringify(this.model.toJSON()));

                // On successful validation submit the form values.
                this.model.save();
            }.bind(this));
        },

        afterRoute: function () {

            //Bind backbone validation.
            Backbone.Validation.bind(this);

        }
    });

    return RegisterView;
});
