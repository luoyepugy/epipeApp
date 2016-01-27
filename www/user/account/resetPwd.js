(function() {
    'use strict';

define(['../user.module'], function(user) {
    user.controller('resetPwdCtrl', resetPwdCtrl);
        
    /* @ngInject */
    function resetPwdCtrl(httpService, validateService, $stateParams, $state){
        var vm = this;
        
        // 重置密码请求服务器地址
        var resetPwdUrl = '/user/resetPassword';
      
        // 路由参数，需要提交表单时使用
        var phone = $stateParams.phone,
            code = $stateParams.code,
            resultsIsEmpty,
            resultsDatas;

        vm.user = {};
        vm.submit = submit;

        // 重新登录
        function submit() {
            resultsIsEmpty = validateService.isEmpty('.j-resetPwd');
            if(!resultsIsEmpty) {
                return;
            }
            
            resultsDatas = validateService.submitData('.j-resetPwd');
            if(resultsDatas) {
                httpService.getDatas('POST',resetPwdUrl, {'phone': phone, 'code': code, 'password': vm.user.password})
                .then(function(data) {
                    $state.go('login');
                });
            }
        };  

    };
});

})();