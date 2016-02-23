(function() {
    'use strict';

define(['../purchase.module'], function(purchase) {
    purchase.directive('listFilter', listFilter);
    
    /* @ngInject */
    function listFilter($ionicModal, $state) {
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

            // 过滤菜单模态框
            var menuModal = null,
                hasModal = false;

            vm.closeModal = closeModal;
            vm.stateRoute = stateRoute;           

            // 弹窗显示
            elem.bind('click', function () {
                if(hasModal) {
                    if(menuModal) { menuModal.show(); }
                    return;
                }
                hasModal = true;
                $ionicModal.fromTemplateUrl('./purchase/purchase-list/list-filter.directive.html', {
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

            scope.$on('$destroy', function() {
                if(menuModal) { menuModal.remove(); }
            });                 

            // 订单状态过滤跳转路由
            function　stateRoute(state) {
                $state.go('purchase.list', {'state': state});
                vm.$parent.hasMore = true;
            };
        };
    };
});

})();