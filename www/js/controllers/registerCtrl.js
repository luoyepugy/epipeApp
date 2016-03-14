
define(['./module'], function(controllers) {
	controllers.controller('registerCtrl', function($scope) {
		$scope.user = {};
		// 手机号码正则表达式
        var phone_regexp = /^((145|147)|(15[^4])|(17[6-8])|((13|18)[0-9]))\d{8}$/;
        
        // 手机号码是否存在
        function hasPhone() {
            if(vm.user.phone !== '' && vm.user.phone != null) {
                httpService.getDatas('GET', '/user/checkPhone/' + vm.user.phone)
                .then(function(data) {
                    messageService.show('手机号码已存在');
                }); 
            }
        };
	});
});