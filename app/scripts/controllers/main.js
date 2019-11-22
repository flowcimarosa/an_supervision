'use strict';

/**
 * @ngdoc function
 * @name testMonitoringApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testMonitoringApp
 */

var testMonitoring = angular.module('testMonitoringApp');

testMonitoring.filter('unique', function () {

  return function (items, filterOn) {

    if (filterOn === false) {
      return items;
    }

    if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
      var hashCheck = {}, newItems = [];

      var extractValueToCompare = function (item) {
        if (angular.isObject(item) && angular.isString(filterOn)) {
          return item[filterOn];
        } else {
          return item;
        }
      };

      angular.forEach(items, function (item) {
        var valueToCheck, isDuplicate = false;

        for (var i = 0; i < newItems.length; i++) {
          if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
            isDuplicate = true;
            break;
          }
        }
        if (!isDuplicate) {
          newItems.push(item);
        }

      });
      items = newItems;
    }
    return items;
  };
});

testMonitoring.controller('MainCtrl', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {

  /**
   * Appel des données en JSON lier à la requête via l'url
   */

  $http({
    method: 'GET',
    url: 'http://localhost:3000/',
    headers: {'Content-Type': 'application/json'}
  }).then(function (response) {
    $scope.rooms = response.data;
  }, function (err) {
    console.log('Problem with MySQL' + err);
  });

  /**
   * Refresh des données toutes les 10 secondes
   */

  $interval(function () {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/',
      headers: {'Content-Type': 'application/json'}
    }).then(function (response) {
      $scope.rooms = response.data;
    }, function (err) {
      console.log('Problem with MySQL' + err);
    });
  }, 1000);

  /**
   * Appel des données en JSON lier à la requête via l'url
   */

  $http({
    method: 'GET',
    url: 'http://localhost:3000/idRoom/host',
    headers: {'Content-Type': 'application/json'}
  }).then(function (response) {
    $scope.hosts = response.data;
    $(function()
    {
      $(".tooltip-link").tooltip();
    });
  }, function (err) {
    console.log('Problem with MySQL ' + err);
  });

  /**
   * Refresh des données toutes les 10 secondes
   */

  $interval(function () {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/idRoom/host',
      headers: {'Content-Type': 'application/json'}
    }).then(function (response) {
      $scope.hosts = response.data;
      $(function()
      {
        $(".tooltip-link").tooltip();
      });
    }, function (err) {
      console.log('Problem with MySQL ' + err);
    });
  }, 1000);

  /**
   * Appel des données en JSON lier à la requête via l'url
   */

  $http({
    method: 'GET',
    url: 'http://localhost:3000/idMain/service',
    headers: {'Content-Type': 'application/json'}
  }).then(function (response) {
    $scope.services = response.data;
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
      url: 'http://localhost:3000/idMain/service',
      headers: {'Content-Type': 'application/json'}
    }).then(function (response) {
      $scope.services = response.data;
      $(function()
      {
        $(".tooltip-link").tooltip();
      });
    }, function (err) {
      console.log('Problem with MySQL' + err);
    });
  }, 1000);

}]);

testMonitoring.controller('MainIDCtrl', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {

  /**
   * Appel des données en JSON lier à la requête via l'url
   */

  $http({
    method: 'GET',
    url: 'http://localhost:3000/id',
    headers: {'Content-Type': 'application/json'}
  }).then(function (response) {
    var mainID = window.location.href;
    $scope.mainID = mainID.split('=')[1];
    console.log($scope.mainID);
    $scope.rooms = response.data;
    console.log($scope.rooms);
  }, function (err) {
    console.log(err);
  });

  /**
   * Refresh des données toutes les 10 secondes
   */

  $interval(function () {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/id',
      headers: {'Content-Type': 'application/json'}
    }).then(function (response) {
      var mainID = window.location.href;
      $scope.mainID = mainID.split('=')[1];
      console.log($scope.mainID);
      $scope.rooms = response.data;
      console.log($scope.rooms);
    }, function (err) {
      console.log(err);
    });
  }, 1000);

}]);
