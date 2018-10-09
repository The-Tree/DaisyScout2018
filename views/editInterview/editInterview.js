angular.module('daisyscoutApp.editInterviewRecord', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/event/:eventID/editInterview/:interviewID', {
    templateUrl: 'views/editInterview/editInterview.html',
    controller: 'EditInterviewRecordCtrl'
  });
}])
//Gets interview data
.controller('EditInterviewRecordCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
	function getInterviewRecord() {
        $http.post('PHP/get_interviewRecord.php', {interviewID: $routeParams.interviewID})
        .success(function(data) {
            console.log("SUCCESS - Got InterviewRecord!", data);
            $scope.interview = data;
        });
    }
	getInterviewRecord();
	
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
	function updateInterviewRecord() {
		//Checks if the team is within the list of teams
		if (checkRequiredField("Team #", $scope.interview.team_num) ) 
		{	
			console.log($scope.interview);
			$http.post('PHP/edit_interviewRecord.php', 
			{
				interview_id: $routeParams.interviewID,
				event_id: $routeParams.eventID,
				scout_name: defaultValue($scope.interview.scout_name, "REDACTED"),
				team_num: $scope.interview.team_num,
				base_width: defaultValue($scope.interview.base_width, 0), 
				base_length: defaultValue($scope.interview.base_length, 0),
				base_height: defaultValue($scope.interview.base_height, 0),
				drive_motors: defaultValue($scope.interview.drive_motors, "UNKNOWN"),
				wheel_num: defaultValue($scope.interview.wheel_num, 0),
				drive_system: defaultValue($scope.interview.drive_system, "UNKNOWN"),
				wheel_type: defaultValue($scope.interview.wheel_type, "UNKNOWN"),
				speed: defaultValue($scope.interview.speed, 0),
				shooter_type: defaultValue($scope.interview.shooter_type, "UNKNOWN"),
				capacity: defaultValue($scope.interview.capacity, 0),
				ball_rof: defaultValue($scope.interview.ball_rof, 0),
				primary_goal: defaultValue($scope.interview.primary_goal, "UNKNOWN"),
				gear_ability: defaultValue($scope.interview.gear_ability, "UNKNOWN"),
				gear_loading: defaultValue($scope.interview.gear_loading, "UNKNOWN"),
				scale_ability: defaultValue($scope.interview.scale_ability, "UNKNOWN"),
				auton_mobility: defaultValue($scope.interview.auton_mobility, "UNKNOWN"),
				auton_autoload: defaultValue($scope.interview.auton_autoload, "UNKNOWN"),
				auton_ball: defaultValue($scope.interview.auton_ball, "UNKNOWN"),
				auton_num_gears: defaultValue($scope.interview.auton_num_gears, 0),
				auton_description: defaultValue($scope.interview.auton_description, ""),
            })
            .success(function(data) {
                console.log('InterviewRecord edited!', data);
                getInterviewRecord();
                alert("Success! Updated interview record.");
                window.location = "/#/event/"+ $routeParams.eventID + "/team/" + $scope.interview.team_num;
                // TODO: redirect to main page / clear values from fields
				//NOT TO DO: redirect to main page

            });
		}
	}
    
	$scope.updateInterviewRecord = updateInterviewRecord;	

}]);