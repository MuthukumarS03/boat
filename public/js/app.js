'use strict';
require(['config'], function (config) {

    require([
        'jquery',
        'router',
        'lib/shim/compat',
        'lib/bb-errors',
        'lib/auto-submit'
    ], function ($, Router) {

        //var csrf = $('body').data('token');
        //
        //// Adding CSRF token for all AJAX calls
        //$.ajaxPrefilter(function(opts, origOpts, jqXHR) {
        //    jqXHR.setRequestHeader('X-CSRF-Token', csrf);
        //});

        var router = new Router();

    });

});
