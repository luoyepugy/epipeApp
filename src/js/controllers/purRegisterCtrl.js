
define(['./module'], function(controllers) {
	controllers.controller('purRegisterCtrl',
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
			if(resultsDatas['password'] !== resultsDatas['confirmPwd']) {
				messageService.show('两次密码输入不一致');
			} else {
				var promise = httpService.getData('./json/login.json', resultsDatas);
			    promise.then(function(data) {
			    	messageService.show('注册成功');
			    	$state.go('purchase-login');
			    }, function(data) {
			    	messageService.show(data);
			    });
			}
		};
	}]);
});