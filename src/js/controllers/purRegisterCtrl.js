
define(['./module'], function(controllers) {
	controllers.controller('purRegisterCtrl',
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
			resultsDatas = validateService.submitData('.j-form');
			if(resultsDatas['password'] !== resultsDatas['confirmPwd']) {
				messageService.show('两次密码输入不一致');
			} else if (!email_regexp.test($scope.user.email)) {
					messageService.show('请输入正确的邮箱格式');
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