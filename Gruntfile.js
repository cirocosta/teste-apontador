'use strict';

 module.exports = function(grunt) {
 
    var pkg = grunt.file.readJSON('package.json'); 
    var gruntConfig = {
        pkg: pkg,

        uglify: {
            options: {
                mangle: true
            },
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: '**/*.js',
                    dest: 'build/',
                    ext: '.min.js'
                }]
            }
        },

        cssmin : {
            minify: {
                expand: true,
                cwd: 'src/',
                src: '**/*.css',
                dest: 'build/',
                ext: '.min.css'
            }
        },

        qunit: {
            all: ['tests/index.html']
        },

        jshint: {
            all: [
                'Gruntfile.js',
                'src/*.js',
                'tests/*/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        watch: {
            application_code: {
                files: ['src/**/*.js', 'src/**/*.css'],
                tasks: ['build', 'test']
            },
        },

        connect: {
            server: {
                options: {
                    port: 8000,
                    base: '.'
                }
            }
        }
     

    };
 
    grunt.initConfig(gruntConfig);
 
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('build', ['uglify', 'cssmin']);
    grunt.registerTask('test', ['jshint', 'connect','qunit']);
    grunt.registerTask('default', ['build', 'watch']);
};