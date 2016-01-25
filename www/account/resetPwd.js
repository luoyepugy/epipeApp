(function() {
    'use strict';

define(['./account.module'], function(account) {
    account.controller('resetPwdCtrl',resetPwdCtrl);
        
    /* @ngInject */
    function resetPwdCtrl($scope, httpService, validateService, $stateParams, $state){
        var vm = $scope;
            vm.submit = submit;
            vm.user = {};

        // 重置密码请求服务器地址
        var baseUrl = '/user/resetPassword';
        
        // 路由参数，需要提交表单时使用
        var phone = $stateParams.phone,
            code = $stateParams.code;

        // 重新登录
        function submit() {
               var resultsIsEmpty = validateService.isEmpty('.j-resetPwd');
            if(!resultsIsEmpty) {
                return;
            }
            var resultsDatas = validateService.submitData('.j-resetPwd');
            if(resultsDatas) {
                httpService.getDatas('POST',baseUrl, {'phone': phone, 'code': code, 'password': vm.user.password})
                .then(function(data) {
                    $state.go('login');
                });
            }
        };  

    };
});

})();