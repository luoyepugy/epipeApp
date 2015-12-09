
define(['./module'], function(controllers) {
	controllers.controller('purPublishCtrl',
		['$scope','validateService', 'httpService', 'messageService', '$state',
		function($scope, validateService, httpService, messageService, $state){
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
		    	messageService.show('发布采购成功');
		    	$state.go('purchase.list');
		    }, function(data) {
		    	messageService.show(data);
		    });
		};
	}]);
});