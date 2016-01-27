(function() {
    'use strict';

define(['../purchase.module'], function(purchase) {
    purchase.controller('offerCtrl',offerCtrl);
    
    /* @ngInject */
    function offerCtrl(httpService, $state, $stateParams, messageService){
        var vm = this;
    
        var id =  $stateParams.id,    // 订单id
            pageIndex = 1,            // 当前页数
            count = 3,                // 请求数目
            totalPage = 1,            // 总页数
            offerUrl = '/order/getPurQuotations/',
            orderUrl = '/order/getByOrderName/',
            chooseOfferUrl = '/order/chooseOrderQuotation';
            
        vm.list = [];

        vm.chooseOffer = chooseOffer;
        vm.changeOffer = changeOffer;

        // 初步加载
        load();

        function load() {
            // 获取报价信息
            httpService.getDatas('GET', offerUrl + id + '/' + pageIndex + '/' + count)
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
            var choice,
                 radios = document.getElementsByName('choiceOffer');
            
            for(var i = 0; i < radios.length; i++) {
                if(radios[i].checked) {
                    choice = radios[i].value;
                }
            }
            if(choice != null) {
                httpService.getDatas('POST', chooseOfferUrl, {"orderName": id, "quotationId": choice})
                .then(function(data) {
                    $state.go('purchase.order', {'id': id});
                });
            }
        };

        // 换一批商家
        function changeOffer()　{
            pageIndex += 1;
            if(pageIndex <= totalPage) {
                load();
            }　else {
                pageIndex -= 1;
                if(pageIndex === 1) {
                    messageService.show('没有更多商家可供选择了');
                } else {
                    pageIndex = 1;
                    load();
                }
            }
        };

    };
});

})();