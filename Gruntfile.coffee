
module.exports = (grunt) ->


    appPath = ['src/**/*.js']
    testPath = ['test/*.js']
    allPath = appPath.concat testPath

    # Project configuration.
    grunt.initConfig
        pkg: grunt.file.readJSON('package.json'),
        jshint:
            options:
                jshintrc: '.jshintrc'
            src: allPath

        jasmine_node:
            projectRoot: '.'
            jUnit:
                report: true
                savePath: './build/test-reports/'
                useDotNotation: true
                consolidate: true

        apidoc:
            myapp:
                src: 'src/',
                dest: 'build/docs/'

        clean:
            build:
                'build'

        # Monitor file changes and restart server
        nodemon:
            dev:
                script: 'src/server.js',
                options:
                    watchedExtensions: ['js']

    grunt.loadNpmTasks 'grunt-contrib-jshint'
    grunt.loadNpmTasks 'grunt-contrib-clean'
    grunt.loadNpmTasks 'grunt-jasmine-node'
    grunt.loadNpmTasks 'grunt-nodemon'
    grunt.loadNpmTasks 'grunt-apidoc'

    # Default task(s).
    grunt.registerTask 'default', ['clean', 'jshint', 'jasmine_node', 'apidoc']
    grunt.registerTask 'test', ['jshint', 'jasmine_node']

    grunt.registerTask 'start', ['nodemon']
