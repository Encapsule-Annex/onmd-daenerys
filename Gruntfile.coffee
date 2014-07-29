
module.exports = (grunt) ->

    configObject =
        pkg: grunt.file.readJSON("package.json")

        coffee:
            compile:
                files:
                    'dist/daenerys.js': 'src/daenerys.coffee'
                    'dist/pyre.js': 'src/pyre.coffee'

        jshint:
            options: {}
            files: [ 'onmd-onmd.js', './dist/*.js', './dist/**/*.js' ]


        mochaTest:
            options:
                reporter: 'spec'
            src: [ 'test/test-main.js' ]

        clean: [ 'dist' ]

    grunt.initConfig configObject

    grunt.loadNpmTasks "grunt-contrib-coffee"
    grunt.loadNpmTasks "grunt-contrib-clean"
    grunt.loadNpmTasks "grunt-mocha-test"
    grunt.loadNpmTasks "grunt-contrib-jshint"

    grunt.registerTask "test", [ "mochaTest" ]
    grunt.registerTask "default", [ "clean", "coffee:compile", "test" ]
