/**
 * Enhance Backbone.sync to know about our AJAX error handling
 */
define(['backbone'], function (Backbone) {

	'use strict';

	var originalSync = Backbone.sync;
	Backbone.sync = function (method, model, options) {

		// Set options to error to the new error function
		var oldSuccess = options.success;


		// override the success handler to look for errors
		// these errors need to follow our special format
		options.success = function (response) {
			// handle errors
			if (response.error) {
				if (response.error.code === 'captcha') {
					model.trigger('captcha', model, response, response.error.captcha);
				} else if (response.error.code === 'authRequired') {
					// Redirect to the classic experience since authflow needs a fix in 8ball App or Authmessagingsparta
					window.location = response.data.location;
				} else if (response.error.message) {
					model.trigger('error', model, response, response.error.message); // add message as extra item
				}

				// An extra call (for loaders if you want)
				model.trigger('sync-error');
				return;
			}

			// handle success
			oldSuccess(response);
		};

		// this is reserved for errors that we did not properly catch
		// we cannot easiliy i18n these errors, because they are unexpected
		options.error = function (response) {
			// Show the generic error in this case
			if (response.error && response.error.code === 'authRequired') {
				model.trigger('error', model, response, $('body').data('genericerror'));
			}
		};

		// Call the stored original Backbone.sync method with the new settings
		originalSync(method, model, options);
	};
});
