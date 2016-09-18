'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js'
      }
    },
    sass: {
      dist: {
        files: {
          'app/assets/output-css/style.css': 'app/assets/sass/style.scss'
        }
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      js: {
        files: [
          'app.js',
          'app/**/*.js',
          'config/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      css: {
        files: [
          'app/assets/sass/*.scss'
        ],
        tasks: ['sass'],
        options: {
          livereload: reloadPort
        }
      },
      views: {
        files: [
          'app/views/dev/*.handlebars',
          'app/views/dev/**/*.handlebars'
        ],
        tasks: ['clean', 'copy'],
        options: { livereload: reloadPort }
      },
      deps: {
        files: [
          './bower.json'
        ],
        tasks: ['wiredep']
      }
    },
    // injeta dependencias do bower no html principal
    wiredep: {
      task: {
        src: ['app/views/dev/layouts/main.handlebars'],
        ignorePath: '../../../assets'
      }
    },
    // copia as views originais para a pasta de producao
    copy: {
      task: {
        files: [
          { 
            expand: true,
            cwd: 'app/views/dev/',
            src: ['**/*'], 
            dest: 'app/views/prod/'
          }
        ]
      }
    },
    // exclui as views da pasta de producao antes de copiar novamente
    clean: {
      task: {
        src: 'app/views/prod/'
      }
    },
    // altera o html principal na producao para apontar para os arquivos
    // minificados e concatenados
    usemin : {
      html: 'app/views/prod/layouts/main.handlebars'
    },
    // identifica os arquivos que devem ser minificados e concatenados
    useminPrepare: {
      options: {
        root: 'app/views/prod',
        dest: 'app/views/prod'
      },
      html: 'app/views/prod/layouts/main.handlebars'
    }
  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function(err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded)
            grunt.log.ok('Delayed live reload successful.');
          else
            grunt.log.error('Unable to make a delayed live reload.');
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('deploy_assets', [
    'clean',
    'copy',
    'useminPrepare',
    'concat',
    'uglify',
    'cssmin',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'sass',
    'develop',
    'watch'
  ]);
};
