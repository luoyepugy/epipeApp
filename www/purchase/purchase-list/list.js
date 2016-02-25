(function() {
    'use strict';

define(['../purchase.module'], function(purchase) {
    purchase.controller('listCtrl', listCtrl);

    /* @ngInject */
    function listCtrl($scope, messageService, $stateParams, httpService, $state){
        
        // 状态------------------------------
        // 所有，报价，待支付，已支付，已发货，已完成
        // ---------------------------------
        var vm = this;

        var count = 10,             // 要请求的数目
            oldMaxCount = 0,        // 旧的最大数目
            orderOldUrl = '/order/getMyOldOrders/',
            orderNewUrl = '/order/getMyNewOrders/';
      
        vm.hasMore = true;          // 更多数据判断
        vm.list = [];               // 列表数据变量
        vm.listFilterBtn = true;    // 列表过滤菜单按钮

        vm.route = route;
        vm.doRefresh = doRefresh;
        vm.loadMore = loadMore;

        
        // 初步加载
        load();

        function load() {
            var url = orderOldUrl　+ count +'/' + vm.list.length +'/' + oldMaxCount +'/' + $stateParams.state;
            var state = $stateParams.state;
            // 判断列表过滤按钮是否显示
            if(state !== '所有')　{
                vm.listFilterBtn = false;
            }

            httpService.getDatas('GET', url)
            .then(function(data) {
                var datas = data.data;
                vm.list = datas.orders;
                oldMaxCount = datas.maxCount;
                if(datas.maxCount === 0 && state !== '所有') {
                    messageService.show('没有' + state + '订单');
                }
            });
        };
        
        // 路由跳转
        function route(index) {
            var status = vm.list[index].state,             // 订单状态
                id = vm.list[index].name,                  // 商品id
                offerNum = vm.list[index].quotationCount;  // 商家报价数目

            // 判断状态处理    
            if(status == '报价') {
                if(offerNum > 0) {
                    $state.go('purchase.offer', {'id': id});
                }　else {
                    messageService.show('暂时没有商家报价');
                }
            }　else if(status == '已完成' || status == '已发货'){
                $state.go('purchase.logistics', {'id': id});
            }　else if(status == '待支付' || status === '已支付'){
                $state.go('purchase.order', {'id': id});
            }
        }   

        // 刷新
        function doRefresh() {
            var url = orderNewUrl + vm.list.length +'/' + oldMaxCount +'/' + $stateParams.state;
            // console.log(url);
            httpService.getDatas('GET', url)
            .then(function(data) {
                var datas = data.data;
                oldMaxCount = datas.maxCount;
                vm.list = datas.orders;
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        // 加载更多
        function loadMore() {
            var url = orderOldUrl　+ count +'/' + vm.list.length +'/' + oldMaxCount +'/' + $stateParams.state;
            // console.log(url);
            httpService.getDatas('GET', url)
            .then(function(data) {
                var datas = data.data;
                oldMaxCount = datas.maxCount;
                if(datas.maxCount === vm.list.length) {
                    vm.hasMore = false;
                    messageService.show('没有更多数据了');
                } else {
                    vm.list = datas.orders;
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };
    };
});

})();
