'use strict';

/**
 * @ngdoc overview
 * @name testMonitoringApp
 * @description
 * # testMonitoringApp
 *
 * Main module of the application.
 */

var testMonitoring = angular
  .module('testMonitoringApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ]);


testMonitoring.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        title: 'Plan AN'
      })
      .when('/idRoom=:mainID', {
        templateUrl: 'views/bureau.html',
        controller: 'BureauCtrl',
        controllerAs: 'mainID',
        title: 'Plan salle'
      })
      .when('/idService=:serviceID', {
        templateUrl: 'views/service.html',
        controller: 'ServiceCtrl',
        controllerAs: 'serviceID',
        title: 'Plan service'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).run(['$location', '$rootScope', function($location, $rootScope) {
  $rootScope.$on('$routeChangeSuccess', function (event, current) {

    if (current.hasOwnProperty('$$route')) {

      $rootScope.title = current.$$route.title;
    }
  });
}]);
