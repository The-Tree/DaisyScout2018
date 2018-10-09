angular.module('daisyscoutApp.event', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/event/:eventID', {
    templateUrl: 'views/eventViewer/eventViewer.html',
    controller: 'EventViewerCtrl'
  });
}])

.controller('EventViewerCtrl', ['$scope', '$http', '$routeParams', '$filter', function($scope, $http, $routeParams, $filter) {
	
	$scope.eventID = $routeParams.eventID;	

	var EventSchedule = function(matchnum, red1, red2, red3, redscore, bluescore, blue1, blue2, blue3){
		this.match_num = matchnum;
		this.red_alliance1 = red1;
		this.red_alliance2 = red2;
		this.red_alliance3 = red3;
		this.red_score = redscore;
		this.blue_score = bluescore;
		this.blue_alliance1 = blue1;
		this.blue_alliance2 = blue2;
		this.blue_alliance3 = blue3;
	}
	
	var Team = function(number, name) {
		this.team_num = number;
		this.name = name;
		this.matchRecords = [];
	}
	
	Team.prototype.computeAveragesAndTotalsAndStuff = function() {
	
		// Compute total and average number of totes and containers scored. 2015
		// Compute total and average number of boulders scored and defenses crossed 2016
		// Compute total number of gears and rotors scored 2017 
		/*if (this.matchRecords.length > 0) {
			for (var i = 0; i < this.matchRecords.length; i++) 
			{
				//shooting calculations
				this.totalHighScored += this.matchRecords[i].high_balls_scored;
				this.totalGearsScored += this.matchRecords[i].gears_attempted;
				this.totalRotorsScored += this.matchRecords[i].teleop_rotors;
				
				this.autonGears += this.matchRecords[i].auton_gears;
				this.avgDriverRanking += this.matchRecords[i].driver_skill;

				if( this.matchRecords[i].climb == 'yes' ) 
				{
					this.totalClimbed += 1;
				}
			}
			
			//this.avgAutonScored = this.totalAutonScored / this.matchRecords.length;
		}
		
		this.avgHighScored = +(this.totalHighScored/this.matchRecords.length).toFixed(2);
		this.avgGears = +(this.totalGearsScored/this.matchRecords.length).toFixed(2);
		this.avgDriverRanking = +(this.avgDriverRanking/this.matchRecords.length).toFixed(2);*/
	}
	//Gets Data for display
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
            console.log("SUCCESS - Got Teams for event!", data);
            //$scope.teams = data;
			$scope.teams = [];
			for (var i = 0; i < data.length; i++) {
				$scope.teams.push(new Team(data[i].team_num, data[i].name));
			}
			$scope.order('team_num', false);
        });
	}
	getTeams();

	function getMatchRecords() {
		$http.post('PHP/get_eventMatchRecords.php', {eventID: $routeParams.eventID})
        .success(function(data) {
            console.log("SUCCESS - Got match records for event!", data);
			for (var i = 0; i < $scope.teams.length; i++) {
				for (var j = 0; j < data.length; j++) {
					if (data[j].team_num === $scope.teams[i].team_num) {
						$scope.teams[i].matchRecords.push(data[j]);
					}
				}
				$scope.teams[i].computeAveragesAndTotalsAndStuff();
			}
        });
	}
	getMatchRecords();
	
	function getInterviewRecords() {
		$http.post('PHP/get_interviewRecords.php', {eventID: $routeParams.eventID})
		.success(function(data) {
			console.log("SUCCESS - Got interview records for team!", data);
			$scope.interviews = data;
		});
	}
	getInterviewRecords();
	
	function getEventSchedule() {
		$http.post('PHP/get_eventSchedule.php', {eventID: $routeParams.eventID})
        .success(function(data) {
            console.log("SUCCESS - Got event schedule for event!", data);
            //$scope.teams = data;
			$scope.matches = [];
			for (var i = 0; i < data.length; i++) {
				$scope.matches.push(new EventSchedule(data[i].match_num, data[i].red_alliance1, data[i].red_alliance2, data[i].red_alliance3,
														data[i].red_score, data[i].blue_score, data[i].blue_alliance1, data[i].blue_alliance2, data[i].blue_alliance3));
			}
			$scope.order('match_num', false);
        });
	}
	getEventSchedule();
	
	$scope.openTeamViewer = function(team) {
		window.location = "#/event/" + $scope.eventID + "/team/" + team.team_num;
	}
	
	$scope.openMatchViewer = function(match) {
		window.location = "#/event/" + $scope.eventID + "/match/" + match.match_num;
	}
	
	var orderBy = $filter('orderBy');
	$scope.reverse = false;
	$scope.order = function(predicate, reverse) {
		$scope.teams = orderBy($scope.teams, predicate, reverse);
		$scope.interviews = orderBy($scope.interviews, predicate, reverse);
	}
}]);