(function() {
    'use strict';

define(['./account.module'], function(account) {
    account.controller('findPwdCtrl', findPwdCtrl);
        
    /* @ngInject */
    function findPwdCtrl(httpService, validateService, $state){
        var vm = this;
    
        // 找回密码请求服务器地址
        var findPwdUrl = '/user/checkPhoneToken/',
            resultsIsEmpty,
            resultsDatas;

        vm.user = {};
        vm.submit = submit;
            
        // 提交表单
        function submit() {
            resultsIsEmpty = validateService.isEmpty('.j-findPwd');
            if(!resultsIsEmpty) {
                return;
            }

            resultsDatas = validateService.submitData('.j-findPwd');
            if(resultsDatas) {
                httpService.getDatas('GET',findPwdUrl + vm.user.phone + '/' + vm.user.code)
                .then(function(data) {
                    $state.go('resetPwd', {'phone': vm.user.phone, 'code': vm.user.code});
                });
            }
        };  
    };
});

})();