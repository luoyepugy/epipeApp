(function() {
    'use strict';

define(['./process.module'], function(process) {
    process.controller('offerCtrl',offerCtrl);
    
    /* @ngInject */
    function offerCtrl($scope, httpService, $state, $stateParams, messageService){
        var vm = $scope;
            vm.chooseOffer = chooseOffer;
            vm.changeOffer = changeOffer;

        var id =  $stateParams.id,    // 订单id
            pageIndex = 1,            // 当前页数
            count = 3,                // 请求数目
            totalPage = 1;            // 总页数
        
        // 初步加载
        load();

        function load() {
            // 获取报价信息
            httpService.getDatas('GET','/order/getPurQuotations/' + id + '/' + pageIndex + '/' + count)
            .then(function(data) {
                var datas = data.data;
                vm.list = datas.quotations;
                totalPage = datas.totolPage;
            });
            // 获取商品信息
            httpService.getDatas('GET','/order/getByOrderName/' + id)
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
            if(choice !== null && choice !== undefined) {
                httpService.getDatas('POST','/order/chooseOrderQuotation', {"orderName": id, "quotationId": choice})
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