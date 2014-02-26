var restify = require('restify');
var Bunyan = require('bunyan');

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


// Load in the routes
require('./routes/sample')(server, config);


exports.startServer = function (port) {
    if (port === undefined){
        port = config.server.port;
    }

    server.listen(port, config.server.host, function () {
        log.debug('%s server listening at %s', server.name, server.url);
    });
};