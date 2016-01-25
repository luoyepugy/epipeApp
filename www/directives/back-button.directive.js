(function() {
    'use strict';

define(['./directives.module'], function(directives) {
	directives.directive('backButton', backButton);

	/* @ngInject */
	function backButton($window) {

		var directive = {
			restrict: 'A',
            link: link
        };
        return directive;

        function link(scope, elem, attrs) {
            elem.bind('click', function () {
                $window.history.back();
            });
		};
	};
});

})();