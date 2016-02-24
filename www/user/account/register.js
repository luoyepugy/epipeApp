(function() {
    'use strict';

define(['../user.module'], function(user) {
    user.controller('registerCtrl', registerCtrl);
    
    /* @ngInject */
    function registerCtrl(httpService, messageService){
        var vm = this;

        // 手机号码正则表达式
        var phone_regexp = /^((145|147)|(15[^4])|(17[6-8])|((13|18)[0-9]))\d{8}$/,
        	checkPhoneUrl = '/user/checkPhone/';

        vm.user = {};
        vm.hasPhone = hasPhone;
                   
        // 手机号码是否存在
        function hasPhone() {
            if(vm.user.phone !== '' && vm.user.phone != null) {
                httpService.getDatas('GET', checkPhoneUrl + vm.user.phone)
                .then(function(data) {
                    messageService.show('手机号码已存在');
                }); 
            }
        };
    };
});

})();