
define(['./module'], function(controllers) {
	controllers.controller('purUserInfoCtrl',
		['$scope', 'userService',
		function($scope, userService){
		$scope.user = userService.get();
		// $scope.user = userService.user;	
	}]);
});