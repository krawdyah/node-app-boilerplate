'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compass: {
      dist: {
        options: {
          sassDir: 'public/stylesheets/sass',
          cssDir: 'public/stylesheets',
          outputStyle: 'compressed'
        }
      }
    },
    coffee: {
      compile: {
        files: {
          'public/javascripts/application.js': [ 'public/javascripts/_coffee/*.coffee' ]
        }
      }
    },
    uglify: {
      application: {
        files: {
          'public/javascripts/application.min.js': ['public/javascripts/application.js']
        }
      }
    },
    jshint: {
      files: ['server.js', 'app/**/*.js', 'config/*.js', 'public/javascripts/*.js'],
      options: {
        asi: false,
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        laxcomma: true,
        laxbreak: true
      }
    },
    watch: {
      tasks: ['jshint', 'compass', 'coffee'],
      jshint: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      },
      coffee: {
        files: ['public/javascripts/_coffee/*.coffee'],
        tasks: ['coffee']
      },
      compass: {
        files: ['public/stylesheets/sass/**/*.sass'],
        tasks: ['compass']
      },
      options: {
        livereload: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.event.on('server', function(done) {
    grunt.child = grunt.util.spawn({ 
        cmd: 'node', args: ['server']
      }, function (error, result){
        grunt.log.error(result.stderr).writeln()
    }).stdout.on('data', function(buffer) {
      grunt.log.write('\r[node] > '.cyan + String(buffer));
    });
    setTimeout(function() {
      grunt.log.writeln('Wait! Starting server...');
      done();
    }, 1000);
  });

  grunt.event.on('deploy', function(done) {
    grunt.child = grunt.util.spawn({ 
        cmd: 'git', args: ['push', 'heroku', 'master']
      }, function (error, result){
        grunt.log.write('\r\n\r\n');
        grunt.log.error(result.stderr).writeln()
    }).stdout.on('data', function(buffer) {
      grunt.log.write('\r\n[deploy] > '.cyan + String(buffer));
    });
    grunt.log.write('\r\n[deploy] > '.cyan + 'Starting deploy...');
  });

  grunt.registerTask('deploy', 'Deploy to heroku', function(){
    grunt.event.emit('deploy', this.async());
  });

  grunt.registerTask('server', 'Starts node server', function() {
    grunt.event.emit('server', this.async());
  });

  grunt.registerTask('default', ['server', 'jshint', 'coffee', 'compass', 'watch']);
};
