'use strict';

/**
 * @ngdoc function
 * @name testMonitoringApp.controller:ServiceCtrl
 * @description
 * # ServiceCtrl
 * Controller of the testMonitoringApp
 */

var testMonitoring = angular.module('testMonitoringApp');

testMonitoring.controller('ServiceCtrl', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {

  /**
   * Appel des données en JSON lier à la requête via l'url
   */

  $http({
    method: 'GET',
    url: 'http://localhost:3000/service',
    headers: {'Content-Type': 'application/json'}
  }).then(function (response) {
    var serviceID = window.location.href;
    $scope.serviceID = serviceID.split('=')[1];
    $scope.services = response.data;
  }, function (err) {
    console.log(err);
  });

  /**
   * Refresh des données toutes les 10 secondes
   */

  $interval(function () {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/service',
      headers: {'Content-Type': 'application/json'}
    }).then(function (response) {
      var serviceID = window.location.href;
      $scope.serviceID = serviceID.split('=')[1];
      $scope.services = response.data;
    }, function (err) {
      console.log(err);
    });
  }, 1000);
}]);
