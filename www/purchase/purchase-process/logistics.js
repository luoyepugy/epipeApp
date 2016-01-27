(function() {
    'use strict';

define(['../purchase.module'], function(purchase) {
    purchase.controller('logisticsCtrl', logisticsCtrl);
    
    /* @ngInject */
    function logisticsCtrl(httpService, $stateParams, $state){
        var vm = this;
            
        var logisticsUrl = '/order/getLogistics/',
            orderUrl = '/order/getByOrderName/',
            finishOrderUrl = '/order/finshOrder',
            id =  $stateParams.id;    // 订单id
            
        vm.list = [];
        vm.confirmGoods = confirmGoods;

        // 初步加载
        load();

        function load() {
            // 获取物流信息
            httpService.getDatas('GET',logisticsUrl + id)
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
            httpService.getDatas('GET',orderUrl + id)
            .then(function(data) {
                var datas = data.data;
                vm.product = datas;
            });
        };    
        
        // 确认收货
        function confirmGoods() {
            httpService.getDatas('POST', finishOrderUrl, {"orderName": id})
            .then(function(data) {
                $state.go('purchase.list', {'state': '所有'});
            });
        };
    };
});

})();