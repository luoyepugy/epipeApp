(function() {
    'use strict';

define(['../common.module'], function(common) {
    common.directive('backButton', backButton);

    /* @ngInject */
    function backButton($window) {

        var directive = {
            restrict: 'AE',
            link: link
        };
        return directive;

        function link(scope, elem, attrs) {
            elem.bind('click', function () {
                // scope.test = 'a';
                $window.history.back();
            });
        };
    };
});

})();