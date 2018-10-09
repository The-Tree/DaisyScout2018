'use strict';

// Declare app level module which depends on views, and components
angular.module('daisyscoutApp', [
  'ngRoute',
  'daisyscoutApp.events',
  'daisyscoutApp.matchRecords',
  'daisyscoutApp.interviewRecords',
  'daisyscoutApp.event',
  'daisyscoutApp.selectEvent',
  'daisyscoutApp.team',
  'daisyscoutApp.editInterviewRecord',
  'daisyscoutApp.editMatchRecord'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/selectEvent'});
}]);
