angular.module('daisyscoutApp.mainEventViewer', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/event/:eventID/teams', {
    templateUrl: 'views/mainEventViewer/mainEventViewer.html',
    controller: 'mainEventViewerCtrl'
  });
}])

.controller('mainEventViewerCtrl', ['$scope', '$http', '$routeParams', '$filter', function($scope, $http, $routeParams, $filter) {
	
	$scope.eventID = $routeParams.eventID;	
	//Initialization of Team 
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
		this.avgVault;
		this.midlinePercent;
		this.hangPercent;
	}
	
	Team.prototype.computeAveragesAndTotalsAndStuff = function() {
	/*
		// Compute total and average number of totes and containers scored. 2015
		// Compute total and average number of boulders scored and defenses crossed 2016
		// Compute total number of gears and rotors scored 2017 
		if (this.matchRecords.length > 0) {
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
		this.avgDriverRanking = +(this.avgDriverRanking/this.matchRecords.length).toFixed(2);
		
		*/
		
		this.avgAutonScale = 0;
		this.avgAutonSwitch = 0;
		this.avgScale = 0;
		this.avgAllianceSwitch = 0;
		this.avgEnemySwitch = 0;
		this.avgVault = 0;
		this.midlinePercent = 0;
		this.hangPercent = 0;
		
		
		if (this.matchRecords.length > 0) {
			for (var i = 0; i < this.matchRecords.length; i++) 
			{
				//console.log(i + " " + this.matchRecords.scale);
				this.avgAutonScale += this.matchRecords[i].auton_scale;
				this.avgAutonSwitch += this.matchRecords[i].auton_switch;
				this.avgScale += this.matchRecords[i].scale;				
				this.avgAllianceSwitch += this.matchRecords[i].alliance_switch;
				this.avgEnemySwitch += this.matchRecords[i].enemy_switch;
				this.avgVault += this.matchRecords[i].vault;
				
				if( this.matchRecords[i].auton_midline == 'yes' ) {
					this.midlinePercent += 1;
				}
				if( this.matchRecords[i].hang == 'yes') {
					this.hangPercent += 1;
				}
			}
			//console.log(this.team_num + " " + this.avgScale);
			//console.log(this.matchRecords.length + 'matches');
			this.avgAutonScale = (this.avgAutonScale/this.matchRecords.length).toFixed(2);
			this.avgAutonSwitch = (this.avgAutonSwitch/this.matchRecords.length).toFixed(2);
			this.avgScale = (this.avgScale/this.matchRecords.length).toFixed(2);
			this.avgAllianceSwitch = (this.avgAllianceSwitch/this.matchRecords.length).toFixed(2);
			this.avgEnemySwitch = (this.avgEnemySwitch/this.matchRecords.length).toFixed(2);
			this.avgVault = (this.avgVault/this.matchRecords.length).toFixed(2);
			this.midlinePercent = ((this.midlinePercent/this.matchRecords.length)*100).toFixed(2);
			this.hangPercent = ((this.hangPercent/this.matchRecords.length)*100).toFixed(2);
		}
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

	/*function getTeamRecords() {
		for(var i = 0; i < $scope.teams.length; i++){
			$http.post('PHP/get_eventTeamRecords.php', {eventID: $routeParams.eventID, teamID: $scope.teams.team_num})
			.success(function(data) {
				console.log("SUCCESS - Got match records for team!", data);
				$scope.teams[i].matchRecords = data;
				//$scope.order('match_num', false);
				
				$scope.teams[i].computeAveragesAndTotalsAndStuff();
			});
		}
	}
	getTeamRecords();*/
	
	function getMatchRecords() {
		$http.post('PHP/get_eventMatchRecords.php', {eventID: $routeParams.eventID})
        .success(function(data) {
            console.log("SUCCESS - Got match records for event!", data);
			for (var i = 0; i < $scope.teams.length; i++) {
				for (var j = 0; j < data.length; j++) {
					if (data[j].team_num.valueOf() === $scope.teams[i].team_num.valueOf()) {
						$scope.teams[i].matchRecords.push(data[j]);
						//console.log(data[j]);
						//console.log(data[j].scale + " " + data[j].match_id);
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
	
	$scope.openTeamViewer = function(team) {
		window.location = "#/event/" + $scope.eventID + "/team/" + team.team_num;
	}
	
	var orderBy = $filter('orderBy');
	$scope.reverse = false;
	$scope.order = function(predicate, reverse) {
		$scope.teams = orderBy($scope.teams, predicate, reverse);
		$scope.interviews = orderBy($scope.interviews, predicate, reverse);
	}
}]);