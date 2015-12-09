
define(['./module'], function(directives) {
	directives.directive('validateMobile', ['messageService', function(messageService) {
		return {
			restrict: 'AE',
			scope: {},
            link: function (scope, elem, attrs) {
                elem.bind('blur', function () {
                    var phone_regexp = /^((145|147)|(15[^4])|(17[6-8])|((13|18)[0-9]))\d{8}$/;
                    if (!phone_regexp.test(attrs.value)) {
						messageService.show('请输入正确的手机号码格式');
			        } 
                });
            }    
		};
	}]);
});