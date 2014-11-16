define(['angular'], function(angular) {
  'use strict'

  return angular.module('fedPackage', [
    'ui.router'
  ])

  // hack to disable auto scrolling on hashchange because we're using ui-router to manage states, instead of the core angular router which cannot handle states
  // discussion on this here: https://github.com/angular-ui/ui-router/issues/110
  .value('$anchorScroll', angular.noop)

  //UI Router http://angular-ui.github.io/ui-router/site/#/api/ui.router
  //Unlike ngRoute that uses URL rotes, UI router uses states.
  //Sample app http://angular-ui.github.io/ui-router/sample/#/
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('main', {
          //Abstract state can have child states but can not get activated itself
          //https://github.com/angular-ui/ui-router/wiki/Nested-States-%26-Nested-Views#abstract-states
          abstract: true,
          url: '/',
          templateUrl: 'views/mainView.html'
        }).state('main.home', {
          url: '',
          templateUrl: 'views/homeView.html'
        }).state('main.test', {
          url: 'test',
          templateUrl: 'views/testView.html'
        });
    }
  ]);
});
