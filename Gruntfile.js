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
    css: '<%= project.assets %>/styles',
    openTo: 'http://localhost:9000/app/'
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

    //Open to specfic path
    open: {
      dev: {
        path: '<%= project.openTo %>'
      }
    },
    //End of open to specfic path

    //Watches files for changes and runs tasks based on the changed files
    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },
      sass: {
        files: ['<%= project.scss %>/**/*.scss'],
        tasks: ['compass:dev']
      },
      js: {
        files: ['<%= project.assets %>/scripts/*.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.server.livereload %>'
        },
        files: [
          '<%= project.app %>/*.html', // index.html, 404.html, etc
          '<%= project.assets %>/scripts/*.js', // arrange code by modules
          '<%= project.scss %>/**/*.scss',
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
    },
    // End of compiles Sass to CSS and generates necessary files if requested

    //Autoprefix.  Adds -moz, -webkit, etc based on options.
    autoprefixer: {
      // prefix the specified file
      single_file: {
        options: {
          // Target-specific options go here.
          browsers: ['last 2 versions']
        },
        flatten: true,
        src: '<%= project.css %>/main.css',
        dest: '<%= project.css %>/main.css'
      }
    }
    //End of Autoprefix.  Adds -moz, -webkit, etc based on options.

  });
  // End of define the configuration for all the tasks

  //Main grunt task we use
  grunt.registerTask('serve', [
    'connect:server',
    'open:dev',
    'watch'
  ]);

  grunt.registerTask('prefix', [
    'autoprefixer'
  ]);

  grunt.registerTask('default', ['compass']);

};
//End of module exports
