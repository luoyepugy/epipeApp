
define(['./process.module'], function(process) {
    process.controller('orderCtrl',orderCtrl);
    
    /* @ngInject */
    function orderCtrl(httpService, $stateParams){
        var vm = this;

        var orderUrl = '/order/getByOrderName/',   // 获取订单信息服务器地址
            id =  $stateParams.id;                 // 订单id

        vm.product = {};               
        vm.purchase = {};
        vm.supplier = {};
        
        // 初步加载
        load();

        function load() {
            httpService.getDatas('GET',orderUrl + id)
            .then(function(data) {
                var datas = data.data;
                vm.product = datas;
                vm.purchase = datas.purchaser;
                vm.supplier = datas.supplier;
            });
        };
    };
});