(function() {
    'use strict';

define(['./process.module'], function(process) {
    process.controller('logisticsCtrl', logisticsCtrl);
    
    /* @ngInject */
    function logisticsCtrl($scope, httpService, $stateParams, $state){
        var vm = $scope;
            vm.confirmGoods = confirmGoods;

        var baseUrl = '/order/getLogistics/';
        // 订单id
        var id =  $stateParams.id;

        // 初步加载
        load();

        function load() {
            // 获取物流信息
            httpService.getDatas('GET',baseUrl + id)
            .then(function(data) {
                var datas = data.data;
                vm.list = datas;
                for(var i = 0; i < datas.length; i++) {
                    if(i === 0) {
                        vm.list[i].current = true;
                    } else {
                        vm.list[i].current = false;
                    }
                }
            });
            // 获取商品信息
            httpService.getDatas('GET','/order/getByOrderName/' + id)
            .then(function(data) {
                var datas = data.data;
                vm.product = datas;
            });
        };    
        
        // 确认收货
        function confirmGoods() {
            httpService.getDatas('POST','/order/finshOrder', {"orderName": id})
            .then(function(data) {
                $state.go('purchase.list');
            });
        }

    };
});

})();