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
    // console.log('Fetching data...');
    TaskService.fetchAll().then(function(data) {
      $scope.loading = false;
      // console.log('Response: ', data)
      if (data.status === 'OK') {
        $scope.tasks = data.data.tasks.sort(function(a, b) { return a.created_at < b.created_at ? 1 : -1; });
        // console.log('tasks changed: ', $scope.tasks);
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
    var toFormat = "" + $scope.task_input;
    if (toFormat) {
      var formatted = toFormat.charAt(0).toUpperCase() + toFormat.slice(1);
      var toAdd = {
        "title": formatted,
        "status": "PENDING"
      };
      
      // $scope.tasks.push(toAdd);
      TaskService.save(toAdd)
      .then(function(response) {
        $scope.fetchTasks();
      })
      .catch(function(err) {
        console.log('error ', err);
      })
      $scope.task_input = '';
    }
  }

  $scope.handleDelete = function (id) {
    TaskService.delete(id)
    .then(function(response) {
      $scope.fetchTasks();
    })
  }

  $scope.handleComplete = function (task) {
    if (task.status !== 'COMPLETE') {
      var toUpdate = Object.assign(task, { "status": "COMPLETE"});
      TaskService.update(task.id, task)
      .then(function(response) {
        $scope.fetchTasks();
      });
    }
  }

  $scope.handleEnter = function (evt) {
    var code = evt.which || evt.keyCode;
    if (code === 13) {
      $scope.handleAdd();
    }
  }
}]);
