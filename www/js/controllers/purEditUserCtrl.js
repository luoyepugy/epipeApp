
define(['./module'], function(controllers) {
	controllers.controller('purEditUserCtrl',
		['$scope', 'httpService',
		function($scope, httpService){
			httpService.post('http://192.168.1.154:8083/user/changeProfile')
			.then(function(data) {
				$scope.user = data.data;
			});
	}]);
});