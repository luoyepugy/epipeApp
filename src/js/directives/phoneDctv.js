
define(['./module'], function(directives) {
	directives.directive('phone', ['httpService', 'messageService', function(httpService, messageService) {
		return {
			restrict: 'AE',
			replace: true,
			template: '<input type="number" class="j-input" name="phone" placeholder="手机号码" ng-model="user.phone" value="{{user.phone}}" data-empty="请输入手机号" />',
            scope: {},
            link: function (scope, elem, attrs) {
            	var phone = scope.user.phone;
                elem.bind('blur', function () {
                	console.log(phone);
                    httpService.get('http://192.168.1.154:8083/user/checkPhone/', phone)
                    .then(function(data) {
                    	return true;
                    });
                });
            }    
		};
	}]);
});