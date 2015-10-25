/**
 * Created by msudalaiyandi on 10/24/15.
 */

'use strict';

define([
    'jquery',
    'underscore',
    'BaseView',
    'backboneValidation'
], function ($, _, BaseView) {

    var RegisterView = BaseView.extend({

        el: '#register',

        initialize: function () {

        },



        afterRoute: function () {

            //Bind backbone validation.
            Backbone.Validation.bind(this);

        }
    });

    return RegisterView;
});
