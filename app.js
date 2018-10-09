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
  'daisyscoutApp.match',
  'daisyscoutApp.addEvent',
  'daisyscoutApp.editInterviewRecord',
  'daisyscoutApp.editMatchRecord',
  'daisyscoutApp.editEventMatch',
  'daisyscoutApp.mainEventViewer'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/selectEvent'});
}]);
