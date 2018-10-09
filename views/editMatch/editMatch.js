angular.module('daisyscoutApp.editMatchRecord', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/event/:eventID/editMatch/:matchID', {
    templateUrl: 'views/editMatch/editMatch.html',
    controller: 'EditMatchRecordCtrl'
  });
}])
//Gets Match data from database
.controller('EditMatchRecordCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
	function getMatchRecord() {
        $http.post('PHP/get_matchRecord.php', {matchID: $routeParams.matchID})
        .success(function(data) {
            console.log("SUCCESS - Got MatchRecord!", data);
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
	function updateMatchRecord() {
			//Checks to make sure the team is in the list and the match number is in the list
		if (checkRequiredField("Team number", $scope.match.team_num) && checkRequiredField("Match number", $scope.match.match_num)) 
		{	                                                                                                                                                                                                                                                    
			console.log($scope.match);
			$http.post('PHP/edit_matchRecord.php', 
			{
				match_id: $routeParams.matchID,
				event_id: $routeParams.eventID,
				scout_name: defaultValue($scope.match.scout_name, 'REDACTED'),
                team_num: $scope.match.team_num, 
				alliance_color: $scope.match.alliance_color,
                match_num: $scope.match.match_num,
                auton_midline: defaultValue($scope.match.auton_midline, 'no'),
				auton_switch: defaultValue($scope.match.auton_switch, 0),
				auton_scale: defaultValue($scope.match.auton_scale, 0),
				auton_vault: defaultValue($scope.match.auton_vault, 0),
				auton_collected: defaultValue($scope.match.auton_collected, 0),
				alliance_switch: defaultValue($scope.match.alliance_switch, 0),
				enemy_switch: defaultValue($scope.match.enemy_switch, 0),
				scale: defaultValue($scope.match.scale, 0),
				collected: defaultValue($scope.match.collected, 0),
				vault: defaultValue($scope.match.vault, 0),
				force_used: defaultValue($scope.match.force_used, 0),
				force_when: defaultValue($scope.match.force_when, 0),
				boost_used: defaultValue($scope.match.boost_used, 0),
				boost_when: defaultValue($scope.match.boost_when, 0),
				levitate_used: defaultValue($scope.match.levitate_used, 0),
				hang: defaultValue($scope.match.hang, 'no'),
				park: defaultValue($scope.match.park, 'no'),
				partners_lifted: defaultValue($scope.match.partners_lifted, 0),				
				end_score: defaultValue($scope.match.end_score, 0),
				penalty_points: defaultValue($scope.match.penalty_points, 0),
				comments: defaultValue($scope.match.comments, '')
            })
            .success(function(data) {
                console.log('MatchRecord edited!', data);
                //getMatchRecord();
                alert("Success! Updated match record.");
                window.location = "/#/event/"+ $routeParams.eventID + "/team/" + $scope.match.team_num;
                // TODO: redirect to main page / clear values from fields
            });
		}
	}
    
	$scope.updateMatchRecord = updateMatchRecord;	

}]);