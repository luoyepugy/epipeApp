
define(['./module'], function(directives) {
	directives.directive('phone', ['httpService', function(httpService) {
		return {
			restrict: 'E',
			replace: true,
			template: '<input type="number" class="j-input" name="phone" placeholder="手机号码" ng-model="$parent.user.phone" value="{{$parent.user.phone}}" data-empty="请输入手机号码" />',
            scope: {},
            link: function (scope, elem, attrs) {
                elem.bind('blur', function() {
                    if(scope.$parent.user.phone !== '' && scope.$parent.user.phone != null) {
                        httpService.getDatas('GET', '/user/checkPhone/' + scope.$parent.user.phone)
                        .then(function(data) {
                            return true;
                        }); 
                    }
                });
            }    
		};
	}]);
});