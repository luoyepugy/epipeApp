(function() {
    'use strict';

define(['./account.module'], function(account) {
    account.controller('findPwdCtrl', findPwdCtrl);
        
    /* @ngInject */
    function findPwdCtrl($scope, httpService, validateService, $state){
        var vm = $scope;
            vm.submit = submit;
            vm.user = {};

        // 找回密码请求服务器地址
        var baseUrl = '/user/checkPhoneToken/';
        
        // 提交表单
           function submit() {
               var resultsIsEmpty,
                   resultsDatas;

               resultsIsEmpty = validateService.isEmpty('.j-findPwd');
            if(!resultsIsEmpty) {
                return;
            }

            resultsDatas = validateService.submitData('.j-findPwd');
            if(resultsDatas) {
                httpService.getDatas('GET',baseUrl + vm.user.phone + '/' + vm.user.code)
                .then(function(data) {
                    $state.go('resetPwd', {'phone': vm.user.phone, 'code': vm.user.code});
                });
            }
           };  
    };
});

})();