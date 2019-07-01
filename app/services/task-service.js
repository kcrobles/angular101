'use strict';

angular.module('myApp')
.service('TaskService', [ 'AppConfig', '$http', '$q', function(AppConfig, $http, $q) {
  var service = {
    fetchAll: function() {
      // var deferred = $q.defer();
      return $http.get(AppConfig.API_URL + '/tasks')
      .then(function(response) {
        return response.data;
      });
      // .then(function(response) {
      //   deferred.resolve(response.data)
      // }, function(error) {
      //   deferred.reject(error);
      // });
      // return deferred.promise;
    },
    save: function(task) {
      var payload = {
        "task": task
      };
      var extras = {
        responseType: 'json',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        }
      };
      return $http.post(AppConfig.API_URL + '/tasks', payload, extras)
      .then(function(response){
        return response.data;
      });
    },
    delete: function(id) {
      if (id) {
        return $http.delete(AppConfig.API_URL + '/tasks/' + id)
        .then(function(response) {
          return response.data;
        })
      }
    },
    update: function(id, task) {
      var payload = {
        "task": task
      };
      var extras = {
        responseType: 'json',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        }
      };
      return $http.put(AppConfig.API_URL + '/tasks/' + id, payload, extras)
      .then(function(response){
        return response.data;
      });
    }
  }
  return service;
  }
]);