
define(['./module'], function(controllers) {
	controllers.controller('purEditUserCtrl',
		['$scope', 'httpService',
		function($scope, httpService){
			httpService.getDatas('POST','/user/changeProfile')
			.then(function(data) {
				$scope.user = data.data;
			});
	}]);
});