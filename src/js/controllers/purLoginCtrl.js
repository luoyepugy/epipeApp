
define(['./module'], function(controllers) {
	controllers.controller('purLoginCtrl',
		['$scope','validateService', 'httpService', 'messageService', '$state',
		function($scope, validateService, httpService, messageService, $state){
		$scope.submit = function() {
			var valid = $scope.valid;
			var resultsIsEmpty,
				resultsDatas;
			resultsIsEmpty = validateService.isEmpty('.j-form .j-input');
			if(resultsIsEmpty !== 1) {
				messageService.show(resultsIsEmpty);
				return false;
			}
			console.log(valid);
			if(valid) {
				resultsDatas = validateService.submitData('.j-form');
				var promise = httpService.getData('./json/login.json', resultsDatas);
			    promise.then(function(data) {
			    	messageService.show('登录成功');
			    	$state.go('purchase.publish');
			    }, function(data) {
			    	messageService.show(data);
			    });
			}　else {
				return false;
			}
		};
	}]);
});