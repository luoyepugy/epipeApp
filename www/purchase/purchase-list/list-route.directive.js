(function() {
    'use strict';

define(['../purchase.module'], function(purchase) {
    purchase.directive('listRoute', listRoute);
    
    /* @ngInject */
    function listRoute(httpService, $ionicLoading ,messageService, $state) {
        var directive = {
            restrict: 'AE',
            template: '',
            replace: false,
            scope: false,
            link: link
        };
        return directive;

        function link(scope, element, attrs) {
            // 父级作用域
            var vm = scope.$parent;

            element.on('click', function() {
                var status = vm.item.state,             // 订单状态
                    id = vm.item.name,                  // 商品id
                    offerNum = vm.item.quotationCount;  // 商家报价数目

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
            });            
        };
    };
});

})();