
module.exports = function (grunt) {
    'use strict';

    var appPath = ['src/**/*.js'],
        testPath = ['test/*.js'],
        allPath = appPath.concat(testPath);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            src: allPath
        },
        jasmine_node: {
            projectRoot: '.'
        },
        apidoc: {
            myapp: {
                src: "src/",
                dest: "build/docs/"
            }
        },
        clean: {
            build: [
                'build'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-apidoc');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'jshint', 'jasmine_node', 'apidoc']);
    grunt.registerTask('test', ['jshint', 'jasmine_node']);

    grunt.registerTask('start', function () {
        this.async();
        var server = require('./src/server');
        server.startServer('33445');
    });

};