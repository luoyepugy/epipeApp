(function() {
    'use strict';

define(['../purchase.module'], function(purchase) {
    purchase.controller('homeCtrl', homeCtrl);
    
    /* @ngInject */
    function homeCtrl($scope, $state, $http, config){
        var vm = $scope;
            vm.welcome = welcome;

        // 立即体验按钮
        function　welcome() {
            // 主机地址是否发生变化
            // $http.get('http://www.epipe.cn/download/appConfig.js')
            // .success(function(data) {
            //     config.host = data['api_host'];
            //     host();
            // }).error(function(data) {
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
