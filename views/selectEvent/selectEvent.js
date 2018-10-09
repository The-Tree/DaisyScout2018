angular.module('daisyscoutApp.selectEvent', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/selectEvent', {
    templateUrl: 'views/selectEvent/selectEvent.html',
    controller: 'SelectEventCtrl'
  });
}])

.controller('SelectEventCtrl', ['$scope', '$http', function($scope, $http) {
	
	var getEvents = function() 
	{
		$http.get('PHP/get_events.php')
        .success(function(data) 
		{
            console.log("SUCCESS - Got Events!", data);
            $scope.events = data;
        });
	}
	
	getEvents();
	
}]);