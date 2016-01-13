
define(['./module'], function(directives) {
	directives.directive('phone', ['httpService', function(httpService) {
		return {
			restrict: 'E',
			replace: true,
			template: '<input type="number" class="j-input" name="phone" placeholder="手机号码" ng-model="user.phone" value="{{user.phone}}" data-empty="请输入手机号码" />',
            scope: {},
            link: function (scope, elem, attrs) {
                scope.user = {};
                elem.bind('blur', function() {
                    httpService.get('http://192.168.1.154:8083/user/checkPhone/', {'phone': scope.user.phone})
                    .then(function(data) {
                    	return true;
                    });
                });
            }    
		};
	}]);
});