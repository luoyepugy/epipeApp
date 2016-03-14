
define(['./module'], function(directives) {
	directives.directive('vcode', ['httpService', 'messageService', function(httpService, messageService) {
		return {
			restrict: 'AE',
			replace: true,
			template: '<button class="mr10 button button-energized">发送验证码</button>',
            scope: {},
            link: function (scope, elem, attrs) {
            	var phone = scope.$parent.user.phone;
                elem.bind('click', function () {
                    httpService.post('http://192.168.1.154:8083/user/sendPhoneToken', {'phone': phone})
                    .then(function(data) {
                    	return true;
                    });
                });
            }    
		};
	}]);
});