
define(['./module'], function(controllers) {
	controllers.controller('homeCtrl',
		['$scope', 'httpService', '$state','userService', 
		function($scope, httpService, $state, userService){
		// var baseUrl = './json/login.json';
		$scope.login = function() {
			if(userService.getItem('email')) {
				$state.go('purchase.publish');
			} else {
				$state.go('purchase-login');
			}
		};
		
		// $scope.login = function() {
		// 	var promise = httpService.getData(baseUrl);
		//     promise.then(function(data) {
		//     	if(data.login) {
		//     		$state.go('purchase.publish');
		//     	}　else  {
		//     		$state.go('purchase-login');
		//     	}
		//     	// userService.user = data.user;
		//     });
		// };
	}]);
});