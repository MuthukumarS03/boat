/*
 * nougat.js v0.0.1 - Application Mediator/Sandbox Library
 * This module performs the function of mediator/sandbox.
 *
 * @author Erik Toth <ertoth@paypal.com>
 */

/*global define:false, requirejs:true */
/*jslint plusplus:true, nomen:true */
/*eslint no-unused-vars:0, new-cap:0 */

define([
	'jquery',
	'dust',
	'dust-helpers-supplement'
], function ($, dust) {

	'use strict';

	var ViewRenderer = null,
		DustRenderer = null,
		Nougat = null;

	/**
	 * Executes a provided function once per array element or object property.
	 * Based on http://es5.github.com/#x15.4.4.18
	 * @param {Object} obj the array or object to enumerate
	 * @param {Function} fn the function to invoke on each element
	 * @param {Object} [context] Object to use as this when executing callback.
	 */
	function forEach(obj, fn, context) {
		if (obj instanceof Array && Array.prototype.forEach) {
			return obj.forEach(fn, context);
		}

		var object = Object(obj),
			prop = null,
			result = null;

		for (prop in object) {
			if (object.hasOwnProperty(prop)) {
				result = fn.call(context, object[prop], prop, object);
				// Provide the ability to short circuit and fail-fast
				if (result === false) {
					break;
				}
			}
		}
	}

	/**
	 * A basic object mixin implementation. Copies the properties from the source
	 * object to the destination object.
	 * @param {Object} src the object containing the properties to be copied
	 * @param {Object} dest the object to which the properties should be copied
	 */
	function mixin(src, dest) {
		var prop = null;
		for (prop in src) {
			if (src.hasOwnProperty(prop)) {
				dest[prop] = src[prop];
			}
		}
		return dest;
	}

	/**
	 * A simple object extend implementation that copies properties from several
	 * source objects into the destination object.
	 * @param {Object} dest the object to which the properties should be copied
	 * @param {Object...} sources the objects from which the properties should be copied
	 */
	function extend(dest) {
		forEach(Array.prototype.slice.call(arguments, 1), function (src) {
			mixin(src, dest);
		});
		return dest;
	}


	/**
	 * An abstract view renderer implementation that's based on Promises
	 * @constructor
	 */
	ViewRenderer = function () {
		// Intentionally left blank
	};

	ViewRenderer.prototype = {

		/**
		 * The main public API for rendering a template
		 * @param template the name of the template to render
		 * @param context the context to pass to the renderer
		 * @returns a Promise
		 */
		render: function (template, context) {
			var deferred = new $.Deferred();
			this._doRender(template, context, function (error, out) {
				if (error) {
					return deferred.reject(error);
				}
				deferred.resolve(out, template);
			});
			return deferred.promise();
		},

		/**
		 * The method to override to provide the view rendering implementation
		 * @private
		 * @param template the name of the template to render
		 * @param context the content to pass to the renderer
		 * @param callback the callback invoked when rendering is complete
		 */
		_doRender: function (template, context, callback) {
			// TODO: Implement
		}
	};

	/**
	 * A Dust view rendering implementation
	 * @constructor
	 */
	DustRenderer = function (nougat) {
		var DEFAULT_PATH = '/templates/%s.js';

		dust.onLoad = function (name, callback) {
			var path = nougat.getContext().templatePath || DEFAULT_PATH,
				template = path.replace('%s', name);
			//alert('nougat :: template ' + template);
			require([template], function () {
				// Merely using requireJs to the load compiled template so undefining
				// it as soon as it's loaded so doesn't sit in the requireJs *and* dust.js
				// caches. Also, we know it's JS, thus doesn't need to be compiled so
				// callback has no arguments.
				requirejs.undef(template);
				setTimeout(callback, 0);
			});
		};
	};

	DustRenderer.prototype = extend(ViewRenderer.prototype, {
		_doRender: function (template, context, callback) {
			var base = {};
			context = context || {};

			// Ugh.
			if (context.content) {
				base.cn = context.content;
				delete context.content;
			}

			context = dust.makeBase(base).push(context);
			dust.render(template, context, callback);
		}
	});

	Nougat = function () {
		this._context = {};
		this._eventCache = {};
		this.viewRenderer = new DustRenderer(this);
	};

	Nougat.prototype = {

		/**
		 * Sets the context
		 * @param context
		 * @returns the context
		 */
		setContext: function (context) {
			return mixin(context, this._context);
		},

		/**
		 *
		 * @returns the current context object
		 */
		getContext: function () {
			return this._context;
		},

		/**
		 *
		 * @returns the template path directory excluding language
		 */
		getTemplateBasePath: function () {
			var context = this.getContext(),
				oldPath = context.templatePath,
				fileType = '/%s.js',
				// templates are either on /templates/{country} or paypalobjects.com/{md5hash}/{country}
				pathLength = oldPath.lastIndexOf('/', oldPath.length - fileType.length - 1),
				templateDirectory = oldPath.substring(0, pathLength) + '/';

			return templateDirectory;
		}

	};

	return new Nougat();

});
