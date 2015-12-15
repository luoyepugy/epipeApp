
define(['./module'], function(controllers) {
	controllers.controller('purEditUserCtrl',
		['$scope', 'userService',
		function($scope, userService){
		$scope.user = {};
		for(var i in userService.user) {
			$scope.user[i] = userService.user[i];
		}
	}]);
});