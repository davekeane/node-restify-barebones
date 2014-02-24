var restify = require('restify');
var Bunyan = require('bunyan');

var log = new Bunyan({
    name: 'rest-api',
    streams: [{
        stream: process.stdout,
        level: 'debug'
    }, {
        path: 'server.log',
        level: 'debug'
    }],
    serializers: {
        req: Bunyan.stdSerializers.req
    }
});

var server = restify.createServer({
    log: log
});


// Load in the routes
require('./routes/sample')(server);


exports.startServer = function (port) {
    server.listen(port, 'localhost', function () {
        log.debug('%s server listen at %s', server.name, server.url);
    });
};