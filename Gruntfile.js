'use strict';

//Start of module exports
module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Project settings
  var project = {
    // Configurable paths
    app: 'app',
    dist: 'dist',
    assets: 'app/assets',
    scss: '<%= project.assets %>/scss',
    css: '<%= project.assets %>/styles'
  }

  // Define the configuration for all the tasks
  grunt.initConfig({

    project: project,

    //Localhost connection
    connect: {
      server: {
        options: {
          port: 9000,
          livereload: 35729,
          hostname: 'localhost'
        },
        livereload: {
          options: {
            middlemare: function(connect) {
              return [
                connect.static(project.app)
              ];
            }
          }
        }
      }
    },
    // End of ocalhost connection

    //Watches files for changes and runs tasks based on the changed files
    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },
      sass: {
          files: ['<%= project.scss %>/**.scss'],
          tasks: ['compass:dev']
      },
      livereload: {
        options: {
          livereload: '<%= connect.server.livereload %>'
        },
        files: [
          '<%= project.app %>/*.html', // index.html, 404.html, etc
          '<%= project.assets %>/scripts', // arrange code by modules
          '<%= project.scss %>/**.scss',
          '<%= project.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
        ]
      }
    },
    //End of watches files for changes and runs tasks based on the changed files

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      dev: {
        options: {
          sassDir: '<%= project.scss %>',
          cssDir: '<%= project.css %>',
          imagesDir: '<%= project.assets %>/img',
          javascriptsDir: '<%= project.assets %>/scripts',
          outputStyle: 'nested'
        }
      }
    }
    // End of compiles Sass to CSS and generates necessary files if requested

  });
  // End of define the configuration for all the tasks

  //Main grunt task we use
  grunt.registerTask('serve', [
    'connect:server',
    'watch'
  ]);

  grunt.registerTask('default', ['compass']);

};
//End of module exports
