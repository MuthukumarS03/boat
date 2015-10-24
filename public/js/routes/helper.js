/**
 * Created by msudalaiyandi on 10/24/15.
 */

'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'backboneSubroute'
], function ($, _, Backbone, SubRoute) {

    'use strict';

    return Backbone.SubRoute.extend({

        view: {}, /* Holds reference to current view loaded */

        _savedViews: {},

        /**
         * Handles default view use cases
         * @param {Object} options An object containing:
         * @param {String} name The action being passed to the route from the URI
         * @param {Object} args The arguments being passed to the view upon initialization
         * @param {Function} callback Function to execute after scripts are loaded
         */
        showView: function (options) {
            options = options || {};
            options.name = options.name || $('body').data('view-name');

            var name = options.name,
                args = options.args,
                callback = options.callback,
                afterRender = options.afterRender;

            // name and callback are both optional
            if (typeof name === 'function') {
                callback = name;
                name = null;
            }

            if (typeof args === 'function') {
                this.showView({
                    name: name,
                    callback: args,
                    afterRender: afterRender
                });
                return;
            }

            // callback immediately if already loaded
            if (require.defined('view/' + name) && callback && this._savedViews[name]) {
                callback(this._savedViews[name]);
                return;
            }

            if (name) {
                this.loadScripts(options);
            }

        },

        getPath: function (scriptName) {

            return scriptName;
        },

        /**
         * Handles default view use cases
         * @param {Object} options An object containing optional arguments, a callback, and a stop-gap for afterRender
         */
        loadScripts: function (options) {

            //alert('Options : ' + JSON.stringify(options));

            var name = options.name,
                args = options.args,
                callback = options.callback,
            // afterRender could be false
                afterRender = typeof options.afterRender !== 'undefined' ? options.afterRender : true,
                path = this.getPath(name);

            // HACK: getPath adds "/phone/" for all script requests
            // on mobile devices (which breaks non-settings flows on mobile)
            path = name;

            // avoid duplicate loading
            if (this._savedViews[path]) {
                this.view = this._savedViews[path];
                if (callback) {
                    return callback(name);
                }
                return this.view;
            }

            // load things and set them up
            require(['view/' + path], $.proxy(function (ViewClass) {
                this.view = new ViewClass(args);
                this._savedViews[path] = this.view;
                this.view.delegateEvents();
                if (afterRender) {
                    this.view.afterRender();
                }
                if (callback) {
                    callback(this.view);
                }
            }, this));
        },

        /**
         * Handling page cleanup of widgets from previous views
         * Subroute should handle the cleaning of the view
         */
        cleanView: function () {
            // close overpanel if it exists

            // close modal if it exists
            var $openModal = $('.openModal');
            if ($openModal && $openModal.modal) {
                $openModal.modal('hide');
            }
        }
    });
});

