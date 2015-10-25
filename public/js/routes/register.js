/**
 * Created by msudalaiyandi on 10/24/15.
 */

define([
    'jquery',
    'underscore',
    'routes/helper'
], function ($, _, SubRouteHelper) {

    'use strict';

    return SubRouteHelper.extend({

        routes: {
            '': 'showRegister',
            'customer': 'showRegister'
        },

        loadView: function (args) {
            var name;

            if (!this.registerView) {
                name = 'register';

                this.showView({
                    name: name,
                    args: args,
                    afterRender: false,
                    callback: $.proxy(function(view) {
                        this.registerView = view;
                        this.loadView( args);
                    }, this)
                });
                return;
            }

            this.showView({
                name: 'register',
                args: args,
                afterRender: false,
                callback: $.proxy(function(view) {
                    if (view) {
                        this.view = view;
                        this.view.options = args;
                    }

                    this.view.afterRoute();

                }, this)
            });
        },

        showRegister: function () {
            this.loadView('');
        },

        noop: $.noop
    });

});
