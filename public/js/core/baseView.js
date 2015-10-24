/*eslint no-unused-vars:0 */
/**
 * Abstract view which enables rendering contents with a template.
 */
define([
	'nougat',
	'underscore',
	'backbone'
],
function (nougat, _, Backbone) {

	'use strict';


	return Backbone.View.extend({

		/**
		 * The name of the template that represents this view.
		 * Must be defined for render to succeed.
		 */
		template: null,

		/**
		 * A default implementation of the standard Backbone render method.
		 * Handles rendering a template with the current view model.
		 * @returns the current view instance
		 */
		render: function () {
			var renderer = nougat.viewRenderer,
				data,
				template;

			_.bindAll(this, '_doRender', 'renderError', 'afterRender');

			this.beforeRender();

			data = this.serialize();

			if (typeof this.template === 'function') {
				template = this.template();
			} else {
				template = this.template;
			}

			//alert('Template : ' + template);

			renderer.render(template, data)
				.done(this._doRender)
				.fail(this.renderError)
				.always(this.afterRender);

			return this;
		},

		/**
		 * 'Protected' implementation of what to do with template render result.
		 * Override to get access to raw content string.
		 * @param {String} content the rendered template string
		 * @param {String} template the name of this template
		 */
		_doRender: function (content, template) {
			this.$el.html(content);
		},

		/**
		 * A handler to be invoked prior to a template being rendered
		 * @optional
		 */
		beforeRender: function () {
			// TODO: [optional] override
		},

		/**
		 * A handler to be invoked once template rendering is complete.
		 */
		afterRender: function () {
			// TODO: [optional] override
		},

		/**
		 * The error handler for template rendering
		 * @param {Error} err the error that occurred
		 */
		renderError: function () {
			// TODO: [optional] override
		},

		/**
		 * Gets the current model or collection in JSON form.
		 * @returns
		 */
		serialize: function () {
			var data = this.model || this.collection;
			if (data && data.toJSON) {
				return data.toJSON();
			}
			return {};
		},

		/**
		 * Toggle the loading spinner
		 * Adds the hasSpinner class to the view's $el
		 * @param isLoading - boolean true or false
		 * @return this - the view
		 */
		toggleLoading: function (isLoading) {
			this.$el.toggleClass('hasSpinner', isLoading);
			return this;
		}
	});

});
