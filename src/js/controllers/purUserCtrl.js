
define(['./module'], function(controllers) {
	controllers.controller('purUserCtrl',
		['$scope', 'userService',
		function($scope, userService){
		$scope.user = userService.user;
	}]);
});