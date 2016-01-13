
define(['./module'], function(controllers) {
	controllers.controller('purUserInfoCtrl',
		['$scope', 'httpService',
		function($scope, httpService){
			httpService.get('http://192.168.1.154:8083/user/getProfile')
			.then(function(data) {
				$scope.user = data.data;
			});
	}]);
});