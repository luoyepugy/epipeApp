
define(['./module'], function(controllers) {
	controllers.controller('purEditUserCtrl',
		['$scope', 'userService',
		function($scope, userService){
		$scope.user = {};
		var obj = userService.get();
		for(var i in obj) {
            $scope.user[i] = obj[i]; 
        }
	}]);
});