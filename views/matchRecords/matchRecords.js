angular.module('daisyscoutApp.matchRecords', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/event/:eventID/addMatchRecord', {
    templateUrl: 'views/matchRecords/matchRecords.html',
    controller: 'MatchRecordsCtrl'
  });
}])
//Gets data
.controller('MatchRecordsCtrl', ['$scope', '$http', '$routeParams', '$filter', function($scope, $http, $routeParams, $filter) {
	
	function updateMatchRecords() {
        $http.get('PHP/get_matchRecords.php')
        .success(function(data) {
            console.log("SUCCESS - Got MatchRecords!", data);
            $scope.MatchRecords = data;
			
			// Clear the input field.
			$scope.MatchRecordName = '';
        });
    }
	//Allows return to index to work
	console.log($routeParams);
	function getEvent() {
		$http.post('PHP/get_event.php', {eventID: $routeParams.eventID})
        .success(function(data) {
            console.log("SUCCESS - Got Event!", data);
			console.log(typeof data);
            $scope.event = data;
        });
	}
	getEvent();
	
	function getTeams() {
		$http.post('PHP/get_eventTeamList.php', {eventID: $routeParams.eventID})
        .success(function(data) {
            $scope.teams = data;
			$scope.teams = $filter('orderBy')($scope.teams, 'team_num', false);
        });
	}

	getTeams();
	
	function defaultValue(property, value) {
		if (typeof property === 'undefined') {
			return value;
		}
		return property;
	}
	
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
	
	function validateTeamNumber(teamNum) {
		for (var i = 0; i < $scope.teams.length; i++) {
			if (parseInt(teamNum) === $scope.teams[i].team_num) {
				return true;
			}
		}
		return false;
	}
	//This currently is not used - probably wont be - but keep in just in case
	//Redirects to main event page
	function returnToIndex()
	{
		console.log('Returned to Index');
		window.location = "/#/event/"+ $routeParams.eventID;
		location.reload();
	}
	//MAKE SURE THE VALUES HERE AND IN DAISYBASE MATCH	
	function addMatchRecord(
		scout_name,
        team_num,
        alliance_color,
		match_num,
		auton_midline,
		auton_switch,
		auton_scale,
		auton_vault,
		auton_collected,
		alliance_switch,
		enemy_switch,
		scale,
		collected,
		vault,
		force_used,
		force_when,
		boost_used,
		boost_when,
		levitate_used,
		hang,
		park,
		partners_lifted,
		end_score,
		penalty_points,
        comments) {
		//Makes sure team number and match number are valid
		console.log("Team Number: ", team_num);
		if (!validateTeamNumber(team_num)) {
			alert("Team number is not valid");
		}
		else if (checkRequiredField("Team number", team_num) && checkRequiredField("Match number", match_num)) {
			$http.post('PHP/add_matchRecord.php', {
                event_id: $routeParams.eventID,
				scout_name: defaultValue(scout_name, 'REDACTED'),
                team_num: team_num, 
				alliance_color: alliance_color,
                match_num: match_num,
                auton_midline: defaultValue(auton_midline, 'no'),
				auton_switch: defaultValue(auton_switch, 0),
				auton_scale: defaultValue(auton_scale, 0),
				auton_vault: defaultValue(auton_vault, 0),
				auton_collected: defaultValue(auton_collected, 0),
				alliance_switch: defaultValue(alliance_switch, 0),
				enemy_switch: defaultValue(enemy_switch, 0),
				scale: defaultValue(scale, 0),
				collected: defaultValue(collected, 0),
				vault: defaultValue(vault, 0),
				force_used: defaultValue(force_used, 0),
				force_when: defaultValue(force_when, 0),
				boost_used: defaultValue(boost_used, 0),
				boost_when: defaultValue(boost_when, 0),
				levitate_used: defaultValue(levitate_used, 0),
				hang: defaultValue(hang, 'no'),
				park: defaultValue(park, 'no'),
				partners_lifted: defaultValue(partners_lifted, 0),
				end_score: defaultValue(end_score, 0),
				penalty_points: defaultValue(penalty_points, 0),
				comments: defaultValue(comments, '')
			})
            .success(function(data) {
                console.log('MatchRecord added!', data);
				updateMatchRecords();
				alert("Success! Match record added.");
				location.reload();
				
            });
		}
	}
    
	$scope.addMatchRecord = addMatchRecord;
	
	// Load initial data to display
	updateMatchRecords();
	
}]);