describe('Sample', function () {
    'use strict';

    process.env.NODE_ENV = 'test';

    var PORT = null;
    var request = require('request');
    var server = require('../src/server');

    var log = server.getLogger();

    beforeEach(function(done){
        if (PORT === null) {
            server.startServer(function(server){

                PORT = server.address().port;
                log.warn('SERVER %d', PORT);
                done();
            });
        }else {
            done();
        }
    });

    it('should pass a test', function () {
        expect(1).toBe(1);
    });

    it('should have server running', function (done) {
        request('http://127.0.0.1:' + PORT + '/api/key', function (error, response, body) {
            var bJson = JSON.parse(body);
            expect(bJson.response).toBe('get-key');
            done();
        });
    });

    it('should respond to GET', function (done) {
        request('http://127.0.0.1:' + PORT + '/api/key', function (error, response, body) {
            var bJson = JSON.parse(body);
            expect(bJson.response).toBe('get-key');
            done();
        });
    });

    it('should respod to POST', function (done) {
        request.post('http://127.0.0.1:' + PORT + '/api/key', function (error, response, body) {
            var bJson = JSON.parse(body);
            expect(bJson.response).toBe('post-key');
            done();
        });
    });
});