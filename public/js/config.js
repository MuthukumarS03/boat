/**
 * Created by msudalaiyandi on 10/24/15.
 */
'use strict';

requirejs.config({
    deps: ['app'],
    paths: {
        'jquery': 'lib/jquery-1.10.2',
        'jqueryUI': 'lib/jquery.ui.widget',
        'underscore': 'lib/lodash.underscore-2.3.0',
        'backbone': 'lib/backbone-1.1.0',
        'nougat': 'core/nougat',
        'BaseView': 'core/baseView',
        'dust': 'lib/dust-core-2.0.3',
        'dust-helpers': 'lib/dust-helpers-1.1.1',
        'dust-helpers-supplement': 'lib/dust-helpers-supplement',
        'backboneSubroute': 'lib/backbone-subroute-0.4.1',
        'bootstrap-modal': 'lib/bootstrap3/modal',
        'backboneSyphon' : 'lib/backbone.syphon-0.4.1',
        'backboneValidation' : 'lib/backbone-validation-amd',
        'braintree': 'lib/braintree-client'
    },
    useStrict: true,
    shim: {
        'dust': {
            exports: 'dust'
        },
        'dust-helpers': {
            deps: ['dust']
        },
        'dust-helpers-supplement': {
            deps: ['dust', 'dust-helpers']
        },
        'jqueryUI': {
            deps: ['jquery']
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'backboneSubroute': {
            deps: ['backbone']
        },
        'bootstrap-modal': {
            deps: ['jquery']
        }
    }
});