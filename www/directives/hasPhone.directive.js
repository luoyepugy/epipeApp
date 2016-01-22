
define(['./directives.module'], function(directives) {
	directives.directive('phone', ['httpService', 'messageService', function(httpService, messageService) {
		return {
			restrict: 'E',
			replace: true,
			template: '<input type="number" class="j-input" name="phone" placeholder="手机号码" ng-model="user.phone" value="{{user.phone}}" data-empty="请输入手机号码" />',
            scope: false,
            link: function (scope, elem, attrs) {
                scope.user = {};
                var phone_regexp = /^((145|147)|(15[^4])|(17[6-8])|((13|18)[0-9]))\d{8}$/;
                elem.bind('blur', function() {
                    if(scope.user.phone !== '' && scope.user.phone != null && phone_regexp.test(scope.user.phone) === true) {
                        httpService.getDatas('GET', '/user/checkPhone/' + scope.user.phone)
                        .then(function(data) {
                            messageService.show('手机号码已存在');
                        }); 
                    }
                });
            }    
		};
	}]);
});