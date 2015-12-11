
define(['./module'], function(controllers) {
	controllers.controller('purChangePwdCtrl',
		['$scope','userService',
		function($scope, userService){
			$scope.user　= {};
			$scope.user.oldPwd = userService.user.password;
	}]);
});