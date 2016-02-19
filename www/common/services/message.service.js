(function() {
    'use strict';

define(['../common.module', 'zepto'], function(common, $) {
    common.factory('messageService', messageService);

    /* @ngInject */
    function messageService($rootScope, $timeout) {

        var messages = {
            'show': show
        };
        return messages;
        
        function show(message) {
            $rootScope.tips = message;
            $('.error_tip').addClass('error_tip-show');
            $timeout(function(){
                $('.error_tip').removeClass('error_tip-show');
            }, 2500);
        };
    };
        
});

})();