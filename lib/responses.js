/**
 * Created by msudalaiyandi on 10/24/15.
 */

'use strict';

module.exports = {

    renderHTMLandJSON: function (req, res){
        res.format({
            html: function () {
                res.render(req.model.viewName, req.model);
            },
            json: function () {
                res.json(req.model);
            }
        });
    },

    renderJSON: function (req, res){
        console.log('req.model : ' + JSON.stringify(req.model));
        res.json(req.model);
    }

};