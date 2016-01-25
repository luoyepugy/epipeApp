(function() {
    'use strict';

define(['./user.module'], function(user) {
    user.directive('noedit', noedit);

    /* @ngInject */
    function noedit(messageService) {
        var directive = {
            restrict: 'A',
            link: link
        };
        return directive;

        function link(scope, elem, attrs) {
            elem.bind('click', function () {
                messageService.show('手机号码无法修改');
            });   
        };
    };
});

})();