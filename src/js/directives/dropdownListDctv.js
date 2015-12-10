
define(['./module'], function(directives) {
	directives.directive('dropDownList', ['httpService', function(httpService) {
		return {
			restrict: 'AE',
            link: function (scope, elem, attrs) {
                elem.bind('blur', function () {
                	console.log('keydown');
                		
                });
            }    
		};
	}]);
});