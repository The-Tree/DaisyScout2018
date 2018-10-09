angular.module('daisyscoutApp.removeMatch', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/event/:eventID/removeMatch/:matchID', {
    templateUrl: 'views/removeMatch/removeMatch.html',
    controller: 'RemoveMatchRecordCtrl'
  });
}])

.controller('RemoveMatchRecordCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
	function getMatchRecord() {
        $http.post('PHP/get_matchRecord.php', {matchID: $routeParams.matchID})
        .success(function(data) {
            console.log("SUCCESS - Got MatchRecord!", data);
            $scope.match = data;
        });
    }
	getMatchRecord();
	
	function defined(value) {
		return typeof value !== 'undefined';
	}
	
		
	function checkRequiredField(name, field) {	
		if (!defined(field)) {
			alert(name + " is a required field.");
			return false;
		}
		return true;
	}
	
	function removeLine(team_num, match_num, event_num) {
		if (checkRequiredField("Team number", $scope.match.team_num) && checkRequiredField("Match number", $scope.match.match_num)) 
		{
			$http.post('PHP/remove_matchRecord.php')
				.success(function(data) {
					console.log('MatchRecord removed!', data);
					alert("Success! Match record deleted.");
					window.location = "/#/event/"+ $routeParams.eventID + "/team/" + $scope.match.team_num;
					// TODO: redirect to main page / clear values from fields
					//NOT TO DO: redirect to main page
				});
		}
	}

}]);