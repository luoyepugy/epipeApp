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
            $('.error_tip').removeClass('none');
            $timeout(function(){
                $('.error_tip').addClass('none');
            }, 2500);
            // if($('.error_tip').length < 1) {
            //     $('body').append('<p id="messages" class="error_tip">' + tips +'</p>');
            //     $timeout(function(){
            //         $('.error_tip').remove();
            //     }, 2500);
            // }
        };
    };
        
});

})();