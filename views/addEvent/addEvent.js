angular.module('daisyscoutApp.addEvent', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addEvent', {
    templateUrl: 'views/addEvent/addEvent.html',
    controller: 'AddEventCtrl'
  });
}])