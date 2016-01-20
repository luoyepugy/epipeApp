
define(['./module'], function(directives) {
	directives.directive('listFilter', 
		['$ionicModal', 'httpService', '$rootScope',
		function($ionicModal, httpService, $rootScope) {
		return {
			restrict: 'AE',
			template: '<button class="button button-icon icon ion-android-menu"></button>',
			replace: true,
			scope: {},
            link: function (scope, elem, attrs) {
                var menuModal = null,
                    hasModal = false;
                elem.bind('click', function () {
                    if(hasModal) {
                        if(menuModal) { menuModal.show(); }
                        return;
                    }
                    hasModal = true;
                    $ionicModal.fromTemplateUrl('./js/templates/listFilterTemp.html', {
					    scope: scope,
					    animation: 'fade-in'
					}).then(function(modal) {
					    menuModal = modal;
					    if(menuModal) { menuModal.show(); }
					});
                });
                // 关闭弹窗菜单
                scope.closeModal = function() {
                	if(menuModal) { menuModal.hide(); }
                };
                scope.$on('$destroy', function() {
                    if(menuModal) { menuModal.remove(); }
                });                 

                // 全部
                scope.stateAll = function() {
                    $rootScope.statusFilter = '所有';
                    stateFilter('所有');
                }
                // 报价
                scope.stateOffer = function() {
                    $rootScope.statusFilter = '报价';
                    stateFilter('报价');
                }
                // 待支付
                scope.statePaying = function() {
                    $rootScope.statusFilter = '待支付';
                    stateFilter('待支付');
                }
                // 已支付
                scope.statePayed = function() {
                    $rootScope.statusFilter = '已支付';
                    stateFilter('已支付');
                }
                // 已发货
                scope.stateReceiving = function() {
                    $rootScope.statusFilter = '已发货';
                    stateFilter('已发货');
                }
                // 已完成
                scope.stateReceived = function() {
                    $rootScope.statusFilter = '已完成';
                    stateFilter('已完成');
                }


                function stateFilter(state) {
                    var count = 10,
                        oldMaxCount = 0,
                        orderState = state,                   
                        baseUrl = '/order/getMyOldOrders/'　+ count +'/' + $rootScope.purList.length +'/' + oldMaxCount +'/' + orderState;
                    console.log(baseUrl);
                    var promise = httpService.getDatas('GET',baseUrl);
                    promise.then(function(data) {
                        var datas = data.data;
                        $rootScope.purList = datas.orders;
                        oldMaxCount = datas.maxCount;
                    });
                }
            }    
		};
	}]);
});