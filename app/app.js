'use strict';

angular.module('myApp', [
  'ngRoute',
  'myApp.task',
  'myApp.version'
]).
constant('AppConfig', {
  NAME: 'Nvt Angular 101',
  API_URL: 'http://localhost:3500',
  LOCALE: 'es_AR'
}).
config(['$locationProvider', '$routeProvider', 'AppConfig', function($locationProvider, $routeProvider, AppConfig) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({ redirectTo: '/tasks' });
}]);
// config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
//   $urlRouterProvider.otherwise('/view1');
// }]);
