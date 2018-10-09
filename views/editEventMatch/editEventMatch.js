angular.module('daisyscoutApp.editEventMatch', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/event/:eventID/editEventMatch/:matchID', {
    templateUrl: 'views/editEventMatch/editEventMatch.html',
    controller: 'EditEventMatchCtrl'
  });
}])
//Gets Match data from database
.controller('EditEventMatchCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
	function getMatchRecord() {
        $http.post('PHP/get_eventMatch.php', {matchID: $routeParams.matchID, eventID: $routeParams.eventID})
        .success(function(data) {
            console.log("SUCCESS - Got event match!", data);
            $scope.match = data;
        });
    }
	getMatchRecord();
	
	function defaultValue(property, value) {
		if (typeof property === 'undefined') {
			return value;
		}
		return property;
	}
	
	function defined(value) {
		return typeof value !== 'undefined';
	}
	
	//Checks to make sure there is a name
	function checkRequiredField(name, field) {	
		if (!defined(field)) {
			alert(name + " is a required field.");
			return false;
		}
		return true;
	}
	//MAKE SURE THE VALUES HERE AND IN DAISYBASE MATCH
	function updateEventMatch() {
		//Checks to make sure the team is in the list and the match number is in the list                                                                                                                                                                                                                                                    
		console.log($scope.match);
		$http.post('PHP/edit_eventMatch.php', 
		{
			event_schedule_id: $scope.match.event_schedule_id,
			event_id: $routeParams.eventID,
			match_num: $routeParams.matchID,
			red_alliance1: defaultValue($scope.match.red_alliance1, '0'),
			red_alliance2: defaultValue($scope.match.red_alliance2, '0'), 
			red_alliance3: defaultValue($scope.match.red_alliance3, '0'),
			red_score: defaultValue($scope.match.red_score, 0),
			blue_score: defaultValue($scope.match.blue_score, 0),
			blue_alliance1: defaultValue($scope.match.blue_alliance1, '0'),
			blue_alliance2: defaultValue($scope.match.blue_alliance2, '0'),
			blue_alliance3: defaultValue($scope.match.blue_alliance3, '0')
		})
		.success(function(data) {
			console.log('eventmatch edited!', data);
			//getMatchRecord();
			alert("Success! Updated event match.");
			window.location = "/#/event/"+ $routeParams.eventID + "/match/" + $scope.match.match_num;
			// TODO: redirect to main page / clear values from fields
		});
	}
    
	$scope.updateEventMatch = updateEventMatch;	

}]);