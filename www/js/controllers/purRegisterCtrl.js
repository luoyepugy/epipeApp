
define(['./module'], function(controllers) {
	controllers.controller('purRegisterCtrl',
		['$scope', 'httpService','$state', 'messageService', 'validateService',
		function($scope, httpService, $state, messageService, validateService){
			$scope.user = {};
			$scope.phone = function() {
				if($scope.user.phone !== '' && $scope.user.phone != null) {
                    httpService.getDatas('GET', '/user/checkPhone/' + $scope.user.phone)
                    .then(function(data) {
                        messageService.show('手机号码已存在');
                    }); 
                }
			}
	}]);
});