
define(['./module'], function(controllers) {
	controllers.controller('purLoginCtrl',
		['$scope','validateService', 'httpService', 'messageService', '$state',
		function($scope, validateService, httpService, messageService, $state){
		$scope.submit = function() {
			$scope.user = {};
			var email_regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			var resultsIsEmpty,
				resultsDatas;
			resultsIsEmpty = validateService.isEmpty('.j-form .j-input');
			if(resultsIsEmpty !== 1) {
				messageService.show(resultsIsEmpty);
				return false;
			}
			if (!email_regexp.test($scope.user.email)) {
					messageService.show('请输入正确的邮箱格式');
			} else {
				resultsDatas = validateService.submitData('.j-form');
				var promise = httpService.getData('./json/login.json', resultsDatas);
			    promise.then(function(data) {
			    	messageService.show('登录成功');
			    	$state.go('purchase.publish');
			    }, function(data) {
			    	messageService.show(data);
			    });
			}
		};
	}]);
});