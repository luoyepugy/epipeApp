
define(['./module'], function(controllers) {
	controllers.controller('purChangePwdCtrl',
		['$scope', 'userService',
		function($scope, userService){
		$scope.user = {};
		if(userService.getItem('location')) {
			$scope.user.location = userService.getItem('location');
		}
		if(userService.getItem('email')) {
			$scope.user.email = userService.getItem('email');
		}
		
		// var obj = userService.get();
		// for(var i in obj) {
  //           $scope.user[i] = obj[i]; 
  //       }
	}]);
});