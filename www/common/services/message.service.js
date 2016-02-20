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
        
        function show(tips) {           
            if($('.error_tip').length < 1) {
                $('body').append('<p class="error_tip">' + tips +'</p>');
                $rootScope.messages = tips;
                $timeout(function(){
                    $('.error_tip').remove();
                }, 2500);
            }
        };
    };
        
});

})();