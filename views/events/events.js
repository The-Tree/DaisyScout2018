angular.module('daisyscoutApp.events', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/events', {
    templateUrl: 'views/events/events.html',
    controller: 'EventsCtrl'
	//controller: 'TeamCtrl'
  });
}])

.controller('EventsCtrl', ['$scope', '$http', function($scope, $http) {
	
	function updateEvents() {
        $http.get('PHP/get_events.php')
        .success(function(data) {
            console.log("SUCCESS - Got Events!", data);
            $scope.events = data;
			
			// Clear the input field.
			$scope.eventName = '';
        });
		
    }
	
	function addEvent(eventName) {
        $http.post('PHP/add_event.php', {name: eventName})
            .success(function(data) {
                console.log('Event added!', data);
                updateEvents();
            });
	}
    
	$scope.addEvent = addEvent;
	
	// Load initial data to display
	updateEvents();
}]);