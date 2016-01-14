
define(['./module'], function(controllers) {
	controllers.controller('purUserInfoCtrl',
		['$scope', 'httpService','$state',
		function($scope, httpService, $state){
			httpService.get('http://192.168.1.154:8083/user/getProfile')
			.then(function(data) {
				$scope.user = data.data;
			});

			$scope.exit =function() {
				window.localStorage.clear();
            	$state.go('purchase-login');
			}
	}]);
});