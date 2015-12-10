
define(['./module'], function(controllers) {
	controllers.controller('purLoginCtrl',
		['$scope','validateService', 'httpService', 'messageService', '$state', 'userService',
		function($scope, validateService, httpService, messageService, $state, userService){
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
		    	messageService.show('登录成功');
		    	userService.user = resultsDatas;
		    	$state.go('purchase.publish');
		    }, function(data) {
		    	messageService.show(data);
		    });
		};
	}]);
});