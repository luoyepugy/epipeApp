
define(['./module'], function(directives) {
	directives.directive('backButton', ['$window', function($window) {
		return {
			restrict: 'AE',
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                    $window.history.back();
                });
            }    
		};
	}]);
});