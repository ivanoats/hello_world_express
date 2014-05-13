module.exports = function(grunt) {
  
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'server.js']
    },
    clean: ['dist'],
    copy: {
      all: {
        expand: true,
        cwd: 'public/',
        src: ['*.css', '*.html', '/images/**/*', '!Gruntfile.js'],
        dest: 'dist/',
        flatten: true,
        filter: 'isFile'
      },
    },
    browserify: {
      all: {
        src: 'src/*.js',
        dest: 'dist/app.js'
      },
      options: {
        transform: ['debowerify'],
        debug: true
      }
    },
    
    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: 'server.js'
        }
      },
      prod: {
        options: {
          script: 'server.js',
          node_env: 'production'
        }
      },
      test: {
        options: {
          script: 'server.js'
        }
      }
    },
    casper: {
      acceptance : {
        options : {
          test : true,
        },
        files : {
          'test/acceptance/casper-results.xml' : ['test/acceptance/*_test.js']
        }
      }
    }
    
  });
  
  grunt.registerTask('server', [ 'jshint', 'express:dev' ]);
  grunt.registerTask('test',['express:dev','casper']);
  grunt.registerTask('default', ['jshint', 'test']);
  grunt.registerTask('build',['clean', 'browserify', 'copy']);
};