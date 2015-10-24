/**
 * Super simple jQuery plugin type thing to auto-submit forms that have this data attribute.
 */

define(['jquery'], function ($) {
	var $form = $('form[data-auto-submit]');
	if ($form.length) {
		$form.submit();
	}
});
