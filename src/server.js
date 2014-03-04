(function(){
    'use strict';

    var restify = require('restify');
    var Bunyan = require('bunyan');
    var mongojs = require('mongojs');
    var util = require('util');

    var env = process.env.NODE_ENV || 'development';
    var config = require('../config/config')[env];


    var log = new Bunyan({
        name: 'rest-api',
        streams: [{
            stream: process.stdout,
            level: 'debug'
        }, {
            path: config.log.path,
            level: config.log.level || 'debug'
        }],
        serializers: {
            req: Bunyan.stdSerializers.req
        }
    });

    var server = restify.createServer({
        log: log
    });

    var mongoURI = util.format('%s:%s/%s', config.database.host, config.database.port, config.database.database);
    log.debug('connecting to mongodb at "%s"', mongoURI);

    var db = mongojs(mongoURI);

    server.use(function(req, res, next) {
        req.db = db.collection(config.database.name);
        req.config = config;
        next();
    });

    // Load in the routes
    require('./routes/sample')(server);


    server.get(/\/docs\/?.*/, restify.serveStatic({
        directory: './build/docs',
        default: 'index.html'
    }));

    exports.startServer = function (callback) {

        var port = config.server.port;

        server.listen(port, config.server.host, function () {
            log.debug('%s server listening at %s', server.name, server.url);

            if (typeof callback === 'function'){
                callback(server);
            }
        });
    };

    exports.getDatabase = function() {
        return db.collection(config.database.name);
    };

    exports.getLogger = function() {
        return log;
    };

    // Start the server if this file was executed.
    if (require.main === module){
        exports.startServer();
    }

})();