
define(['./module'], function(directives) {
	directives.directive('validateEmail', ['messageService', function(messageService) {
		return {
			restrict: 'AE',
			scope: {},
            link: function (scope, elem, attrs) {
                elem.bind('blur', function() {
                    var email_regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    if (!email_regexp.test(attrs.value)) {
						messageService.show('请输入正确的邮箱格式');
						scope.$parent.valid = false;
			        } else {
			        	scope.$parent.valid = true;
			        }
                });
            }    
		};
	}]);
});