
define(['./module'], function(controllers) {
	controllers.controller('purUserCtrl',
		['$scope', 'userService', 'validateService', 'messageService', 'httpService',　'$state',
		function($scope, userService, validateService, messageService, httpService, $state){
		$scope.user = userService.user;
		$scope.submit = function() {
			var resultsIsEmpty,
				resultsDatas;
			resultsIsEmpty = validateService.isEmpty('.j-form .j-input');
			if(resultsIsEmpty !== 1) {
				messageService.show(resultsIsEmpty);
				return false;
			}
			resultsDatas = validateService.submitData('.j-form');
			var promise = httpService.getData('./json/login.json', resultsDatas);
		    promise.then(function(data) {
		    	messageService.show('修改成功');
		    	userService.user = resultsDatas;
		    	$state.go('purchase.userInfo');
		    }, function(data) {
		    	messageService.show(data);
		    });
		};
	}]);
});