angular.module('daisyscoutApp.interviewRecords', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/event/:eventID/addInterview', {
    templateUrl: 'views/interviewRecords/interviewRecords.html',
    controller: 'InterviewRecordsCtrl'
  });
}])
//Gets Data
.controller('InterviewRecordsCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
	function updateInterviewRecords() {
        $http.get('PHP/get_interviewRecords.php')
        .success(function(data) {
            console.log("SUCCESS - Got InterviewRecords!", data);
            $scope.InterviewRecords = data;
			console.log("EVENT ID: " + $routeParams.eventID);
			// Clear the input field.
			$scope.InterviewRecordName = '';
        });
    }
	
		console.log($routeParams);
	//This makes the return to index button work
	function getEvent() {
		$http.post('PHP/get_event.php', {eventID: $routeParams.eventID})
        .success(function(data) {
            console.log("SUCCESS - Got Event!", data);
			console.log(typeof data);
            $scope.event = data;
        });
	}
	getEvent();
	
	function defaultValue(property, value) {
		if (typeof property === 'undefined') {
			return value;
		}
		return property;
	}
	
	function defined(value) {
		return typeof value !== 'undefined';
	}
	
	//Checks to see if there is a name
	function checkRequiredField(name, field) {	
		if (!defined(field)) {
			alert(name + " is a required field.");
			return false;
		}
		return true;
	}
	//MAKE SURE THE VALUES HERE AND IN DAISYBASE MATCH
	function addInterviewRecord(scout_name, team_num, base_width, base_length, base_height, drive_motors, wheel_num, drive_system, wheel_type, speed, shooter_type, capacity, 
	ball_rof, primary_goal, gear_ability, gear_loading, scale_ability, auton_mobility, auton_autoload, auton_ball, auton_num_gears, auton_description ) {
			//Checks if the team is within the list of teams
		if (checkRequiredField("Team #", team_num) ) 
		{	
			console.log( 'TEST: value of $routeParams.eventID is: ' + $routeParams.eventID ); //test
			
			$http.post('PHP/add_interviewRecord.php', 
			{
				event_id: $routeParams.eventID,				
				scout_name: defaultValue(scout_name, "REDACTED"),
				team_num: team_num,
                base_width: defaultValue(base_width, 0),
				base_length: defaultValue(base_length, 0), 
				base_height: defaultValue(base_height, 0),
				drive_motors: defaultValue(drive_motors, "UNKNOWN"),
				wheel_num: defaultValue(wheel_num, 0),
				drive_system: defaultValue(drive_system, "UNKNOWN"),
				wheel_type: defaultValue(wheel_type, "UNKNOWN"),
				speed: defaultValue(speed, 0),
				shooter_type: defaultValue(shooter_type, "UNKNOWN"),
				capacity: defaultValue(capacity, 0),
				ball_rof: defaultValue(ball_rof, 0),
				primary_goal: defaultValue(primary_goal, "UNKNOWN"),
				gear_ability: defaultValue(gear_ability, "UNKNOWN"),
				gear_loading: defaultValue(gear_loading, "UNKNOWN"),
				scale_ability: defaultValue(scale_ability, "UNKNOWN"),
				auton_mobility: defaultValue(auton_mobility, "UNKNOWN"),
				auton_autoload: defaultValue(auton_autoload, "UNKNOWN"),
				auton_ball: defaultValue(auton_ball, "UNKNOWN"),
				auton_num_gears: defaultValue(auton_num_gears, 0),
				auton_description: defaultValue(auton_description, ""),
				})
					.success(function(data) {
						console.log('InterviewRecord added!', data);
						updateInterviewRecords();
						alert("Success! Added interview record to database");
						location.reload();

						window.location = "/#/event/"+ $routeParams.eventID;
						// TODO: redirect to main page / clear values from fields
						//NOT TODO: Redirect 
					});
		}
	}
    
	$scope.addInterviewRecord = addInterviewRecord;
	
	// Load initial data to display
	updateInterviewRecords();	

}]);