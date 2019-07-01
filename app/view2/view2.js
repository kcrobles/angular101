'use strict';

angular.module('myApp.task', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/tasks', {
    templateUrl: '/view2/index.html',
    controller: 'TaskItemCtrl'
  });
}])

.controller('TaskItemCtrl', [
  '$scope',
  '$route',
  '$timeout',
  'TaskService',
  function( $scope, $route , $timeout, TaskService) {
  $scope.tasks = [];
  $scope.loading = false;
  $scope.task_input = '';
  $scope.empty = 'There are no tasks.';

  $scope.fetchTasks = function() {
    TaskService.fetchAll().then(function(data) {
      $scope.loading = false;
      if (data.status === 'OK') {
        $scope.tasks = data.data.tasks;
      }
    });
  }

  $scope.init = function() {
    $scope.loading = true;
    $timeout(function() {
      $scope.fetchTasks();
    }, 1000);
  }
  $scope.init();

  $scope.handleAdd = function() {
    var toFormat = $scope.task_input;
    if (toFormat) {
      var formatted = toFormat.charAt(0).toUpperCase() + toFormat.slice(1);
      var toAdd = {
        "title": formatted,
        "status": "PENDING"
      };
      
      TaskService.save(toAdd)
      .then(function(response) {
        //todo
      })
      .catch(function(err) {
        console.log('error ', err);
      })
    }
  }

}]);
