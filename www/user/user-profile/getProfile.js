(function() {
    'use strict';

define(['../user.module'], function(user) {
    user.controller('getProfileCtrl', getProfileCtrl);

    /* @ngInject */
    function getProfileCtrl(httpService, $state, config){
        var vm = this;

        // 头像保存地址
        var avatarUrl = config.host + '/public/avatar/';

        vm.exitAccount = exitAccount;
        vm.user = {};

        // 首次加载
        load();    

        function load() {
            httpService.getDatas('GET','/user/getProfile')
            .then(function(data) {
                var datas = data.data;
                vm.user = datas;
                // 无头像时使用默认头像
                if(datas.avatar === '' || datas.avatar == null) {
                    vm.user.avatar = './images/default_avatar.png';
                } else {
                    vm.user.avatar = avatarUrl + datas.avatar;
                }
            });
        };
        
        // 退出当前账号    
        function exitAccount() {
            window.localStorage.clear();
            $state.go('login');
        };

    };
});

})();