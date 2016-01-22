
define(['./account.module'], function(account) {
	account.controller('registerCtrl', registerCtrl);
	
	/* @ngInject */
	function registerCtrl($scope, httpService, $state, messageService, validateService){
		$scope.user = {};
		var phone_regexp = /^((145|147)|(15[^4])|(17[6-8])|((13|18)[0-9]))\d{8}$/;
		$scope.phone = function() {
			if($scope.user.phone !== '' && $scope.user.phone != null) {
                httpService.getDatas('GET', '/user/checkPhone/' + $scope.user.phone)
                .then(function(data) {
                    messageService.show('手机号码已存在');
                }); 
            }
		}
	};
});