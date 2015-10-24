/**
 * Created by msudalaiyandi on 10/24/15.
 */

'use strict';

define([
    'jquery',
    'underscore',
    'BaseView'
], function ($, _, BaseView) {

    var RegisterView = BaseView.extend({

        initialize: function () {
            alert('inside registerview initialize');
        },

        afterRoute: function () {
            alert('inside registerview afterRoute');
        }

    });

    return RegisterView;

});
