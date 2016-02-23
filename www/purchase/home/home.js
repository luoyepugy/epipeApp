(function() {
    'use strict';

define(['../purchase.module'], function(purchase) {
    purchase.controller('homeCtrl', homeCtrl);
    
    /* @ngInject */
    function homeCtrl($scope, $state, $http, config){
        var vm = this;
            vm.welcome = welcome;

        // 立即体验按钮
        function　welcome() {
            // 主机地址是否发生变化
            // $http.get('http://www.epipe.cn/download/appConfig.js')
            // .success(function(data) {
            //     if(data['api_host'] != null && data['api_host'] != '') {
            //         config.host = data['api_host']; 
            //     }
            //     hasToken();
            // })
            // .error(function(data) {
                hasToken();
            // });
        };

        // 判断localStorage里是否存在token
        function hasToken() {
            if(window.localStorage.getItem('token') != null && window.localStorage.getItem('token') !== '') {
                $state.go('purchase.publish');    
            } else {
                $state.go('login');
            }
        };
    };
});

})();
