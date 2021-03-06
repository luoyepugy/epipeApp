(function() {
    'use strict';

define(['../purchase.module'], function(purchase) {
    purchase.controller('offerCtrl',offerCtrl);
    
    /* @ngInject */
    function offerCtrl(httpService, $state, $stateParams, messageService){
        var vm = this;
    
        var id =  $stateParams.id,    // 订单id
            // pageIndex = 1,            // 当前页数
            count = 3,                // 请求数目
            totalPage = 1,            // 总页数
            offerUrl = '/order/getPurQuotations/',
            orderUrl = '/order/getByOrderName/',
            chooseOfferUrl = '/order/chooseOrderQuotation';
            
        vm.list = [];
        vm.pageIndex = 1;

        vm.chooseOffer = chooseOffer;
        vm.changeOffer = changeOffer;

        // 初步加载
        load();

        function load() {
            // 获取报价信息
            httpService.getDatas('GET', offerUrl + id + '/' + vm.pageIndex + '/' + count)
            .then(function(data) {
                var datas = data.data;
                vm.list = datas.quotations;
                totalPage = datas.totolPage;
            });
            // 获取商品信息
            httpService.getDatas('GET', orderUrl + id)
            .then(function(data) {
                var datas = data.data;
                vm.product = datas;
            });
        };
        
        // 选择商家
        function chooseOffer() {
            var choice = vm.choiceOffer;
            if(choice != null) {
                httpService.getDatas('POST', chooseOfferUrl, {"orderName": id, "quotationId": choice})
                .then(function(data) {
                    $state.go('purchase.order', {'id': id});
                });
            } else {
                messageService.show('请选择一个商家');
            }
        };

        // 换一批商家
        function changeOffer(totalPage)　{
            vm.pageIndex += 1;
            if(vm.pageIndex <= totalPage) {
                load();
            }　else {
                vm.pageIndex -= 1;
                if(vm.pageIndex === 1) {
                    messageService.show('没有更多商家可供选择了');
                } else {
                    vm.pageIndex = 1;
                    load();
                }
            }
        };

    };
});

})();