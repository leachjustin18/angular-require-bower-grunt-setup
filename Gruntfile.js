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
  };

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
        files: ['<%= project.assets %>/scripts/{,*/}*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      livereload: {
        options: {
          livereload: '<%= connect.server.livereload %>'
        },
        files: [
          '<%= project.app %>/{,*/}*.html', // index.html, 404.html, etc
          '<%= project.assets %>/scripts/{,*/}*.js', // arrange code by modules
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
      singleFile: {
        options: {
          // Target-specific options go here.
          browsers: ['last 2 versions']
        },
        flatten: true,
        src: '<%= project.css %>/main.css',
        dest: '<%= project.css %>/main.css'
      }
    },
    //End of Autoprefix.  Adds -moz, -webkit, etc based on options.

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= project.assets %>/scripts/{,*/}*.js'
      ]
    },
    //Used to optimize require.js with r.js
    //http://requirejs.org/docs/optimization.html
    //All options https://github.com/jrburke/r.js/blob/master/build/example.build.js
    requirejs: {
      dist: {
        options: {
          dir: '<%= project.assets %>/bScripts/',
          baseUrl: '<%= project.assets %>/scripts', // Directory to look for the require configuration file
          mainConfigFile: '<%= project.assets %>/scripts/require-config.js', // This is relative to the grunt file
          modules: [{
            name: 'main'
          }], // create a global bundle
          preserveLicenseComments: false, // remove all comments
          removeCombined: true, // remove files which aren't in bundles
          optimize: 'none', // minify bundles with uglify 2
          useStrict: true
        }
      }
    }

  });
  // End of define the configuration for all the tasks

  //Main grunt task we use
  grunt.registerTask('serve', [
    'autoprefixer',
    'connect:server',
    'open:dev',
    'watch'
  ]);

  grunt.registerTask('prefix', [
    'autoprefixer'
  ]);

  grunt.registerTask('require', [
    'requirejs'
  ])

  grunt.registerTask('default', ['compass']);

};
//End of module exports
