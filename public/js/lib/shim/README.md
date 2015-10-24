This is a list of what shims we currently use and why:

- [ES5 shim](https://github.com/es-shims/es5-shim) for IE<9 and included conditionally
- [compat.js](https://github.paypal.com/WalletUI/8ballUI/blob/develop/public/js/lib/compat.js) is our main shim entry point and included in our normal require.js bundle
	- [MDN's function.prototype.bind shim](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) for older Safari versions
	
**Note:**
With these additions we should be able to use almost all of [ES5](http://kangax.github.io/compat-table/es5/) including `Function.prototype.bind`, `Array.prototype.forEach`, `Array.prototype.map`, etc.

See also: [PayPal's official browser support policy](https://uie.paypal.com/content/browser-support-policy-official-data)