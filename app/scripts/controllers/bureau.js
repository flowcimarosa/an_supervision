'use strict';

/**
 * @ngdoc function
 * @name testMonitoringApp.controller:BureauCtrl
 * @description
 * # BureauCtrl
 * Controller of the testMonitoringApp
 */

var testMonitoring = angular.module('testMonitoringApp');

testMonitoring.controller('BureauCtrl', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {

  /**
   * Appel des données en JSON lier à la requête via l'url
   */

  $http({
    method: 'GET',
    url: 'http://localhost:3000/idRoom',
    headers: {'Content-Type': 'application/json'}
  }).then(function (response) {
    var roomID = window.location.href;
    $scope.roomID = roomID.split('=')[1];
    var host = response.data;
    $scope.hosts = host;
  }, function (err) {
    console.log('Problem with MySQL: '+err);
  });

  /**
   * Refresh des données toutes les 10 secondes
   */

  $interval(function () {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/idRoom',
      headers: {'Content-Type': 'application/json'}
    }).then(function (response) {
      var roomID = window.location.href;
      $scope.roomID = roomID.split('=')[1];
      var host = response.data;
      $scope.hosts = host;
    }, function (err) {
      console.log('Problem with MySQL: '+err);
    });
  }, 1000);

  /**
   * Appel des données en JSON lier à la requête via l'url
   */

  $http({
    method: 'GET',
     url: 'http://localhost:3000/idRoom/service',
    headers: {'Content-Type': 'application/json'}
  }).then(function (response) {
    var service = response.data;
    $scope.services = service;
    $(function()
    {
      $(".tooltip-link").tooltip();
    });
  }, function (err) {
    console.log('Problem with MySQL' + err);
  });

  /**
   * Refresh des données toutes les 10 secondes
   */

  $interval(function () {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/idRoom/service',
      headers: {'Content-Type': 'application/json'}
    }).then(function (response) {
      var service = response.data;
      $scope.services = service;
      $(function()
      {
        $(".tooltip-link").tooltip();
      });
    }, function (err) {
      console.log('Problem with MySQL' + err);
    });
  }, 1000)
}]);

