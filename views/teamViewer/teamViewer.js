angular.module('daisyscoutApp.team', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/event/:eventID/team/:teamID', {
    templateUrl: 'views/teamViewer/teamViewer.html',
    controller: 'TeamViewerCtrl'
  });
}])

.controller('TeamViewerCtrl', ['$scope', '$http', '$routeParams', '$filter', function($scope, $http, $routeParams, $filter) {
	
	function getEvent() {
		$http.post('PHP/get_event.php', {eventID: $routeParams.eventID})
        .success(function(data) {
            console.log("SUCCESS - Got Event!", data);
			console.log(typeof data);
            $scope.event = data;
        });
	}
	getEvent();	
	
	function getTeam() {
		$http.post('PHP/get_team.php', {teamID: $routeParams.teamID})
        .success(function(data) {
            console.log("SUCCESS - Got Team!", data);
            $scope.team = data;
        });
	}
	getTeam();
		
	function getTeamRecords() {
		$http.post('PHP/get_eventTeamRecords.php', {eventID: $routeParams.eventID, teamID: $routeParams.teamID})
        .success(function(data) {
            console.log("SUCCESS - Got match records for team!", data);
            $scope.matches = data;
			$scope.average = new Average(data);
			$scope.average.averages();
			console.log($scope.matches.length);
			$scope.order('match_num', false);
        });
	}
	getTeamRecords();
	
	
	var Average = function(matchesIn) {
		this.matches = [];
		for(var i = 0; i < matchesIn.length; i++){
			this.matches.push(matchesIn[i]);
		}
		
		
		this.auton_midline;
		this.auton_switch;
		this.auton_scale;
		this.auton_vault;
		this.alliance_switch;
		this.enemy_switch;
		this.scale;
		this.vault;
		this.hang;
		this.park;
		this.partners_lifted;
	}
	
	Average.prototype.averages = function() {
	
		this.auton_midline = 0;
		this.auton_switch = 0;
		this.auton_scale = 0;
		this.auton_vault = 0;
		this.alliance_switch = 0;
		this.enemy_switch = 0;
		this.scale = 0;
		this.vault = 0;
		this.hang = 0;
		this.park = 0;
		this.partners_lifted = 0;
		
		if (this.matches.length > 0) {
			for (var i = 0; i < this.matches.length; i++) 
			{
				//console.log(i + " " + this.matchRecords.scale);
				this.auton_switch += this.matches[i].auton_switch;
				this.auton_scale += this.matches[i].auton_scale;
				this.auton_vault += this.matches[i].auton_vault;
				this.alliance_switch += this.matches[i].alliance_switch;
				this.enemy_switch += this.matches[i].enemy_switch;
				this.scale += this.matches[i].scale;
				this.vault += this.matches[i].vault;
				
				if( this.matches[i].auton_midline == 'yes' ) {
					this.auton_midline += 1;
				}
				if( this.matches[i].hang == 'yes') {
					this.hang += 1;
				}
				if( this.matches[i].park == 'yes') {
					this.park += 1;
				}
				if( this.matches[i].partners_lifted === '1' ){
					this.partners_lifted += 1;
				}
				else if( this.matches[i].partners_lifted === '2' ){
					this.partners_lifted += 2;
				}
			}
			this.auton_midline = ((this.auton_midline/this.matches.length)*100).toFixed(2);
			this.auton_switch = (this.auton_switch/this.matches.length).toFixed(2);
			this.auton_scale = (this.auton_scale/this.matches.length).toFixed(2);
			this.auton_vault = (this.auton_vault/this.matches.length).toFixed(2);
			this.alliance_switch = (this.alliance_switch/this.matches.length).toFixed(2);
			this.enemy_switch = (this.enemy_switch/this.matches.length).toFixed(2);
			this.scale = (this.scale/this.matches.length).toFixed(2);
			this.vault = (this.vault/this.matches.length).toFixed(2);
			this.hang = ((this.hang/this.matches.length)*100).toFixed(2);
			this.park = ((this.park/this.matches.length)*100).toFixed(2);
			this.partners_lifted = (this.partners_lifted/this.matches.length).toFixed(2);
		}
	}
	
	/*function getInterviewRecords() {
		$http.post('PHP/get_eventInterviewRecord.php', {eventID: $routeParams.eventID, teamID: $routeParams.teamID})
        .success(function(data) {
            console.log("SUCCESS - Got interview records for team!", data);
            $scope.interview = data;
        });
	}
	getInterviewRecords();*/
	
	function getPrevNextTeam() {
		$http.post('PHP/get_eventTeamList.php', {eventID: $routeParams.eventID})
        .success(function(data) {
            console.log("SUCCESS - Got Teams for event!");
			for (var i = 0; i < data.length; i++) {
				if(Number(data[i].team_num) === Number($routeParams.teamID)) {
					console.log(i + " " + data[i]);
					$scope.next_team = data[i-1].team_num;
					$scope.prev_team = data[i+1].team_num;
				}
			}
        });
	}
	getPrevNextTeam();
	
	
	
	var orderBy = $filter('orderBy');
	$scope.reverse = false;
	$scope.order = function(predicate, reverse) {
		$scope.matches = orderBy($scope.matches, predicate, reverse)};
}]);