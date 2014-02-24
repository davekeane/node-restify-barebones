describe('Sample', function () {
    'use strict';

    var PORT = '33445',
        request = require('request');

    require('../src/server').startServer(PORT);

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