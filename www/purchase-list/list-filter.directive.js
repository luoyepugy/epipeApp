(function() {
    'use strict';

define(['./list.module'], function(list) {
    list.directive('listFilter', listFilter);
    
    /* @ngInject */
    function listFilter($ionicModal, httpService, $rootScope, messageService) {
        var directive = {
            restrict: 'E',
            replace: true,
            template: '<button class="button button-icon icon ion-android-menu"></button>',
            scope: {},
            link: link
        };
        return directive;

        function link(scope, elem, attrs) {
            var vm = scope;
                vm.closeModal = closeModal;
                vm.stateAll = stateAll;
                vm.stateOffer = stateOffer;
                vm.statePaying = statePaying;
                vm.statePayed = statePayed;
                vm.stateReceived = stateReceived;
                vm.stateFinished = stateFinished;
                
            // 过滤菜单模态框
            var menuModal = null,
                hasModal = false;

            // 弹窗显示
            elem.bind('click', function () {
                if(hasModal) {
                    if(menuModal) { menuModal.show(); }
                    return;
                }
                hasModal = true;
                $ionicModal.fromTemplateUrl('./purchase-list/list-filter.directive.html', {
                    scope: scope,
                    animation: 'fade-in'
                }).then(function(modal) {
                    menuModal = modal;
                    if(menuModal) { menuModal.show(); }
                });
            });
            // 关闭弹窗菜单
            function　closeModal() {
                if(menuModal) { menuModal.hide(); }
            };

            vm.$on('$destroy', function() {
                if(menuModal) { menuModal.remove(); }
            });                 

            // 全部
            function　stateAll() {
                $rootScope.statusFilter = '所有';
                stateFilter($rootScope.statusFilter);
            };
            // 报价
            function　stateOffer() {
                $rootScope.statusFilter = '报价';
                stateFilter($rootScope.statusFilter);
            };
            // 待支付
            function　statePaying() {
                $rootScope.statusFilter = '待支付';
                stateFilter($rootScope.statusFilter);
            };
            // 已支付
            function　statePayed() {
                $rootScope.statusFilter = '已支付';
                stateFilter($rootScope.statusFilter);
            };
            // 已发货
            function　stateReceived() {
                $rootScope.statusFilter = '已发货';
                stateFilter($rootScope.statusFilter);
            };
            // 已完成
            function　stateFinished() {
                $rootScope.statusFilter = '已完成';
                stateFilter($rootScope.statusFilter);
            };

            // 过滤列表，发送服务器请求
            function stateFilter(state) {
                var count = 10,
                    oldMaxCount = 0,                  
                    baseUrl = '/order/getMyOldOrders/'　+ count +'/' + $rootScope.purList.length +'/' + oldMaxCount +'/' + state;
                // console.log(baseUrl);
                $rootScope.hasMore = true;

                httpService.getDatas('GET',baseUrl)
                .then(function(data) {
                    var datas = data.data;
                    $rootScope.purList = datas.orders;
                    oldMaxCount = datas.maxCount;
                    if(datas.maxCount === 0 && state !== '所有') {
                        messageService.show('没有' + state + '订单');
                    }
                });
            };  
        };
    };
});

})();