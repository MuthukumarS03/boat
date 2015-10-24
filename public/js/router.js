/**
 * Created by msudalaiyandi on 10/24/15.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'nougat',
    'routes/register'
], function ($, _, Backbone, nougat, RegisterView) {

    'use strict';

    return Backbone.Router.extend({

        /* Detect if the browser supports HTML5 push state */
        hasPushState: window.history && 'pushState' in window.history,

        /**
         * Register all the interesting URIs that will fire off generic or specific functionality
         */
        routes: {
            'register(/*subroute)': 'invokeRegister'
            /* No generic route to avoid downloading/initializing JS files that do not exist */
        },

        /**
         * Important setup to start using the router.
         */
        initialize: function() {

            var ROOT = '/boat/'

            // Get current fragment or current path for route for non pushState browsers
            var hash = window.location.hash,
                fragment = (hash && hash.length === 0) ? hash : window.location.pathname.substr(ROOT.length);

            // set the default templates path depending on the value from json contract
            //alert('Context : ' + JSON.stringify($(document.body).data()));
            nougat.setContext($(document.body).data());

            Backbone.history.start({
                silent: true, // Add hashUrl before executing the route for IE
                pushState: this.hasPushState, // Use HTML5 Push State if it's supported
                root: ROOT // Initial path for app
            });

            // Load the initial route, using pushstate if supported, hashUrl if not
            if (this.hasPushState) {
                Backbone.history.loadUrl(Backbone.history.getFragment());
            } else {
                var rootLength = Backbone.history.options.root.length;
                // Get current fragment or current path for route for non pushState browsers
                fragment = window.location.hash || window.location.pathname.substr(rootLength);

                // Clear the history for IE for refreshing the page
                Backbone.history.fragment = null;
                $(window).scrollTop();

                Backbone.history.navigate(fragment, { trigger: true, replace: true });
            }
        },

        invokeRegister: function () {
            if (!this.RegisterView) {
                this.RegisterView = new RegisterView('register', {createTrailingSlashRoutes: true});
            }
        }

    });

});
