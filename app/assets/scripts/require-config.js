require.config({
  paths: {
    'angular': '../../bower-pkgs/angular/angular',
    'angular-ui-router': '../../bower-pkgs/angular-ui-router/release/angular-ui-router'
  },
  shim: {
    'angular': {
      exports: 'angular'
    },
    'angular-ui-router': [
      'angular'
    ]
  },
  priority: [
    'angular'
  ]
});

//https://docs.angularjs.org/guide/bootstrap
window.name = 'NG_DEFER_BOOTSTRAP!';
require([
  'angular',
  'main',
  'angular-ui-router',
], function(angular, main) {
  'use strict';

  var $html = angular.element(document.getElementsByTagName('html')[0]);

  //Fire off once the DOM has loaded
  angular.element().ready(function() {
    //Resume angular
    angular.resumeBootstrap([main.name]);
  });
});
