angular.module('daisyscoutApp.match', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/event/:eventID/match/:match_num', {
    templateUrl: 'views/matchViewer/matchViewer.html',
    controller: 'MatchViewerCtrl'
  });
}])

.controller('MatchViewerCtrl', ['$scope', '$http', '$routeParams', '$filter', function($scope, $http, $routeParams, $filter) {
	
	$scope.match_num = $routeParams.match_num;
	$scope.eventID =  $routeParams.eventID;
	
	$scope.next_match = Number($scope.match_num) + 1;
	$scope.prev_match = Number($scope.match_num) - 1;
	
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
		
		//used
		this.avgAutonScale;
		this.avgAutonSwitch;
		this.avgScale;
		this.avgAllianceSwitch;
		this.avgEnemySwitch;
		this.midlinePercent;
		this.hangPercent;
	}
	
	Team.prototype.computeAveragesAndTotals = function() {
		
		this.avgAutonScale = 0;
		this.avgAutonSwitch = 0;
		this.avgScale = 0;
		this.avgAllianceSwitch = 0;
		this.avgEnemySwitch = 0;
		this.midlinePercent = 0;
		this.hangPercent = 0;
		
		
		if (this.matchRecords.length > 0) {
			
			console.log(this.matchRecords.length);
			for (var i = 0; i < this.matchRecords.length; i++) 
			{
				this.avgAutonScale += this.matchRecords[i].auton_scale;
				console.log( 'autonscale' + ' ' + i + ' ' + this.matchRecords[i].auton_scale);
				this.avgAutonSwitch += this.matchRecords[i].auton_switch;
				this.avgScale += this.matchRecords[i].scale;
				this.avgAllianceSwitch += this.matchRecords[i].alliance_switch;
				this.avgEnemySwitch += this.matchRecords[i].enemy_switch;
				
				if( this.matchRecords[i].auton_midline == 'yes' ) {
					this.midlinePercent += 1;
				}
				if( this.matchRecords[i].hang == 'yes') {
					this.hangPercent += 1;
				}
			}
			console.log(this.matchRecords.length + 'matches');
			this.avgAutonScale = (this.avgAutonScale/this.matchRecords.length).toFixed(2);
			this.avgAutonSwitch = (this.avgAutonSwitch/this.matchRecords.length).toFixed(2);
			this.avgScale = (this.avgScale/this.matchRecords.length).toFixed(2);
			//this.avgScale = (this.avgScale/this.matchRecords.length).toFixed(2);
			this.avgAllianceSwitch = (this.avgAllianceSwitch/this.matchRecords.length).toFixed(2);
			this.avgEnemySwitch = (this.avgEnemySwitch/this.matchRecords.length).toFixed(2);
			this.midlinePercent = ((this.midlinePercent/this.matchRecords.length)*100).toFixed(2);
			this.hangPercent = ((this.hangPercent/this.matchRecords.length)*100).toFixed(2);
		}
	}
	
	//get data
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
	
	function getEventSchedule() {
		$http.post('PHP/get_eventSchedule.php', {eventID: $routeParams.eventID})
        .success(function(data) {
            console.log("SUCCESS - Got event schedule for event!", data);		
            //$scope.teams = data;
			$scope.matches = [];
			for (var i = 0; i < data.length; i++) {
				if(data[i].match_num == $scope.match_num) {
					$scope.matches.push(new EventSchedule(data[i].match_num, data[i].red_alliance1, data[i].red_alliance2, data[i].red_alliance3,
														data[i].red_score, data[i].blue_score, data[i].blue_alliance1, data[i].blue_alliance2, data[i].blue_alliance3));
				}
			}
			//$scope.order('match_num', false);
        });
	}
	getEventSchedule();
	
	function getTeams() {
		$http.post('PHP/get_eventTeamList.php', {eventID: $routeParams.eventID})
        .success(function(data) {
            console.log("SUCCESS - Got Teams for event!", data);
            //$scope.teams = data;
			$scope.red_alliance = [];
			$scope.blue_alliance = [];
			for (var i = 0; i < data.length; i++) {
				if(data[i].team_num == $scope.matches[0].red_alliance1 || data[i].team_num == $scope.matches[0].red_alliance2 || data[i].team_num == $scope.matches[0].red_alliance3)
				{
					$scope.red_alliance.push(new Team(data[i].team_num, data[i].name));
				}
				else if(data[i].team_num == $scope.matches[0].blue_alliance1 || data[i].team_num == $scope.matches[0].blue_alliance2 || data[i].team_num == $scope.matches[0].blue_alliance3)
				{
					$scope.blue_alliance.push(new Team(data[i].team_num, data[i].name));
				}
			}
			$scope.order('team_num', false);
        });
	}
	getTeams();
	
	function getMatchRecords() {
		$http.post('PHP/get_eventMatchRecords.php', {eventID: $routeParams.eventID})
        .success(function(data) {
            console.log("SUCCESS - Got match records for event!", data);
			
			for (var i = 0; i < $scope.red_alliance.length; i++) {
				for (var j = 0; j < data.length; j++) {
					if (data[j].team_num === $scope.red_alliance[i].team_num) {
						$scope.red_alliance[i].matchRecords.push(data[j]);
					}
				}
				$scope.red_alliance[i].computeAveragesAndTotals();
			}
			
			for (var i = 0; i < $scope.blue_alliance.length; i++) {
				for (var j = 0; j < data.length; j++) {
					if (data[j].team_num === $scope.blue_alliance[i].team_num) {
						$scope.blue_alliance[i].matchRecords.push(data[j]);
					}
				}
				$scope.blue_alliance[i].computeAveragesAndTotals();
			}
        });
	}
	getMatchRecords();
	
	$scope.openTeamViewer = function(team) {
		window.location = "#/event/" + $scope.eventID + "/team/" + team.team_num;
	}
		
	/*function getTeamRecords() {
		$http.post('PHP/get_eventTeamRecords.php', {eventID: $routeParams.eventID, teamID: $routeParams.teamID})
        .success(function(data) {
            console.log("SUCCESS - Got match records for team!", data);
            $scope.matches = data;
			$scope.order('match_num', false);
        });
	}
	getTeamRecords(); 
	^^^^^^removing for now*/
	
	var orderBy = $filter('orderBy');
	$scope.reverse = false;
	$scope.order = function(predicate, reverse) {
		$scope.matches = orderBy($scope.matches, predicate, reverse)};
}]);