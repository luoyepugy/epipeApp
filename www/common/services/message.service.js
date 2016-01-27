(function() {
    'use strict';

define(['../common.module', 'zepto'], function(common, $) {
    common.factory('messageService', messageService);

    /* @ngInject */
    function messageService($rootScope, $timeout) {

        return {
            'show': show
        };
        
        function show(tips) {
            if($('.error_tip').length < 1) {
                $('body').append('<p class="error_tip">' + tips +'</p>');
                $timeout(function(){
                    $('.error_tip').remove();
                }, 2500);
            }
        };
    };
        
});

})();