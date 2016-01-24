'use strict';

var v1 = angular.module('myApp.view1', ['ngRoute']);

v1.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
      controller: 'View1Ctrl',
      controller2: 'View1Controller'
  });
}]);

v1.controller('View1Ctrl', [function() {

}]);

v1.controller('View1Controller', function($scope, ImageService) {
    console.log("Controller scope", ImageService.imagelist[0]);

    console.log("time1");
});