(function(){
    'use strict';

    /**
     * @api {get} /api/:key Sample GET
     * @apiName GetSample
     * @apiGroup Sample
     * @apiVersion 0.1.0
     *
     * @apiParam {String} key Request Key
     *
     * @apiError NoKeyError No request key.
     */
    var sampleGETFunction = function (req, res, next) {
        var obj = {response: 'get-' + req.params.key};
        req.log.debug('get-sent');
        res.json(obj);
        return next();
    };

    /**
     * @api {post} /api/:key Sample POST
     * @apiName PostSample
     * @apiGroup Sample
     * @apiVersion 0.1.0
     *
     * @apiParam {String} key Post Key
     *
     * @apiError NoKeyError No request key.
     */
    var samplePOSTFunction = function (req, res, next) {
        var obj = {response: 'post-' + req.params.key};
        req.log.debug('post-sent');
        res.json(obj);
        return next();
    };


    module.exports = function (server) {
        server.get('api/:key', sampleGETFunction);
        server.post('api/:key', samplePOSTFunction);
    };

})();